// Media URLs on media.hues.flowers itself: the museum reads the same bucket
// keys the sites use — no hotlinking, no new copies (Elena §6).
export const MEDIA_ORIGIN = 'https://media.hues.flowers'

// The closed transform width ladder (Mina §3.1 Image contract).
export const WIDTH_LADDER = [320, 480, 768, 1024, 1440, 1920]

export function mediaUrl(key: string): string {
  return `${MEDIA_ORIGIN}/${key}`
}

export interface TransformOpts {
  width: number
  quality?: number
  fit?: 'pad'
}

export function imageUrl(key: string, opts: TransformOpts): string {
  const params = [`width=${opts.width}`, `quality=${opts.quality ?? 80}`]
  if (opts.fit) params.push(`fit=${opts.fit}`)
  return `${MEDIA_ORIGIN}/cdn-cgi/image/${params.join(',')}/${key}`
}

// Ladder widths at or below the native width — never request a width above
// the file's native width (Elena §6). Falls back to the cap itself when the
// native width sits below the whole ladder.
export function cappedWidths(nativeWidth: number | undefined, maxWidth: number): number[] {
  const cap = Math.min(nativeWidth ?? maxWidth, maxWidth)
  const widths = WIDTH_LADDER.filter((w) => w <= cap)
  return widths.length > 0 ? widths : [cap]
}

export interface SrcsetOpts {
  widths: number[]
  quality?: number
  fit?: 'pad'
}

export function srcset(key: string, opts: SrcsetOpts): string {
  return opts.widths.map((w) => `${imageUrl(key, { width: w, quality: opts.quality, fit: opts.fit })} ${w}w`).join(', ')
}
