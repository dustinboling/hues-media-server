import { Link } from 'react-router-dom'
import { WINGS } from '../data/wings'
import { useDocumentTitle } from '../lib/title'
import { WingMarker } from '../components/WingMarker'

// Nadia §3.7 / Mina §4.7 / Wren §7: the museum 404 — a designed page inside
// the shell, unmistakably different from the Worker's plain-text media 404.
// The search field arrives with /search in a later slice.
export function Museum404() {
  useDocumentTitle("This room doesn't exist")
  return (
    <div className="museum-404" data-testid="museum-404">
      <p className="t-caps">NOT A ROOM</p>
      <h1 className="t-h1">This room doesn't exist.</h1>
      <p className="t-lede">
        The address points at a room the museum doesn't have. The five real rooms are below — or search the collection.
      </p>
      <ul className="wing-chips">
        {WINGS.map((wing) => (
          <li key={wing.slug}>
            <Link to={wing.route} className="wing-chip">
              <WingMarker wing={wing} size={20} />
              <span className="wing-chip-label">{wing.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <a className="button button--secondary" href="https://hues.flowers">
        Visit hues.flowers
      </a>
    </div>
  )
}
