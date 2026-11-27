import { describe, expect, it } from 'vitest'
import worker from '../src/index'

// Minimal in-memory R2Bucket stand-in. It honours the range option the same
// way R2 does (returning only the requested slice) so the worker's 206 path
// is exercised for real.
function makeEnv(files: Record<string, { bytes: Uint8Array; contentType: string }>) {
  const head = async (key: string) => {
    const f = files[key]
    if (!f) return null
    return {
      size: f.bytes.length,
      httpEtag: '"fake-etag-1"',
      writeHttpMetadata: (headers: Headers) => {
        headers.set('Content-Type', f.contentType)
      },
    }
  }
  const get = async (key: string, opts?: { range?: { offset: number; length: number } }) => {
    const f = files[key]
    if (!f) return null
    const bytes = opts?.range
      ? f.bytes.slice(opts.range.offset, opts.range.offset + opts.range.length)
      : f.bytes
    return { body: bytes }
  }
  return { MEDIA: { head, get } } as unknown as { MEDIA: R2Bucket }
}

const MEDIA_FILES = {
  'hues/park/dahlia-beds-lawn.jpg': {
    bytes: new Uint8Array([1, 2, 3, 4, 5, 6, 7, 8]),
    contentType: 'image/jpeg',
  },
  'music/tracks/09-zinnia-sky.mp3': {
    bytes: new Uint8Array([10, 20, 30, 40, 50, 60]),
    contentType: 'audio/mpeg',
  },
}

function req(path: string, init?: RequestInit): Request {
  return new Request(`https://media.hues.flowers${path}`, init)
}

describe('media behaviour (invariant — Nadia R-1/R-8)', () => {
  it('serves an existing media key exactly as today', async () => {
    const res = await worker.fetch(req('/hues/park/dahlia-beds-lawn.jpg'), makeEnv(MEDIA_FILES))
    expect(res.status).toBe(200)
    expect(res.headers.get('Cache-Control')).toBe('public, max-age=31536000, immutable')
    expect(res.headers.get('Access-Control-Allow-Origin')).toBe('*')
    expect(res.headers.get('Accept-Ranges')).toBe('bytes')
    expect(res.headers.get('Content-Type')).toBe('image/jpeg')
    expect(res.headers.get('Content-Length')).toBe('8')
    expect(res.headers.get('X-Robots-Tag')).toBeNull()
    expect(new Uint8Array(await res.arrayBuffer())).toEqual(MEDIA_FILES['hues/park/dahlia-beds-lawn.jpg'].bytes)
  })

  it('honours byte ranges on media keys', async () => {
    const res = await worker.fetch(
      req('/music/tracks/09-zinnia-sky.mp3', { headers: { Range: 'bytes=1-3' } }),
      makeEnv(MEDIA_FILES),
    )
    expect(res.status).toBe(206)
    expect(res.headers.get('Content-Range')).toBe('bytes 1-3/6')
    expect(res.headers.get('Content-Length')).toBe('3')
    expect(res.headers.get('X-Robots-Tag')).toBeNull()
    expect(new Uint8Array(await res.arrayBuffer())).toEqual(new Uint8Array([20, 30, 40]))
  })

  it('lets a real R2 key win over any app route shape (R-1 precedence)', async () => {
    const env = makeEnv({ park: { bytes: new Uint8Array([9]), contentType: 'image/jpeg' } })
    const res = await worker.fetch(req('/park'), env)
    expect(res.status).toBe(200)
    expect(res.headers.get('Cache-Control')).toBe('public, max-age=31536000, immutable')
    expect(res.headers.get('X-Robots-Tag')).toBeNull()
  })

  it('resolves /cdn-cgi/image/… to the original object', async () => {
    const res = await worker.fetch(
      req('/cdn-cgi/image/width=480,quality=80/hues/park/dahlia-beds-lawn.jpg'),
      makeEnv(MEDIA_FILES),
    )
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('image/jpeg')
    expect(res.headers.get('X-Robots-Tag')).toBeNull()
    expect(new Uint8Array(await res.arrayBuffer())).toEqual(MEDIA_FILES['hues/park/dahlia-beds-lawn.jpg'].bytes)
  })

  it('keeps HEAD and 405 behaviour for media paths', async () => {
    const env = makeEnv(MEDIA_FILES)
    const head = await worker.fetch(
      req('/hues/park/dahlia-beds-lawn.jpg', { method: 'HEAD' }),
      env,
    )
    expect(head.status).toBe(200)
    expect(head.headers.get('Content-Length')).toBe('8')
    expect(await head.text()).toBe('')
    const post = await worker.fetch(
      req('/hues/park/dahlia-beds-lawn.jpg', { method: 'POST' }),
      env,
    )
    expect(post.status).toBe(405)
  })
})

describe('missing media paths are true plain-text 404s (Nadia R-2/R-3)', () => {
  const cases: Array<[string, string]> = [
    ['/hues/park/no-such-photo.jpg', 'R-2 extension miss'],
    ['/music/tracks/no-such-track.mp3', 'R-2 extension miss'],
    ['/park/museum-style-but-a-file.css', 'R-2 extension under an app slug'],
    ['/hues/park/no-such-extensionless-key', 'R-3 multi-segment hues/ miss'],
    ['/music/tracks', 'R-3/R-5 reserved music namespace'],
    ['/music/tracks/no-such-file.mp3', 'R-3 deep music/ miss'],
    ['/cdn-cgi/image/width=480/hues/park/no-such-photo.jpg', 'missing transform source'],
  ]
  it.each(cases)('%s → 404 plain text (%s)', async (path) => {
    const res = await worker.fetch(req(path), makeEnv(MEDIA_FILES))
    expect(res.status).toBe(404)
    expect(res.headers.get('Content-Type')).toContain('text/plain')
    expect(res.headers.get('X-Robots-Tag')).toBeNull()
    expect(await res.text()).toBe('Not found')
  })
})

describe('museum app routes serve the SPA shell (Nadia R-4/R-6/R-9)', () => {
  const appShapes = [
    '/',
    '/park',
    '/dahlias',
    '/art',
    '/arcade',
    '/music',
    '/search',
    '/park/visitors-at-dusk',
    '/dahlias/labyrinth',
    '/art/the-procession',
    '/arcade/dusty-hue-and-cocoa',
    '/music/zinnia-sky',
    '/music/no-such-track',
    '/seeds',
  ]
  it.each(appShapes)('%s → 200 shell + noindex', async (path) => {
    const res = await worker.fetch(req(path), makeEnv(MEDIA_FILES))
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toContain('text/html')
    expect(res.headers.get('X-Robots-Tag')).toBe('noindex')
    expect(res.headers.get('Cache-Control')).not.toContain('immutable')
    const body = await res.text()
    expect(body).toContain('<div id="root">')
    expect(body).toContain('noindex')
  })

  const unknownAppShaped = ['/dahila', '/foo/bar', '/park/a/b/c', '/completely-unknown']
  it.each(unknownAppShaped)('%s → 200 shell under R-9', async (path) => {
    const res = await worker.fetch(req(path), makeEnv(MEDIA_FILES))
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toContain('text/html')
    expect(res.headers.get('X-Robots-Tag')).toBe('noindex')
  })
})
