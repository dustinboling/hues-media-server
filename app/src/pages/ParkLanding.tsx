import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { parkGroups, parkOrder } from '../data/catalog'
import { wingBySlug, type Wing } from '../data/wings'
import { useDocumentTitle } from '../lib/title'
import { restoreReturnState } from '../lib/restore'
import { ExhibitCard } from '../components/ExhibitCard'
import { WingMarker } from '../components/WingMarker'

function groupId(name: string): string {
  return `group-${name
    .toLowerCase()
    .replace(/&/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')}`
}

// Nadia §3.2 + Mina §4.2: The Park wing gallery — wing head with live count,
// group jumps, grouped grid, end matter with the next-wing exit. Seven
// exhibits need no Show more; the Park ships no other controls (Nadia §3.2).
export function ParkLanding() {
  useDocumentTitle('The Park')
  useEffect(() => {
    restoreReturnState('/park')
  }, [])
  const park = wingBySlug('park') as Wing
  const groups = parkGroups()
  const order = parkOrder()
  return (
    <div className="wing">
      <div className="wing-head">
        <p className="wing-eyebrow">
          <WingMarker wing={park} size={24} />{' '}
          <span className="t-caps t-num" data-testid="wing-count" aria-live="polite">
            {order.length} pieces
          </span>
        </p>
        <h1 className="t-h1">The Park</h1>
        <p className="t-lede">
          The grounds themselves: beds in flower, the lawns, the paths, and the people who come to pick.
        </p>
        <ul className="group-jumps">
          {groups.map((group) => (
            <li key={group.name}>
              <a className="jump-chip" href={`#${groupId(group.name)}`}>
                {group.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      {groups.map((group) => (
        <section key={group.name} id={groupId(group.name)} aria-labelledby={`${groupId(group.name)}-heading`}>
          <h2 className="t-h2 group-heading" id={`${groupId(group.name)}-heading`}>
            {group.name}
          </h2>
          <div className="results-grid">
            {group.exhibits.map((exhibit) => (
              <ExhibitCard key={exhibit.slug} exhibit={exhibit} />
            ))}
          </div>
        </section>
      ))}
      <p className="end-line t-caption t-num">That's the whole wing — {order.length} pieces.</p>
      <hr className="gold-rule" />
      <Link className="next-wing" to="/music">
        <WingMarker wing={wingBySlug('music') as Wing} size={16} /> Next room: Listening Room
      </Link>
    </div>
  )
}
