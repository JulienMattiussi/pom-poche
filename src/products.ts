export type GrapeColor = 'purple' | 'green' | 'red' | 'black' | 'pink' | 'amber'

type Bunch = { color: GrapeColor; side: 'left' | 'middle' | 'right' }

export type Product = {
  id: string
  badge: string
  band: string
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
    band: '#e03246',
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
    band: '#f08a1c',
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
    band: '#ef7d1a',
    tilt: -8,
    bunches: [
      { color: 'pink', side: 'left' },
      { color: 'amber', side: 'middle' },
      { color: 'purple', side: 'right' },
    ],
  },
]
