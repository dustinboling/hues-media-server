import { describe, expect, it } from 'vitest'
import { consumeReturnState, saveReturnState } from '../lib/restore'
import { cappedWidths, imageUrl, srcset } from '../lib/media'

describe('Back restoration state (Nadia §4.5)', () => {
  it('round-trips scroll and slug, then consumes exactly once', () => {
    saveReturnState('/park', { scrollY: 1234, slug: 'dusty' })
    expect(consumeReturnState('/park')).toEqual({ scrollY: 1234, slug: 'dusty' })
    expect(consumeReturnState('/park')).toBeNull()
  })

  it('rejects malformed stored state', () => {
    sessionStorage.setItem('museum:return:/park', 'not json')
    expect(consumeReturnState('/park')).toBeNull()
    sessionStorage.setItem('museum:return:/park', JSON.stringify({ scrollY: 'high' }))
    expect(consumeReturnState('/park')).toBeNull()
  })
})

describe('Media URL builders (Elena §6)', () => {
  it('builds transform URLs on the museum’s own origin', () => {
    expect(imageUrl('hues/park/x.jpg', { width: 480 })).toBe(
      'https://media.hues.flowers/cdn-cgi/image/width=480,quality=80/hues/park/x.jpg',
    )
    expect(imageUrl('hues/m-art/x.webp', { width: 1024, quality: 85, fit: 'pad' })).toBe(
      'https://media.hues.flowers/cdn-cgi/image/width=1024,quality=85,fit=pad/hues/m-art/x.webp',
    )
  })

  it('caps the ladder at the native width — never upscales', () => {
    expect(cappedWidths(512, 1920)).toEqual([320, 480])
    expect(cappedWidths(2048, 1920)).toEqual([320, 480, 768, 1024, 1440, 1920])
    expect(cappedWidths(undefined, 768)).toEqual([320, 480, 768])
  })

  it('builds width-described srcsets', () => {
    expect(srcset('hues/park/x.jpg', { widths: [320, 480] })).toContain('320w')
  })
})
