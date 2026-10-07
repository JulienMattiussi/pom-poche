<template>
  <li
    ref="root"
    class="post"
    :style="{ '--tilt': `${post.tilt}deg` }"
    @mouseenter="play"
    @mouseleave="stop"
  >
    <button
      v-if="videoId"
      type="button"
      class="post__video"
      :aria-label="wanted ? 'Arrêter la vidéo' : 'Lire la vidéo (sans le son)'"
      :tabindex="duplicate ? -1 : 0"
      @click="wanted ? stop() : play()"
    >
      <img
        :src="`https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`"
        alt=""
        loading="lazy"
        class="post__thumb"
        @error="fallBack"
      />
      <iframe
        v-if="armed"
        :key="videoId"
        ref="frame"
        :src="embedUrl(videoId, origin)"
        title="Vidéo YouTube"
        allow="autoplay; encrypted-media; picture-in-picture"
        class="post__player"
        :class="{ 'is-ready': wanted && playing }"
        @load="send(LISTEN_MESSAGE)"
      />
    </button>
    <img v-else-if="photo" :src="photo.src" :alt="photo.alt" loading="lazy" class="post__photo" />
    <PhotoPlaceholder v-else :video="post.network === 'youtube'" class="h-full w-full" />
    <span class="social-badge post__badge">
      <SocialIcon :network="post.network" />
    </span>
  </li>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, useTemplateRef } from 'vue'
import PhotoPlaceholder from '@/components/PhotoPlaceholder.vue'
import SocialIcon from '@/components/SocialIcon.vue'
import type { Photo, Post } from '@/data/community'
import {
  ENDED,
  LISTEN_MESSAGE,
  PLAYING,
  YOUTUBE_ORIGIN,
  commandMessage,
  embedUrl,
  playerUpdate,
} from '@/lib/youtube'

const props = defineProps<{
  post: Post
  videos?: string[]
  photo?: Photo
  duplicate?: boolean
}>()

const PRELOAD_MARGIN = '300px'
const LOOP_LEAD = 0.35

const root = useTemplateRef<HTMLLIElement>('root')
const frame = useTemplateRef<HTMLIFrameElement>('frame')
const origin = window.location.origin

const candidates = props.videos ?? []
const attempt = ref(0)
const videoId = computed(() => candidates[attempt.value])

const armed = ref(false)
const wanted = ref(false)
const ready = ref(false)
const playing = ref(false)
const onScreen = ref(false)
let observer: IntersectionObserver | undefined

let duration = 0

const send = (message: string) => frame.value?.contentWindow?.postMessage(message, YOUTUBE_ORIGIN)
const command = (func: string, args?: unknown[]) => send(commandMessage(func, args))
const rewind = () => {
  command('seekTo', [0, true])
  command('playVideo')
}

const sync = () => {
  if (!ready.value) return
  command(wanted.value || onScreen.value ? 'playVideo' : 'pauseVideo')
}

const fallBack = () => {
  attempt.value += 1
  ready.value = false
  playing.value = false
  duration = 0
}

const play = () => {
  if (!videoId.value) return
  wanted.value = true
  armed.value = true
  sync()
}

const stop = () => {
  wanted.value = false
}

const onMessage = (event: MessageEvent) => {
  if (!frame.value || event.source !== frame.value.contentWindow) return
  const update = playerUpdate(event.data)
  if (!update) return
  if (update.error) {
    fallBack()
    return
  }
  if (update.ready) {
    ready.value = true
    sync()
  }
  if (update.duration) duration = update.duration
  if (update.state !== undefined) {
    playing.value = update.state === PLAYING
    if (update.state === ENDED) rewind()
  }
  if (update.currentTime !== undefined && duration && update.currentTime >= duration - LOOP_LEAD) {
    rewind()
  }
}

onMounted(() => {
  if (!candidates.length) return
  window.addEventListener('message', onMessage)
  const canPreload = 'IntersectionObserver' in window && window.matchMedia('(hover: hover)').matches
  if (!canPreload || !root.value) return
  observer = new IntersectionObserver(
    (entries) => {
      onScreen.value = entries.some((entry) => entry.isIntersecting)
      if (onScreen.value) armed.value = true
      sync()
    },
    { rootMargin: PRELOAD_MARGIN },
  )
  observer.observe(root.value)
})

onBeforeUnmount(() => {
  window.removeEventListener('message', onMessage)
  observer?.disconnect()
})
</script>
