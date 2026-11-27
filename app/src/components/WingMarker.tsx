import type { CSSProperties } from 'react'
import type { Wing } from '../data/wings'

// Mina §1.4: the presentational wing marker — silhouette + accent infill +
// structural ring. Identity is always the adjacent text label's job (Ada A3-1),
// so this renders aria-hidden at every size. Radii scale with size so the
// square keeps its corners at 16px instead of collapsing into a disc.
export function WingMarker({ wing, size }: { wing: Wing; size: 16 | 20 | 24 }) {
  const radius =
    wing.marker.shape === 'disc' || wing.marker.shape === 'pill'
      ? '50%'
      : wing.marker.shape === 'arch'
        ? '50% 50% 0 0 / 100% 100% 0 0'
        : wing.marker.shape === 'square'
          ? `${size / 3}px`
          : `${(size * 2) / 3}px`
  const style: CSSProperties = {
    width: wing.marker.shape === 'pill' ? size * 1.6 : size,
    height: size,
    backgroundColor: wing.marker.fillVar,
    borderRadius: radius,
  }
  return <span aria-hidden="true" className="wing-marker" style={style} />
}
