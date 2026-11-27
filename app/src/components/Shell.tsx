import { Link, NavLink, Outlet } from 'react-router-dom'
import { WINGS } from '../data/wings'
import { WingMarker } from './WingMarker'

// Nadia §3.0 / Mina §4.0: the persistent shell — wordmark, the five-wing nav
// (one nav element restyled per breakpoint, so aria-current stays unique),
// content, footer. The wing strip wraps and scrolls away on phones (AF-2);
// the desktop bar sticks.
export function Shell() {
  return (
    <div className="shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="topbar">
          <Link className="wordmark" to="/">
            <span className="wordmark-eyebrow t-caps">HUES FLORAL PARK</span>
            <span className="wordmark-name">The Media Museum</span>
          </Link>
        </div>
        <nav className="wing-nav" aria-label="Wings">
          <ul>
            {WINGS.map((wing) => (
              <li key={wing.slug}>
                <NavLink to={wing.route} className={({ isActive }) => (isActive ? 'wing-chip is-active' : 'wing-chip')}>
                  <WingMarker wing={wing} size={20} />
                  <span className="wing-chip-label">{wing.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main id="main" className="page">
        <Outlet />
      </main>
      <footer className="site-footer">
        <div className="site-footer-inner">
          <p className="t-body-sm">The media library of Hues Floral Park.</p>
          <a className="footer-exit" href="https://hues.flowers">
            Visit hues.flowers
          </a>
          <p className="footer-colophon t-caption">Media served from this address.</p>
        </div>
      </footer>
    </div>
  )
}
