import { cleanup, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderAt } from './render'
import { WINGS } from '../data/wings'

function wingNav(): HTMLElement {
  return screen.getByRole('navigation', { name: 'Wings' })
}

describe('Shell: header, wing nav, footer', () => {
  it('shows the five wings by their full names', () => {
    renderAt('/')
    const nav = wingNav()
    for (const wing of WINGS) {
      const link = within(nav).getByRole('link', { name: wing.name })
      expect(link).toHaveAttribute('href', wing.route)
    }
  })

  it('marks the active wing only with aria-current', () => {
    renderAt('/park')
    const nav = wingNav()
    expect(within(nav).getByRole('link', { name: 'The Park' })).toHaveAttribute('aria-current', 'page')
    for (const name of ['Dahlias', 'Listening Room', 'Art & Motifs', 'Arcade']) {
      expect(within(nav).getByRole('link', { name })).not.toHaveAttribute('aria-current')
    }
    expect(document.querySelectorAll('[aria-current]').length).toBe(1)
  })

  it('keeps the wing marked on the exhibit view, and marks nothing on the entrance', () => {
    renderAt('/park/visitors-at-dusk')
    expect(within(wingNav()).getByRole('link', { name: 'The Park' })).toHaveAttribute('aria-current', 'page')
    cleanup()
    renderAt('/')
    expect(document.querySelectorAll('[aria-current]').length).toBe(0)
  })

  it('links the wordmark home and renders the footer colophon', () => {
    renderAt('/park')
    expect(screen.getByRole('link', { name: /The Media Museum/ })).toHaveAttribute('href', '/')
    expect(screen.getByText('The media library of Hues Floral Park.')).toBeInTheDocument()
    expect(screen.getByText('Media served from this address.')).toBeInTheDocument()
  })
})
