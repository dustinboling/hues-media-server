import { screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderAt } from './render'
import { EXHIBITS } from '../data/catalog'

const GROUPS: Array<{ name: string; slugs: string[] }> = [
  {
    name: 'Beds & Blooms',
    slugs: ['evening-over-the-beds', 'dahlia-beds-along-the-lawn', 'the-beds-and-the-sunflower-field'],
  },
  { name: 'The Grounds', slugs: ['golden-hour-over-the-beds', 'seating-among-the-beds'] },
  { name: 'People', slugs: ['visitors-at-dusk', 'dusty'] },
]

describe('Park wing (/park)', () => {
  it('renders the wing head with live count from the catalog', () => {
    renderAt('/park')
    expect(screen.getByRole('heading', { level: 1, name: 'The Park' })).toBeInTheDocument()
    expect(
      screen.getByText('The grounds themselves: beds in flower, the lawns, the paths, and the people who come to pick.'),
    ).toBeInTheDocument()
    const count = screen.getByTestId('wing-count')
    expect(count).toHaveAttribute('aria-live', 'polite')
    expect(count).toHaveTextContent('7 pieces')
  })

  it('renders the pilot’s 7 exhibits, grouped as catalogued', () => {
    renderAt('/park')
    expect(EXHIBITS.filter((e) => e.wing === 'park')).toHaveLength(7)
    expect(screen.getAllByTestId(/exhibit-card-/)).toHaveLength(7)
    for (const group of GROUPS) {
      const heading = screen.getByRole('heading', { level: 2, name: group.name })
      const section = heading.closest('section')
      expect(section).not.toBeNull()
      const cards = within(section as HTMLElement).getAllByTestId(/exhibit-card-/)
      expect(cards.map((c) => c.getAttribute('data-exhibit-slug'))).toEqual(group.slugs)
    }
  })

  it('orders groups Beds & Blooms, The Grounds, People', () => {
    renderAt('/park')
    const headings = screen.getAllByRole('heading', { level: 2 }).map((h) => h.textContent)
    expect(headings).toEqual(['Beds & Blooms', 'The Grounds', 'People'])
  })

  it('links every card to its exhibit view with title and alt text', () => {
    renderAt('/park')
    for (const exhibit of EXHIBITS.filter((e) => e.wing === 'park')) {
      const card = screen.getByTestId(`exhibit-card-${exhibit.slug}`)
      expect(card).toHaveAttribute('href', `/park/${exhibit.slug}`)
      expect(within(card).getByText(exhibit.title)).toBeInTheDocument()
      expect(within(card).getByRole('img')).toHaveAttribute('alt', exhibit.altText)
    }
  })

  it('renders group jump links and the end matter with next-wing exit', () => {
    renderAt('/park')
    expect(screen.getByRole('link', { name: 'Beds & Blooms' })).toHaveAttribute('href', expect.stringContaining('#'))
    expect(screen.getByRole('link', { name: 'The Grounds' })).toHaveAttribute('href', expect.stringContaining('#'))
    expect(screen.getByRole('link', { name: 'People' })).toHaveAttribute('href', expect.stringContaining('#'))
    expect(screen.getByText("That's the whole wing — 7 pieces.")).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Next room: Listening Room' })).toHaveAttribute('href', '/music')
  })
})
