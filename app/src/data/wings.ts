// The five wings in job-ranked order (Nadia §3.1): Dahlias, The Park,
// Listening Room, Art & Motifs, Arcade. Names are Nadia's locked IA labels;
// scents and intros are Wren's final copy (§1–§2); entry images are Elena's
// five picks (§2) with Wren's §5.1 alt text; markers are Mina's §1.4 shapes.
export type MarkerShape = 'disc' | 'arch' | 'pill' | 'square' | 'rounded-square'

export interface WingEntry {
  mediaKey: string
  kind: 'photo' | 'painting'
  alt: string
  title: string
  cropFocus?: string
}

export interface Wing {
  slug: 'dahlias' | 'park' | 'music' | 'art' | 'arcade'
  name: string
  route: string
  scent: string
  intro: string
  marker: { shape: MarkerShape; fillVar: string }
  entry: WingEntry
}

export const WINGS: Wing[] = [
  {
    slug: 'dahlias',
    name: 'Dahlias',
    route: '/dahlias',
    // Wren's scent carries a {count} slot; the gate retired the 412 file
    // count, so slice 1 renders the line without a number until the Dahlias
    // catalog lands with a real exhibit count.
    scent: 'All cultivar photographs, A to Z.',
    intro: 'Every cultivar photograph in the collection — the featured wall first, then the whole alphabet.',
    marker: { shape: 'disc', fillVar: 'var(--color-marker-dahlias)' },
    entry: {
      mediaKey: 'hues/dahlias/labyrinth/P1000288-Labyrinth.jpg',
      kind: 'photo',
      title: 'Labyrinth',
      alt: 'A single Labyrinth dahlia in close-up: a very large coral-pink bloom with twisted, magenta-streaked petals filling the frame, soft green garden behind it.',
    },
  },
  {
    slug: 'park',
    name: 'The Park',
    route: '/park',
    scent: 'The grounds as they are — beds, lawns, paths and people.',
    intro: 'The grounds themselves: beds in flower, the lawns, the paths, and the people who come to pick.',
    marker: { shape: 'arch', fillVar: 'var(--color-marker-park)' },
    entry: {
      mediaKey: 'hues/home/hero-golden-hour.webp',
      kind: 'painting',
      title: 'Golden Hour Over the Beds',
      alt: 'Watercolor panorama of Hues Floral Park at golden hour: a winding path between color-blocked dahlia beds, string lights strung above the beds, hills behind, the whole scene inside a painted paper border.',
    },
  },
  {
    slug: 'music',
    name: 'Listening Room',
    route: '/music',
    scent: "The park's songs, each one sung and instrumental.",
    intro: "The park's music as it plays at Hues — every song in both its voices.",
    marker: { shape: 'pill', fillVar: 'var(--color-marker-music)' },
    entry: {
      mediaKey: 'hues/m-art/cards/music-hero-1080.webp',
      kind: 'painting',
      title: 'Music Over the Beds',
      alt: 'Watercolor of dahlia beds at dusk under string lights, with glowing music notes drifting over the rows, inside a painted paper border.',
    },
  },
  {
    slug: 'art',
    name: 'Art & Motifs',
    route: '/art',
    scent: 'The paintings and plates the sites are dressed in.',
    intro: 'Paintings and botanical plates — the artwork the Hues sites are dressed in.',
    marker: { shape: 'square', fillVar: 'var(--color-marker-art)' },
    entry: {
      mediaKey: 'hues/m-art/painting-1080.webp',
      kind: 'painting',
      title: 'The Procession',
      alt: 'Watercolor of the cottage flower beds at Hues: a duck, a goose, Bella the dog and Hue the rabbit walk in procession up a stone path toward a rainbow at the vanishing point; the upper half of the painting is pale, empty sky.',
      // Elena's low anchor: the composition's life is in its lower
      // two-thirds; the entrance card crop must not read as empty sky.
      cropFocus: '50% 72%',
    },
  },
  {
    slug: 'arcade',
    name: 'Arcade',
    route: '/arcade',
    scent: 'Finished art from the games, hung game by game.',
    intro: "The finished art of the park's games, hung game by game.",
    marker: { shape: 'rounded-square', fillVar: 'var(--color-marker-arcade)' },
    entry: {
      mediaKey: 'hues/play/arcade-hero-trio.webp',
      kind: 'painting',
      title: 'Dusty, Hue & Cocoa',
      alt: 'Watercolor of Dusty the gardener, Hue the white rabbit and Cocoa the brown rabbit, all three in overalls, standing in front of the Hues Floral Park stand with dahlias in the foreground and string lights above. Painted lettering on the stand reads "HUES FLORAL PARK"; their name tags read "Dusty", "Hue" and "Cocoa".',
    },
  },
]

export function wingBySlug(slug: string): Wing | undefined {
  return WINGS.find((w) => w.slug === slug)
}
