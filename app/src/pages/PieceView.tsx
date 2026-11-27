import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { isPainting, parkOrder, type Exhibit } from '../data/catalog'
import { wingBySlug, type Wing } from '../data/wings'
import { cappedWidths, imageUrl, mediaUrl, srcset } from '../lib/media'
import { copyText } from '../lib/clipboard'
import { useDocumentTitle } from '../lib/title'
import { WingMarker } from '../components/WingMarker'
import { Museum404 } from './Museum404'

// Neighbours in the wing order first, then the rest — six pieces, never the
// current one (Nadia §4.1: neighbours first, then featured; the pilot fits in
// six, so no featured fill is needed).
function moreFrom(order: Exhibit[], index: number): Exhibit[] {
  const out: Exhibit[] = []
  for (let distance = 1; distance < order.length && out.length < 6; distance++) {
    const before = order[index - distance]
    const after = order[index + distance]
    if (before) out.push(before)
    if (out.length >= 6) break
    if (after) out.push(after)
  }
  return out
}

function fileTypeOf(exhibit: Exhibit): string {
  if (exhibit.format) return exhibit.format.toUpperCase()
  const ext = exhibit.mediaKey.split('.').pop()
  return (ext ?? 'file').toUpperCase()
}

// Nadia §4.1 + Mina §4.8: the single-piece view. Photographs hang whole-frame
// on the deep-2 stage with the gold keyline (FE-1's binding condition);
// paintings hang whole on the paper-0 mat stage with fit=pad. Title, captions,
// details, and actions stay below the stage on paper — never over the image.
export function PieceView() {
  const { slug = '' } = useParams()
  const order = parkOrder()
  const index = order.findIndex((e) => e.slug === slug)
  const exhibit = index === -1 ? undefined : order[index]
  useDocumentTitle(exhibit ? exhibit.title : "This room doesn't exist")
  const [copied, setCopied] = useState<'page' | 'media' | null>(null)
  const [failed, setFailed] = useState(false)

  if (!exhibit) return <Museum404 />

  const park = wingBySlug('park') as Wing
  const painting = isPainting(exhibit)
  const widths = cappedWidths(exhibit.nativeWidth, 1920)
  const largest = widths[widths.length - 1]
  const quality = painting ? 85 : 80
  const fit = painting ? 'pad' : undefined
  const src = imageUrl(exhibit.mediaKey, { width: largest, quality, fit })
  const fileHref = mediaUrl(exhibit.mediaKey)
  const pageHref = typeof window === 'undefined' ? `/park/${exhibit.slug}` : window.location.href
  const prev = order[index - 1]
  const next = order[index + 1]
  const canShare = typeof navigator !== 'undefined' && 'share' in navigator

  const copy = async (kind: 'page' | 'media') => {
    const ok = await copyText(kind === 'page' ? pageHref : fileHref)
    if (!ok) return
    setCopied(kind)
    window.setTimeout(() => setCopied(null), 2000)
  }

  const share = () => {
    void navigator.share({ title: exhibit.title, url: pageHref }).catch(() => {})
  }

  const img = failed ? (
    <span className="stage-error">
      <span>This piece won't load.</span> <a href={fileHref}>Open the original file</a>
    </span>
  ) : (
    <img
      src={src}
      srcSet={srcset(exhibit.mediaKey, { widths, quality, fit })}
      sizes="(max-width: 1279px) 100vw, 66vw"
      alt={exhibit.altText ?? ''}
      width={exhibit.nativeWidth}
      height={exhibit.nativeHeight}
      onError={() => setFailed(true)}
    />
  )

  return (
    <div className="piece">
      <Link className="back-pill" to="/park">
        Back to The Park
      </Link>
      <div className="piece-grid">
        {painting ? (
          <figure className="art-stage" data-stage="art" data-testid="art-stage">
            {img}
          </figure>
        ) : (
          <figure className="photo-stage" data-stage="photo" data-testid="photo-stage">
            <span className="photo-keyline" data-testid="photo-keyline">
              {img}
            </span>
          </figure>
        )}
        <div className="piece-rail">
          <p className="piece-eyebrow">
            <WingMarker wing={park} size={16} /> <span className="t-caps">The Park</span>
          </p>
          <h1 className="t-h1">{exhibit.title}</h1>
          {exhibit.captionShort && <p className="t-body">{exhibit.captionShort}</p>}
          {exhibit.captionLong && <p className="t-body-serif">{exhibit.captionLong}</p>}
          <dl className="details">
            {exhibit.group && (
              <div className="details-row">
                <dt className="t-label">Subject</dt>
                <dd className="t-body-sm">{exhibit.group}</dd>
              </div>
            )}
            {exhibit.whereUsed && (
              <div className="details-row">
                <dt className="t-label">Appears on</dt>
                <dd className="t-body-sm">{exhibit.whereUsed}</dd>
              </div>
            )}
            <div className="details-row">
              <dt className="t-label">File type</dt>
              <dd className="t-body-sm">{fileTypeOf(exhibit)}</dd>
            </div>
          </dl>
          <div className="actions">
            <a className="button button--secondary" href={fileHref}>
              View full size
            </a>
            <button type="button" className="button-quiet" onClick={() => void copy('page')}>
              {copied === 'page' ? 'Page link copied' : 'Copy page link'}
            </button>
            <button type="button" className="button-quiet" onClick={() => void copy('media')}>
              {copied === 'media' ? 'Media link copied' : 'Copy media link'}
            </button>
            {canShare && (
              <button type="button" className="button-quiet" onClick={share}>
                Share
              </button>
            )}
          </div>
          <p className="visually-hidden" aria-live="polite">
            {copied === 'page' ? 'Page link copied' : copied === 'media' ? 'Media link copied' : ''}
          </p>
        </div>
      </div>
      <nav className="prev-next" aria-label="Previous and next pieces">
        {prev ? (
          <Link to={`/park/${prev.slug}`} data-testid="piece-prev" className="prev-next-button">
            Previous: {prev.title}
          </Link>
        ) : (
          <Link to="/park" data-testid="piece-prev" className="prev-next-button">
            Back to The Park
          </Link>
        )}
        {next ? (
          <Link to={`/park/${next.slug}`} data-testid="piece-next" className="prev-next-button">
            Next: {next.title}
          </Link>
        ) : (
          <Link to="/park" data-testid="piece-next" className="prev-next-button">
            Back to The Park
          </Link>
        )}
      </nav>
      <section data-testid="more-from-rail" className="more-from" aria-label="More from The Park">
        <h2 className="t-h2">More from The Park</h2>
        <div className="more-from-grid">
          {moreFrom(order, index).map((other) => (
            <Link key={other.slug} to={`/park/${other.slug}`} className="more-from-card">
              <img
                src={imageUrl(other.mediaKey, {
                  width: 320,
                  quality: isPainting(other) ? 85 : 80,
                  fit: isPainting(other) ? 'pad' : undefined,
                })}
                alt=""
                loading="lazy"
              />
              <span className="t-body-sm">{other.title}</span>
            </Link>
          ))}
        </div>
      </section>
      <Link className="back-pill" to="/park">
        Back to The Park
      </Link>
    </div>
  )
}
