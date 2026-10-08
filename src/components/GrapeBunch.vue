<template>
  <svg viewBox="0 0 100 130" aria-hidden="true">
    <defs>
      <radialGradient :id="`${id}-body`" cx="0.36" cy="0.3" r="0.78">
        <stop offset="0" :stop-color="tones.light" />
        <stop offset="0.45" :stop-color="tones.base" />
        <stop offset="1" :stop-color="tones.dark" />
      </radialGradient>
      <radialGradient :id="`${id}-shine`">
        <stop offset="0" stop-color="#fff" stop-opacity="0.85" />
        <stop offset="1" stop-color="#fff" stop-opacity="0" />
      </radialGradient>
      <radialGradient :id="`${id}-bloom`">
        <stop offset="0.55" stop-color="#e8eef5" stop-opacity="0" />
        <stop offset="1" stop-color="#e8eef5" stop-opacity="0.28" />
      </radialGradient>
      <linearGradient :id="`${id}-stem`" x1="0" x2="1">
        <stop offset="0" stop-color="#8a6a3e" />
        <stop offset="1" stop-color="#4f3519" />
      </linearGradient>
    </defs>
    <g fill="none" :stroke="`url(#${id}-stem)`" stroke-linecap="round">
      <path d="M50 3 C53 12 49 20 50 34" stroke-width="4.5" />
      <path d="M50 30 C42 34 30 36 22 40 M50 30 C58 34 70 36 79 40" stroke-width="2.5" />
    </g>
    <g transform="translate(51 0) rotate(-35) scale(0.3)">
      <VineLeaf width="100" height="100" />
    </g>
    <g v-for="(berry, i) in berries" :key="i" :transform="berry.transform">
      <ellipse cx="1.6" cy="2.6" :rx="berry.rx" :ry="berry.ry" :fill="tones.dark" opacity="0.3" />
      <ellipse :rx="berry.rx" :ry="berry.ry" :fill="`url(#${id}-body)`" />
      <ellipse :rx="berry.rx" :ry="berry.ry" :fill="`url(#${id}-bloom)`" />
      <ellipse
        :cx="-berry.rx * 0.38"
        :cy="-berry.ry * 0.42"
        :rx="berry.rx * 0.32"
        :ry="berry.ry * 0.2"
        transform="rotate(-30)"
        :fill="`url(#${id}-shine)`"
      />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed, useId } from 'vue'
import VineLeaf from '@/components/VineLeaf.vue'
import { GRAPE_COLORS, type GrapeColor } from '@/data/grapes'
import { bunchLayout } from '@/lib/grapes'

const props = defineProps<{ color: GrapeColor; seed?: number }>()

const id = useId()
const tones = computed(() => GRAPE_COLORS[props.color])

const berries = computed(() =>
  bunchLayout(props.seed ?? Object.keys(GRAPE_COLORS).indexOf(props.color)).map((berry) => ({
    ...berry,
    transform: `translate(${berry.x} ${berry.y}) rotate(${berry.rotate})`,
  })),
)
</script>
