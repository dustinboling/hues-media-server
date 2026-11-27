// media.hues.flowers — serves the hues-media R2 bucket (images under
// hues/<...>, audio under music/tracks/<file>) and hosts The Media Museum,
// the team's media-library SPA, on the museum's app routes.
//
// Routing contract: Nadia §2.3 (R-1…R-9), evaluated top-down. Order matters:
// a real media key always wins (R-1); only paths that miss every media rule
// reach the SPA shell (R-4/R-6/R-9). Media behaviour — R2 key mapping, byte
// ranges, immutable caching, CORS, the /cdn-cgi/image/ fallback — is an
// INVARIANT: this file must not change how any existing media URL responds.
import { SHELL_HTML } from './shell'

interface Env {
  MEDIA: R2Bucket
}

const IMMUTABLE = 'public, max-age=31536000, immutable'
// The SPA shell is a build artefact, not content-addressed: short cache,
// never the immutable media cache (Nadia R-4).
const SHELL_CACHE = 'public, max-age=300'

// Known media prefixes (Nadia R-3). A multi-segment path under any of these
// that misses R-1 is a missing file, never the SPA.
const MEDIA_PREFIXES = ['hues/', 'music/', 'seeds/', '_app/', 'cdn-cgi/']

function parseRange(header: string | null, size: number): { offset: number; length: number } | undefined {
  if (!header) return undefined
  const m = /^bytes=(\d*)-(\d*)$/.exec(header.trim())
  if (!m) return undefined
  let start = m[1] === '' ? undefined : parseInt(m[1], 10)
  let end = m[2] === '' ? undefined : parseInt(m[2], 10)
  if (start === undefined && end !== undefined) {
    start = Math.max(0, size - end)
    end = size - 1
  }
  if (start === undefined || end === undefined || start > end || start >= size) return undefined
  return { offset: start, length: Math.min(end, size - 1) - start + 1 }
}

// R-2: any path whose last segment contains a file extension is a file.
// R-3: any multi-segment path under a known media prefix is a file.
// Either way a miss is a true plain-text media 404 — a browser asking for
// bytes must never receive HTML.
// R-3/R-4/R-5 reconciliation: /music/:slug (two segments, extensionless,
// non-reserved second segment) is the app's track view (R-4), not the media
// namespace — the media tree under music/ is music/tracks/… . The reserved
// word `tracks` (R-5) stays media: /music/tracks is a 404 when it misses R-1.
function isMediaShaped(normalizedPath: string): boolean {
  const segments = normalizedPath.split('/')
  const last = segments[segments.length - 1]
  if (last.includes('.')) return true
  if (segments.length > 1 && MEDIA_PREFIXES.some((prefix) => normalizedPath.startsWith(prefix))) {
    if (segments.length === 2 && segments[0] === 'music' && segments[1] !== 'tracks') return false
    return true
  }
  return false
}

// R-4/R-6/R-9: the museum shell at 200 with a short cache. Museum HTML — and
// only museum HTML — carries X-Robots-Tag: noindex (media responses never do).
// Which view renders (wing, piece, or the museum 404) is the app's decision;
// the Worker cannot know whether a client-rendered slug exists.
function shellResponse(request: Request): Response {
  const headers = new Headers()
  headers.set('Content-Type', 'text/html; charset=utf-8')
  headers.set('Cache-Control', SHELL_CACHE)
  headers.set('X-Robots-Tag', 'noindex')
  headers.set('Content-Length', String(new TextEncoder().encode(SHELL_HTML).length))
  if (request.method === 'HEAD') return new Response(null, { status: 200, headers })
  return new Response(SHELL_HTML, { status: 200, headers })
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // R-8: the SPA fallback applies to GET only; the existing 405 for other
    // methods stands.
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405 })
    }
    const url = new URL(request.url)
    let key = decodeURIComponent(url.pathname.replace(/^\/+/, ''))
    // Zone Image Transformations normally handle /cdn-cgi/image/ at the
    // edge; if a transform path ever reaches this worker, fall back to the
    // original object so the image still renders.
    if (key.startsWith('cdn-cgi/image/')) {
      const rest = key.slice('cdn-cgi/image/'.length)
      const slash = rest.indexOf('/')
      if (slash > 0) key = rest.slice(slash + 1)
    }

    // R-1: media wins first, always. No app route pattern is consulted
    // before this check, and a hit responds exactly as it always has.
    if (key) {
      const head = await env.MEDIA.head(key)
      if (head) {
        const headers = new Headers()
        head.writeHttpMetadata(headers)
        headers.set('Access-Control-Allow-Origin', '*')
        headers.set('Cache-Control', IMMUTABLE)
        headers.set('Accept-Ranges', 'bytes')
        headers.set('ETag', head.httpEtag)
        if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/octet-stream')

        if (request.method === 'HEAD') {
          headers.set('Content-Length', String(head.size))
          return new Response(null, { headers })
        }
        const range = parseRange(request.headers.get('Range'), head.size)
        const object = await env.MEDIA.get(key, range ? { range } : undefined)
        if (!object) return new Response('Not found', { status: 404 })
        if (range) {
          headers.set('Content-Range', `bytes ${range.offset}-${range.offset + range.length - 1}/${head.size}`)
          headers.set('Content-Length', String(range.length))
          return new Response(object.body, { status: 206, headers })
        }
        headers.set('Content-Length', String(head.size))
        return new Response(object.body, { headers })
      }
    }

    // R-1 missed. `/` is the museum entrance; anything media-shaped is a
    // true 404; everything else is an app route (R-4), the reserved /seeds
    // (R-6), or an unknown app-shaped path (R-9) — all serve the shell.
    const normalized = decodeURIComponent(url.pathname)
      .replace(/^\/+/, '')
      .replace(/\/+$/, '')
    if (normalized === '') return shellResponse(request)
    if (isMediaShaped(normalized)) return new Response('Not found', { status: 404 })
    return shellResponse(request)
  },
}
