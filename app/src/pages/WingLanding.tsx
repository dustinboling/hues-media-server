import { Link } from 'react-router-dom'
import { wingBySlug, type Wing } from '../data/wings'
import { cappedWidths, imageUrl, srcset } from '../lib/media'
import { useDocumentTitle } from '../lib/title'
import { WingMarker } from '../components/WingMarker'

// The designed landing state for a wing whose gallery arrives in a later
// slice: entry image, name, intro, and Wren's honest being-hung note with
// links to the open room. No gallery content is faked.
export function WingLanding({ slug }: { slug: string }) {
  const wing = wingBySlug(slug) as Wing
  useDocumentTitle(wing.name)
  const widths = cappedWidths(undefined, 1024)
  const largest = widths[widths.length - 1]
  const quality = wing.entry.kind === 'painting' ? 85 : 80
  return (
    <div className="wing wing--landing">
      <p className="wing-eyebrow">
        <WingMarker wing={wing} size={24} />
      </p>
      <h1 className="t-h1">{wing.name}</h1>
      <p className="t-lede">{wing.intro}</p>
      <figure className="landing-entry">
        <img
          src={imageUrl(wing.entry.mediaKey, { width: largest, quality })}
          srcSet={srcset(wing.entry.mediaKey, { widths, quality })}
          sizes="(max-width: 767px) 100vw, 66vw"
          alt={wing.entry.alt}
          style={{ objectPosition: wing.entry.cropFocus ?? '50% 50%' }}
        />
      </figure>
      <h2 className="t-h2">This room is still being hung.</h2>
      <p className="t-body">Nothing has been catalogued here yet — the other rooms are open.</p>
      <p className="t-body">
        Open now: <Link to="/park">The Park</Link>
      </p>
    </div>
  )
}
