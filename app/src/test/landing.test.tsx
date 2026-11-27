import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderAt } from './render'
import { WINGS } from '../data/wings'

const UNBUILT = WINGS.filter((w) => w.slug !== 'park')

describe('Unbuilt wing landings and the museum 404', () => {
  it.each(UNBUILT)('$name shows its entry, intro, and the honest being-hung note', (wing) => {
    renderAt(wing.route)
    expect(screen.getByRole('heading', { level: 1, name: wing.name })).toBeInTheDocument()
    expect(screen.getByText(wing.intro)).toBeInTheDocument()
    const img = screen.getByRole('img')
    expect(img).toHaveAttribute('alt', wing.entry.alt)
    expect(img.getAttribute('src')).toContain(wing.entry.mediaKey)
    expect(screen.getByText('This room is still being hung.')).toBeInTheDocument()
    expect(screen.getByText('Nothing has been catalogued here yet — the other rooms are open.')).toBeInTheDocument()
    const main = screen.getByRole('main')
    expect(within(main).getByRole('link', { name: 'The Park' })).toHaveAttribute('href', '/park')
  })

  it('renders no gallery content on unbuilt landings', () => {
    renderAt('/dahlias')
    expect(screen.queryByTestId(/exhibit-card-/)).not.toBeInTheDocument()
    expect(screen.queryByTestId('wing-count')).not.toBeInTheDocument()
  })

  it.each(['/dahila', '/foo/bar', '/seeds'])('%s renders the designed 404 view inside the shell', (path) => {
    renderAt(path)
    const view = screen.getByTestId('museum-404')
    expect(within(view).getByText('NOT A ROOM')).toBeInTheDocument()
    expect(within(view).getByRole('heading', { level: 1, name: "This room doesn't exist." })).toBeInTheDocument()
    expect(
      within(view).getByText(
        "The address points at a room the museum doesn't have. The five real rooms are below — or search the collection.",
      ),
    ).toBeInTheDocument()
    for (const wing of WINGS) {
      expect(within(view).getByRole('link', { name: wing.name })).toHaveAttribute('href', wing.route)
    }
    expect(within(view).getByRole('link', { name: 'Visit hues.flowers' })).toHaveAttribute(
      'href',
      'https://hues.flowers',
    )
    // Inside the shell: header nav and footer still render.
    expect(screen.getByRole('navigation', { name: 'Wings' })).toBeInTheDocument()
    expect(screen.getByText('Media served from this address.')).toBeInTheDocument()
  })
})
