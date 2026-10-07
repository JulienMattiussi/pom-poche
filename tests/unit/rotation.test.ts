import { assignVideos, shuffle, withBackups } from '@/lib/rotation'

const sequence = (...values: number[]) => {
  let i = 0
  return () => values[i++ % values.length]!
}

describe('shuffle', () => {
  it('keeps every item exactly once, without touching the input', () => {
    const input = ['a', 'b', 'c', 'd']
    const output = shuffle(input, sequence(0.9, 0.1, 0.5))
    expect([...output].sort()).toEqual(input)
    expect(input).toEqual(['a', 'b', 'c', 'd'])
  })

  it('follows the random source', () => {
    expect(shuffle(['a', 'b', 'c'], () => 0)).toEqual(['b', 'c', 'a'])
    expect(shuffle(['a', 'b', 'c'], () => 0.99)).toEqual(['a', 'b', 'c'])
  })
})

describe('assignVideos', () => {
  it('gives each slot a distinct video, the leftovers and backup-only ones as fallbacks', () => {
    const slots = assignVideos(2, ['a', 'b', 'c', 'd'], ['h'], () => 0.99)
    expect(slots).toEqual([
      ['a', 'c', 'd', 'h'],
      ['b', 'd', 'h', 'c'],
    ])
  })

  it('leaves extra slots empty when the pool runs out', () => {
    expect(assignVideos(3, ['a'], [], () => 0)).toEqual([['a']])
  })
})

describe('withBackups', () => {
  it('tries the primary video first, then rotates the backups by offset', () => {
    expect(withBackups('main', ['a', 'b', 'c'], 0)).toEqual(['main', 'a', 'b', 'c'])
    expect(withBackups('main', ['a', 'b', 'c'], 1)).toEqual(['main', 'b', 'c', 'a'])
    expect(withBackups('main', ['a', 'b', 'c'], 5)).toEqual(['main', 'c', 'a', 'b'])
  })

  it('never lists the primary twice', () => {
    expect(withBackups('a', ['a', 'b'], 0)).toEqual(['a', 'b'])
  })

  it('works without backups', () => {
    expect(withBackups('main', [], 3)).toEqual(['main'])
  })
})
