import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

// Quinn's gate carries the keyline + stage padding as an acceptance check on
// the built stage component (Mina §4.8, Elena FE-1). These tests chain the
// component hooks (data-stage / photo-keyline, asserted in piece.test.tsx)
// to the token values and the CSS rules that paint them, so neither half of
// FE-1's binding condition can silently drop out of the build.
// Resolved from the package root, where vitest runs.
const tokens = readFileSync('src/styles/tokens.css', 'utf8')
const css = readFileSync('src/styles/museum.css', 'utf8')

function rule(selector: string): string {
  const match = css.match(new RegExp(`${selector}\\s*\\{([^}]*)\\}`, 's'))
  if (!match) throw new Error(`museum.css has no ${selector} rule`)
  return match[1]
}

describe('FE-1 binding condition: stage tokens and rules', () => {
  it('defines the evening, keyline, and mat tokens at Mina’s values', () => {
    expect(tokens).toMatch(/--color-ground-evening:\s*#1c2a21/i)
    expect(tokens).toMatch(/--color-gold-2:\s*#b08d37/i)
    expect(tokens).toMatch(/--color-surface:\s*#fffdf4/i)
    expect(tokens).toMatch(/--color-bg:\s*#f7f1de/i)
  })

  it('paints the photo stage on the evening ground with stage padding', () => {
    expect(rule('\\.photo-stage')).toMatch(/background(-color)?:\s*var\(--color-ground-evening\)/)
    expect(rule('\\.photo-stage')).toMatch(/padding:\s*var\(--space-200\)/)
    expect(css).toMatch(/min-width:\s*1280px[\s\S]*?\.photo-stage\s*\{[^}]*padding:\s*var\(--space-400\)/)
  })

  it('draws the 1px gold keyline around the photograph’s box', () => {
    expect(rule('\\.photo-keyline')).toMatch(/border:\s*1px solid var\(--color-gold-2\)/)
  })

  it('paints the art stage as a paper-0 mat panel', () => {
    expect(rule('\\.art-stage')).toMatch(/background(-color)?:\s*var\(--color-surface\)/)
    expect(rule('\\.art-stage')).toMatch(/padding:\s*var\(--space-300\)/)
  })
})
