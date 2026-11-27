import { cleanup, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderAt } from './render'

// Park order (grouped order flattened): Beds & Blooms first, then The
// Grounds, then People. Previous/Next walk this order.
const PARK_ORDER = [
  'evening-over-the-beds',
  'dahlia-beds-along-the-lawn',
  'the-beds-and-the-sunflower-field',
  'golden-hour-over-the-beds',
  'seating-among-the-beds',
  'visitors-at-dusk',
  'dusty',
]

describe('Exhibit view (/park/:slug)', () => {
  it('renders a photograph on the deep-2 stage with the keyline treatment', () => {
    renderAt('/park/visitors-at-dusk')
    const stage = screen.getByTestId('photo-stage')
    expect(stage).toHaveAttribute('data-stage', 'photo')
    expect(screen.getByTestId('photo-keyline')).toBeInTheDocument()
    expect(screen.queryByTestId('art-stage')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'Visitors at Dusk' })).toBeInTheDocument()
    const img = within(stage).getByRole('img')
    expect(img).toHaveAttribute(
      'alt',
      'Photograph at dusk: visitors arranging buckets of dahlias at a picnic table, with string lights and the lawn behind them.',
    )
    expect(img.getAttribute('src')).toContain('hues/park/visitors-evening-dahlia-beds.jpeg')
  })

  it('never requests a width above the file’s native width', () => {
    // Visitors at Dusk is natively 512px wide: the ladder stops at 480.
    renderAt('/park/visitors-at-dusk')
    const img = within(screen.getByTestId('photo-stage')).getByRole('img')
    expect(img.getAttribute('srcset')).toContain('width=480')
    expect(img.getAttribute('srcset')).not.toContain('width=768')
    expect(img.getAttribute('src')).toContain('width=480')
  })

  it('renders a painting on the paper-0 mat stage with fit=pad', () => {
    renderAt('/park/golden-hour-over-the-beds')
    const stage = screen.getByTestId('art-stage')
    expect(stage).toHaveAttribute('data-stage', 'art')
    expect(screen.queryByTestId('photo-stage')).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1, name: 'Golden Hour Over the Beds' })).toBeInTheDocument()
    const img = within(stage).getByRole('img')
    expect(img.getAttribute('src')).toContain('fit=pad')
    expect(img.getAttribute('src')).toContain('quality=85')
    expect(img.getAttribute('srcset')).toContain('fit=pad')
  })

  it('renders the Back link, details, and actions', () => {
    renderAt('/park/visitors-at-dusk')
    const backLinks = screen.getAllByRole('link', { name: 'Back to The Park' })
    expect(backLinks.length).toBeGreaterThanOrEqual(1)
    for (const link of backLinks) expect(link).toHaveAttribute('href', '/park')
    expect(screen.getByText('Buckets of dahlias being arranged at a picnic table as the light goes.')).toBeInTheDocument()
    expect(screen.getByText('Floral Park page; home page (desktop and phone)')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy page link' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Copy media link' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'View full size' })).toHaveAttribute(
      'href',
      'https://media.hues.flowers/hues/park/visitors-evening-dahlia-beds.jpeg',
    )
  })

  it('walks Previous/Next through the wing order by name', () => {
    renderAt('/park/visitors-at-dusk')
    expect(screen.getByTestId('piece-prev')).toHaveTextContent('Previous: Seating Among the Beds')
    expect(screen.getByTestId('piece-prev')).toHaveAttribute('href', '/park/seating-among-the-beds')
    expect(screen.getByTestId('piece-next')).toHaveTextContent('Next: Dusty')
    expect(screen.getByTestId('piece-next')).toHaveAttribute('href', '/park/dusty')
  })

  it('names the exit at the ends of the order instead of disabling', () => {
    renderAt(`/park/${PARK_ORDER[0]}`)
    expect(screen.getByTestId('piece-prev')).toHaveTextContent('Back to The Park')
    expect(screen.getByTestId('piece-prev')).toHaveAttribute('href', '/park')
    cleanup()
    renderAt(`/park/${PARK_ORDER[PARK_ORDER.length - 1]}`)
    expect(screen.getByTestId('piece-next')).toHaveTextContent('Back to The Park')
    expect(screen.getByTestId('piece-next')).toHaveAttribute('href', '/park')
  })

  it('renders the more-from rail without the current piece', () => {
    renderAt('/park/visitors-at-dusk')
    const rail = screen.getByTestId('more-from-rail')
    expect(within(rail).getByText('More from The Park')).toBeInTheDocument()
    const links = within(rail).getAllByRole('link')
    expect(links).toHaveLength(6)
    expect(links.map((l) => l.getAttribute('href'))).not.toContain('/park/visitors-at-dusk')
  })

  it('renders the museum 404 view for an unknown slug', () => {
    renderAt('/park/no-such-piece')
    expect(screen.getByRole('heading', { level: 1, name: "This room doesn't exist." })).toBeInTheDocument()
  })
})
