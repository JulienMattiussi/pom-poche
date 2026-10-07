export const YOUTUBE_ORIGIN = 'https://www.youtube-nocookie.com'

export const embedUrl = (id: string, origin: string) =>
  `${YOUTUBE_ORIGIN}/embed/${id}?enablejsapi=1&mute=1&controls=0&playsinline=1&rel=0&modestbranding=1&origin=${encodeURIComponent(origin)}`

export const playerUrl = (id: string) =>
  `${YOUTUBE_ORIGIN}/embed/${id}?rel=0&autoplay=1&mute=1&loop=1&playlist=${id}&playsinline=1`

export const backgroundUrl = (id: string, start = 0) =>
  `${YOUTUBE_ORIGIN}/embed/${id}?autoplay=1&mute=1&controls=0&loop=1&playlist=${id}&playsinline=1&rel=0&disablekb=1&iv_load_policy=3&start=${start}`

export const LISTEN_MESSAGE = JSON.stringify({ event: 'listening' })

export const commandMessage = (func: string, args: unknown[] = []) =>
  JSON.stringify({ event: 'command', func, args })

export const PLAYING = 1
export const ENDED = 0

type PlayerUpdate = {
  ready?: true
  error?: true
  state?: number
  currentTime?: number
  duration?: number
}

const number = (value: unknown) => (typeof value === 'number' ? value : undefined)

export const playerUpdate = (raw: unknown): PlayerUpdate | null => {
  if (typeof raw !== 'string') return null
  let data: { event?: string; info?: unknown }
  try {
    data = JSON.parse(raw)
  } catch {
    return null
  }
  if (data.event === 'onReady') return { ready: true }
  if (data.event === 'onError') return { error: true }
  if (data.event === 'onStateChange') {
    const state = number(data.info)
    return state === undefined ? null : { state }
  }
  if (data.event === 'infoDelivery' && data.info && typeof data.info === 'object') {
    const info = data.info as Record<string, unknown>
    const update: PlayerUpdate = {}
    if (number(info.playerState) !== undefined) update.state = number(info.playerState)
    if (number(info.currentTime) !== undefined) update.currentTime = number(info.currentTime)
    if (number(info.duration) !== undefined) update.duration = number(info.duration)
    return Object.keys(update).length ? update : null
  }
  return null
}
