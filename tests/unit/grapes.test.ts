import { bunchLayout } from '@/lib/grapes'

describe('bunchLayout', () => {
  it('gives the same bunch for the same seed', () => {
    expect(bunchLayout(3)).toEqual(bunchLayout(3))
  })

  it('varies the bunch with the seed', () => {
    expect(bunchLayout(3)).not.toEqual(bunchLayout(4))
  })

  it('keeps every berry inside the 100x130 box', () => {
    for (let seed = 0; seed < 50; seed++) {
      for (const { x, y, rx, ry } of bunchLayout(seed)) {
        expect(x - rx).toBeGreaterThan(0)
        expect(x + rx).toBeLessThan(100)
        expect(y + ry).toBeLessThan(130)
      }
    }
  })

  it('paints the outer berries first, so the central ones overlap them', () => {
    const offsets = bunchLayout(1).map(({ x }) => Math.abs(x - 50))
    expect(offsets).toEqual([...offsets].sort((a, b) => b - a))
  })
})
