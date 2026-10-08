export type Berry = { x: number; y: number; rx: number; ry: number; rotate: number }

const ROWS = [5, 6, 6, 5, 4, 3, 2, 1]
const TOP = 34
const ROW_GAP = 11.5
const COL_GAP = 14.5
const AXIS = 50

// mulberry32: tiny seeded PRNG, so a bunch keeps its shape across renders.
const random = (seed: number) => () => {
  seed = (seed + 0x6d2b79f5) | 0
  let t = Math.imul(seed ^ (seed >>> 15), seed | 1)
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296
}

/**
 * Berries of a bunch in a 100x130 box, in paint order: the outer berries first,
 * so the ones on the axis, closer to the viewer, overlap them.
 */
export const bunchLayout = (seed: number): Berry[] => {
  const rand = random(seed)
  const between = (min: number, max: number) => min + rand() * (max - min)

  const berries = ROWS.flatMap((count, row) =>
    Array.from({ length: count }, (_, i) => {
      const edge = i === 0 || i === count - 1
      if (edge && row > 1 && count > 2 && rand() < 0.3) return []
      const x = AXIS + (i - (count - 1) / 2) * COL_GAP + between(-2.2, 2.2)
      const rx = between(7.6, 9.2)
      return [
        {
          x,
          y: TOP + row * ROW_GAP + between(-2, 2),
          rx,
          ry: rx * between(1.05, 1.18),
          rotate: (x - AXIS) * 0.4 + between(-12, 12),
        },
      ]
    }),
  ).flat()

  return berries.sort((a, b) => Math.abs(b.x - AXIS) - Math.abs(a.x - AXIS))
}
