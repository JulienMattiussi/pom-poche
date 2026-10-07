import type { GrapeColor } from '@/data/grapes'

type Engagement = {
  title: string
  color: 'text-sky' | 'text-lime' | 'text-pine'
  tilt: number
  place: 'left' | 'right' | 'center'
  grapes: GrapeColor[]
}

type BurstItem = {
  kind: 'bunch' | 'leaf' | 'stick'
  x: number
  y: number
  size: number
  rotate: number
}

export const ENGAGEMENTS: Engagement[] = [
  {
    title: "L'allié fruité du bien boire",
    color: 'text-sky',
    tilt: 0,
    place: 'left',
    grapes: ['purple', 'green', 'red', 'black'],
  },
  {
    title: "S'allier pour la vigne",
    color: 'text-lime',
    tilt: 2,
    place: 'right',
    grapes: ['green', 'amber', 'green', 'pink'],
  },
  {
    title: "L'allié de tous les apéros",
    color: 'text-pine',
    tilt: -8,
    place: 'center',
    grapes: ['red', 'pink', 'purple', 'amber'],
  },
]

export const BURST: BurstItem[] = [
  { kind: 'stick', x: 16, y: -6, size: 14, rotate: -40 },
  { kind: 'stick', x: 78, y: -10, size: 16, rotate: 35 },
  { kind: 'leaf', x: -4, y: 36, size: 24, rotate: -35 },
  { kind: 'leaf', x: 62, y: -14, size: 22, rotate: 15 },
  { kind: 'leaf', x: 103, y: 12, size: 26, rotate: 55 },
  { kind: 'leaf', x: 92, y: 96, size: 20, rotate: 150 },
  { kind: 'bunch', x: 40, y: -14, size: 21, rotate: -12 },
  { kind: 'bunch', x: 2, y: 80, size: 28, rotate: 18 },
  { kind: 'bunch', x: 100, y: 54, size: 28, rotate: -16 },
  { kind: 'bunch', x: 52, y: 104, size: 24, rotate: 6 },
]
