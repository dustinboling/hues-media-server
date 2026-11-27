import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderAt } from './render'
import { WINGS } from '../data/wings'

describe('Entrance (/)', () => {
  it('renders the museum name, eyebrow, and entrance statement', () => {
    renderAt('/')
    const main = screen.getByRole('main')
    expect(within(main).getByText('HUES FLORAL PARK')).toBeInTheDocument()
    expect(within(main).getByRole('heading', { level: 1, name: 'The Media Museum' })).toBeInTheDocument()
    expect(
      within(main).getByText(
        'Every photograph, painting and song the Hues websites run on — the actual files, hung in five rooms so we can find them, look at them properly, and use them again.',
      ),
    ).toBeInTheDocument()
  })

  it('renders all five wing entries', () => {
    renderAt('/')
    expect(screen.getAllByTestId(/wing-card-/)).toHaveLength(5)
  })

  it.each(WINGS)('shows the $name entry with its lead image, scent, and link', (wing) => {
    renderAt('/')
    const card = screen.getByTestId(`wing-card-${wing.slug}`)
    expect(card).toHaveAttribute('href', wing.route)
    expect(within(card).getByText(wing.name)).toBeInTheDocument()
    expect(within(card).getByText(wing.scent)).toBeInTheDocument()
    const img = within(card).getByRole('img')
    expect(img).toHaveAttribute('alt', wing.entry.alt)
    expect(img.getAttribute('src')).toContain(wing.entry.mediaKey)
  })

  it('uses Elena’s lead image keys on media.hues.flowers itself', () => {
    renderAt('/')
    for (const wing of WINGS) {
      const card = screen.getByTestId(`wing-card-${wing.slug}`)
      const img = within(card).getByRole('img')
      expect(img.getAttribute('src')).toContain('https://media.hues.flowers/')
    }
  })

  it('renders the About strip with the exit to hues.flowers', () => {
    renderAt('/')
    const about = screen.getByTestId('about-strip')
    expect(within(about).getByText(/This is Hues Floral Park's media library/)).toBeInTheDocument()
    expect(within(about).getByRole('link', { name: 'Visit hues.flowers' })).toHaveAttribute(
      'href',
      'https://hues.flowers',
    )
  })
})
