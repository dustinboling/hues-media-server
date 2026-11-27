import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { exhibitsInWing } from '../data/catalog'
import { WINGS, type Wing } from '../data/wings'
import { cappedWidths, imageUrl, srcset } from '../lib/media'
import { MUSEUM_NAME, useDocumentTitle } from '../lib/title'
import { WingMarker } from '../components/WingMarker'

// Nadia §3.1 / Mina §4.1 / Wren §1: the entrance. Title block, wing directory,
// About strip. Search, highlights, and the scale line arrive with the full
// catalog in later slices — they are omitted, not faked.
function WingCard({ wing }: { wing: Wing }) {
  const parkCount = exhibitsInWing('park').length
  const widths = cappedWidths(undefined, 1024)
  const largest = widths[widths.length - 1]
  const quality = wing.entry.kind === 'painting' ? 85 : 80
  return (
    <Link to={wing.route} className={`wing-card wing-card--${wing.slug}`} data-testid={`wing-card-${wing.slug}`}>
      <span className="wing-card-media">
        <img
          src={imageUrl(wing.entry.mediaKey, { width: largest, quality })}
          srcSet={srcset(wing.entry.mediaKey, { widths, quality })}
          sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 25vw"
          alt={wing.entry.alt}
          loading={wing.slug === 'dahlias' ? 'eager' : 'lazy'}
          style={{ objectPosition: wing.entry.cropFocus ?? '50% 50%' }}
        />
      </span>
      <span className="wing-card-eyebrow">
        <WingMarker wing={wing} size={24} />
        <span className="t-caps">{wing.slug === 'park' ? `${parkCount} pieces` : 'Being hung'}</span>
      </span>
      <span className="wing-card-title t-title">{wing.name}</span>
      <span className="wing-card-scent t-body-sm">{wing.scent}</span>
    </Link>
  )
}

export function Entrance() {
  useDocumentTitle(MUSEUM_NAME)
  useEffect(() => {
    // Mina §6: the entrance settles once, on first load only — never on
    // return navigation.
    try {
      if (sessionStorage.getItem('museum:entered')) {
        document.getElementById('root')?.classList.add('is-return')
      } else {
        sessionStorage.setItem('museum:entered', '1')
      }
    } catch {
      // No storage: the settle animation simply replays. Harmless.
    }
  }, [])
  return (
    <div className="entrance">
      <div className="title-block">
        <p className="eyebrow t-caps">HUES FLORAL PARK</p>
        <h1 className="t-display t-display--xl">The Media Museum</h1>
        <p className="t-lede">
          Every photograph, painting and song the Hues websites run on — the actual files, hung in five rooms so we
          can find them, look at them properly, and use them again.
        </p>
      </div>
      <h2 className="t-h2">The five rooms</h2>
      <div className="wing-grid">
        {WINGS.map((wing) => (
          <WingCard key={wing.slug} wing={wing} />
        ))}
      </div>
      <section className="about-card" data-testid="about-strip" aria-label="About this museum">
        <p className="t-lede">
          This is Hues Floral Park's media library: the same photographs, paintings and recordings the websites use,
          kept at the address they already live at. It is hung for the people who make Hues — find a file, see it at
          full size, copy its link, use it again. Nothing here is a stand-in: every piece is the real file the
          websites run on, shown at a size for looking — the file itself is one tap away.
        </p>
        <a className="button button--secondary" href="https://hues.flowers">
          Visit hues.flowers
        </a>
      </section>
    </div>
  )
}
