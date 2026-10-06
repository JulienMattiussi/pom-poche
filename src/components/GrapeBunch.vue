<template>
  <svg viewBox="0 0 100 130" aria-hidden="true">
    <path d="M50 4 C52 14 50 22 50 32" stroke="#6b4a2b" stroke-width="4" fill="none" />
    <path d="M52 14 C66 2 86 6 92 16 C80 24 64 24 52 14 Z" fill="#4f8f2f" />
    <g :fill="fill" stroke="rgb(0 0 0 / 0.18)" stroke-width="1">
      <circle v-for="(g, i) in GRAPES" :key="i" :cx="g.x" :cy="g.y" r="9.5" />
    </g>
    <g fill="#fff" opacity="0.35">
      <circle v-for="(g, i) in GRAPES" :key="i" :cx="g.x - 3" :cy="g.y - 3.5" r="2.6" />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { GRAPE_COLORS, type GrapeColor } from '@/products'

const props = defineProps<{ color: GrapeColor }>()

const fill = computed(() => GRAPE_COLORS[props.color])

const ROWS = [5, 4, 5, 4, 3, 2, 1]

const GRAPES = ROWS.flatMap((count, row) =>
  Array.from({ length: count }, (_, i) => ({
    x: 50 + (i - (count - 1) / 2) * 16,
    y: 38 + row * 14,
  })),
)
</script>
