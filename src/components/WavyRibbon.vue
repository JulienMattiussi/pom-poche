<template>
  <div class="wavy-ribbon">
    <p class="sr-only">{{ text }}</p>
    <svg
      :viewBox="`0 0 ${WIDTH} ${SHAPE.height}`"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <path :id="pathId" :d="CENTERLINE" />
      </defs>
      <use
        :href="`#${pathId}`"
        fill="none"
        stroke="var(--color-pine-deep)"
        :stroke-width="SHAPE.band"
      />
      <text ref="measure" class="wavy-ribbon__text" :font-size="SHAPE.font" visibility="hidden">
        {{ phrase }}
      </text>
      <text class="wavy-ribbon__text" :font-size="SHAPE.font" dominant-baseline="central">
        <textPath :href="`#${pathId}`" :startOffset="offset">{{ phrase.repeat(REPEATS) }}</textPath>
      </text>
    </svg>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, useId, useTemplateRef } from 'vue'

const props = defineProps<{ text: string; inverted?: boolean; reverse?: boolean }>()

const SHAPE = { height: 220, band: 110, amplitude: 45, font: 56 }

const WIDTH = 1440
const OVERHANG = 600
const REPEATS = 6
const SPEED = 0.6

const centerline = (inverted: boolean) => {
  const mid = SHAPE.height / 2
  const quarter = WIDTH / 4
  let d = `M${-OVERHANG} ${mid}`
  for (let x = -OVERHANG, up = !inverted; x < WIDTH + OVERHANG; x += quarter * 2, up = !up) {
    const peak = up ? mid - SHAPE.amplitude : mid + SHAPE.amplitude
    d += ` C${x + quarter * 0.55} ${peak} ${x + quarter * 1.45} ${peak} ${x + quarter * 2} ${mid}`
  }
  return d
}

const CENTERLINE = centerline(props.inverted)

const pathId = useId()
const phrase = `${props.text.toUpperCase()} · `
const measure = useTemplateRef<SVGTextElement>('measure')
const offset = ref(0)

let phraseLength = 0
let frame = 0

const update = () => {
  frame = 0
  if (!phraseLength) return
  const shift = (window.scrollY * SPEED) % phraseLength
  offset.value = props.reverse ? shift - phraseLength : -shift
}

const onScroll = () => {
  if (!frame) frame = requestAnimationFrame(update)
}

onMounted(async () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  await document.fonts?.ready
  phraseLength = measure.value?.getComputedTextLength?.() ?? 0
  update()
  window.addEventListener('scroll', onScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', onScroll)
  cancelAnimationFrame(frame)
})
</script>
