import records from './catalog.json'

// One record per exhibit (Nadia §4.3). Slice 1 ships the Park pilot only;
// later slices extend this file from the full catalog.
export interface Exhibit {
  slug: string
  title: string
  wing: string
  mediaKey: string
  mediaType: string
  format?: string
  nativeWidth?: number
  nativeHeight?: number
  altText?: string
  captionShort?: string
  captionLong?: string
  keywords?: string[]
  group?: string
  cropFocus?: string
  featured?: boolean
  highlightOrder?: number
  whereUsed?: string
  exhibitStatus: string
  provenance?: string
}

export const EXHIBITS: Exhibit[] = (records as Exhibit[]).filter((e) => e.exhibitStatus === 'in')

export function exhibitsInWing(wing: string): Exhibit[] {
  return EXHIBITS.filter((e) => e.wing === wing)
}

export function exhibitBySlug(wing: string, slug: string): Exhibit | undefined {
  return EXHIBITS.find((e) => e.wing === wing && e.slug === slug)
}

// Park subject groups in the design's listing order (Nadia §3.2, Wren §2).
// Only groups with exhibits in the catalog render — Seasons stays listed here
// so it appears by data alone when the catalog gains a Seasons piece.
export const PARK_GROUP_ORDER = ['Beds & Blooms', 'The Grounds', 'Seasons', 'People']

export interface ExhibitGroup {
  name: string
  exhibits: Exhibit[]
}

export function parkGroups(): ExhibitGroup[] {
  const inWing = exhibitsInWing('park')
  return PARK_GROUP_ORDER.map((name) => ({
    name,
    exhibits: inWing.filter((e) => e.group === name),
  })).filter((g) => g.exhibits.length > 0)
}

// The wing's canonical order: grouped order flattened. Previous/Next and the
// more-from rail walk this order.
export function parkOrder(): Exhibit[] {
  return parkGroups().flatMap((g) => g.exhibits)
}

// Paintings take the paper-0 mat stage; everything else takes the deep-2
// photo stage (Mina §2.1, Elena FE-1). Decided by catalog provenance,
// never per piece by hand.
export function isPainting(exhibit: Exhibit): boolean {
  return exhibit.provenance === 'painting'
}

// Portrait-aspect pieces render the 3/4 card variant; landscape and square
// render 4/3 (Mina §3.3 gate Q2). Aspect-driven from catalog dimensions.
export function isPortrait(exhibit: Exhibit): boolean {
  return (exhibit.nativeHeight ?? 0) > (exhibit.nativeWidth ?? 0)
}
