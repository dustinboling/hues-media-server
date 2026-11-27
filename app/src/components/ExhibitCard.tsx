import { useState } from 'react'
import { Link } from 'react-router-dom'
import { isPainting, isPortrait, type Exhibit } from '../data/catalog'
import { cappedWidths, imageUrl, mediaUrl, srcset } from '../lib/media'
import { saveReturnState } from '../lib/restore'

// Mina §3.3 ExhibitCard: the grid cell — image, then title below the image on
// the paper ground, then the group line. Photos render 4/3 (3/4 when the
// catalog says the piece is portrait-aspect); plates render at the catalog
// ratio with fit=pad, never cropped. Cover crops anchor on cropFocus.
// A failed image keeps its aspect box with a labelled broken state (Nadia
// §3.8) — one bad file never takes down a wall, and the fallback is not a
// link-in-a-link.
export function ExhibitCard({ exhibit }: { exhibit: Exhibit }) {
  const [failed, setFailed] = useState(false)
  const painting = isPainting(exhibit)
  const portrait = !painting && isPortrait(exhibit)
  const widths = cappedWidths(exhibit.nativeWidth, 480)
  const largest = widths[widths.length - 1]
  const quality = painting ? 85 : 80
  const fit = painting ? 'pad' : undefined
  const src = imageUrl(exhibit.mediaKey, { width: largest, quality, fit })
  const frameStyle =
    painting && exhibit.nativeWidth && exhibit.nativeHeight
      ? { aspectRatio: `${exhibit.nativeWidth} / ${exhibit.nativeHeight}` }
      : undefined
  const className = `exhibit-card${portrait ? ' exhibit-card--portrait' : ''}${painting ? ' exhibit-card--plate' : ''}`

  if (failed) {
    return (
      <div className={className} data-testid={`exhibit-card-${exhibit.slug}`} data-exhibit-slug={exhibit.slug}>
        <span className="exhibit-card-frame" style={frameStyle}>
          <span className="exhibit-card-error">
            <span>This piece won't load.</span> <a href={mediaUrl(exhibit.mediaKey)}>Open the original file</a>
          </span>
        </span>
        <Link to={`/park/${exhibit.slug}`} className="exhibit-card-title t-body">
          {exhibit.title}
        </Link>
        {exhibit.group && <span className="exhibit-card-group t-caption">{exhibit.group}</span>}
      </div>
    )
  }

  return (
    <Link
      to={`/park/${exhibit.slug}`}
      className={className}
      data-testid={`exhibit-card-${exhibit.slug}`}
      data-exhibit-slug={exhibit.slug}
      onClick={() => saveReturnState('/park', { scrollY: window.scrollY, slug: exhibit.slug })}
    >
      <span className="exhibit-card-frame" style={frameStyle}>
        <img
          src={src}
          srcSet={srcset(exhibit.mediaKey, { widths, quality, fit })}
          sizes="(max-width: 767px) 50vw, (max-width: 1279px) 33vw, 25vw"
          alt={exhibit.altText ?? ''}
          loading="lazy"
          style={{ objectPosition: exhibit.cropFocus ?? '50% 50%' }}
          onError={() => setFailed(true)}
        />
      </span>
      <span className="exhibit-card-title t-body">{exhibit.title}</span>
      {exhibit.group && <span className="exhibit-card-group t-caption">{exhibit.group}</span>}
    </Link>
  )
}
