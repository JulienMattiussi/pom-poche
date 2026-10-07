export type GrapeColor = 'purple' | 'green' | 'red' | 'black' | 'pink' | 'amber'

type Bunch = { color: GrapeColor; side: 'left' | 'middle' | 'right' }

export type Product = {
  id: string
  badge: string
  pouch: string
  alt: string
  tilt: number
  bunches: Bunch[]
}

export const GRAPE_COLORS: Record<GrapeColor, string> = {
  purple: '#6b2d7b',
  green: '#9cc23c',
  red: '#b8283f',
  black: '#3a2347',
  pink: '#e17aa0',
  amber: '#d9a62c',
}

export const PRODUCTS: Product[] = [
  {
    id: 'sans-sucres',
    badge: 'Sans sucres ajoutés',
    pouch: 'pouches/velo.webp',
    alt: 'Poche PomPoche Syrah et Grenache, le papy à vélo',
    tilt: 5,
    bunches: [
      { color: 'red', side: 'left' },
      { color: 'purple', side: 'middle' },
      { color: 'black', side: 'right' },
    ],
  },
  {
    id: 'bio',
    badge: 'Bio',
    pouch: 'pouches/mamie.webp',
    alt: 'Poche PomPoche Syrah et Grenache, la mamie qui trinque',
    tilt: -6,
    bunches: [
      { color: 'green', side: 'left' },
      { color: 'amber', side: 'middle' },
      { color: 'green', side: 'right' },
    ],
  },
  {
    id: 'cinq-cepages',
    badge: '5 cépages',
    pouch: 'pouches/grappe.webp',
    alt: 'Poche PomPoche Syrah et Grenache, le vigneron et sa grappe',
    tilt: -8,
    bunches: [
      { color: 'pink', side: 'left' },
      { color: 'amber', side: 'middle' },
      { color: 'purple', side: 'right' },
    ],
  },
]
