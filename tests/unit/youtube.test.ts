import { backgroundUrl, commandMessage, embedUrl, playerUpdate, playerUrl } from '@/lib/youtube'

describe('embedUrl', () => {
  it('builds a muted, looping, scriptable nocookie embed', () => {
    const url = new URL(embedUrl('abc', 'http://localhost:9096'))
    expect(url.origin).toBe('https://www.youtube-nocookie.com')
    expect(url.pathname).toBe('/embed/abc')
    expect(url.searchParams.get('enablejsapi')).toBe('1')
    expect(url.searchParams.get('mute')).toBe('1')
    expect(url.searchParams.has('loop')).toBe(false)
    expect(url.searchParams.get('origin')).toBe('http://localhost:9096')
  })
})

describe('playerUrl', () => {
  it('builds a muted, autoplaying, looping nocookie player', () => {
    const url = new URL(playerUrl('abc'))
    expect(url.origin + url.pathname).toBe('https://www.youtube-nocookie.com/embed/abc')
    expect(url.searchParams.get('autoplay')).toBe('1')
    expect(url.searchParams.get('mute')).toBe('1')
    expect(url.searchParams.get('loop')).toBe('1')
    expect(url.searchParams.get('playlist')).toBe('abc')
    expect(url.searchParams.get('rel')).toBe('0')
  })
})

describe('backgroundUrl', () => {
  it('builds a muted, looping player without any controls', () => {
    const url = new URL(backgroundUrl('abc'))
    expect(url.searchParams.get('autoplay')).toBe('1')
    expect(url.searchParams.get('mute')).toBe('1')
    expect(url.searchParams.get('controls')).toBe('0')
    expect(url.searchParams.get('playlist')).toBe('abc')
    expect(url.searchParams.get('start')).toBe('0')
  })

  it('can skip the beginning of the video', () => {
    expect(new URL(backgroundUrl('abc', 4)).searchParams.get('start')).toBe('4')
  })
})

describe('commandMessage', () => {
  it('serializes a player command', () => {
    expect(JSON.parse(commandMessage('seekTo', [0, true]))).toEqual({
      event: 'command',
      func: 'seekTo',
      args: [0, true],
    })
  })
})

describe('playerUpdate', () => {
  it('recognizes readiness, errors and state changes', () => {
    expect(playerUpdate(JSON.stringify({ event: 'onReady' }))).toEqual({ ready: true })
    expect(playerUpdate(JSON.stringify({ event: 'onError', info: 150 }))).toEqual({ error: true })
    expect(playerUpdate(JSON.stringify({ event: 'onStateChange', info: 1 }))).toEqual({ state: 1 })
  })

  it('extracts progress from info deliveries', () => {
    expect(
      playerUpdate(
        JSON.stringify({
          event: 'infoDelivery',
          info: { playerState: 1, currentTime: 4.2, duration: 18, volume: 0 },
        }),
      ),
    ).toEqual({ state: 1, currentTime: 4.2, duration: 18 })
  })

  it('ignores anything else', () => {
    expect(playerUpdate(JSON.stringify({ event: 'infoDelivery', info: { volume: 0 } }))).toBeNull()
    expect(playerUpdate(JSON.stringify({ event: 'infoDelivery', info: null }))).toBeNull()
    expect(playerUpdate(JSON.stringify({ event: 'onStateChange', info: 'x' }))).toBeNull()
    expect(playerUpdate('not json')).toBeNull()
    expect(playerUpdate({ event: 'onReady' })).toBeNull()
  })
})
