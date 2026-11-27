// media.hues.flowers — serves the hues-media R2 bucket (SPA plan §1d).
// Keys mirror public paths: hues/<...> images, music/tracks/<file> audio.
// /cdn-cgi/image/<params>/<key> is handled by zone Image Transformations
// at the edge; if a transform path ever reaches this worker, fall back to
// the original object so the image still renders.
interface Env { MEDIA: R2Bucket }

const IMMUTABLE = 'public, max-age=31536000, immutable'

function parseRange(header: string | null, size: number): { offset: number; length: number } | undefined {
  if (!header) return undefined
  const m = /^bytes=(\d*)-(\d*)$/.exec(header.trim())
  if (!m) return undefined
  let start = m[1] === '' ? undefined : parseInt(m[1], 10)
  let end = m[2] === '' ? undefined : parseInt(m[2], 10)
  if (start === undefined && end !== undefined) { start = Math.max(0, size - end); end = size - 1 }
  if (start === undefined || end === undefined || start > end || start >= size) return undefined
  return { offset: start, length: Math.min(end, size - 1) - start + 1 }
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405 })
    }
    const url = new URL(request.url)
    let key = decodeURIComponent(url.pathname.replace(/^\/+/, ''))
    if (key.startsWith('cdn-cgi/image/')) {
      const rest = key.slice('cdn-cgi/image/'.length)
      const slash = rest.indexOf('/')
      if (slash > 0) key = rest.slice(slash + 1)
    }
    if (!key) return new Response('Not found', { status: 404 })

    const head = await env.MEDIA.head(key)
    if (!head) return new Response('Not found', { status: 404 })

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
  },
}
