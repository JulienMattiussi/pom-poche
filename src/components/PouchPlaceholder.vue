<template>
  <svg viewBox="0 0 220 300" role="img" aria-label="Photo à venir">
    <defs>
      <clipPath :id="clipId">
        <path :d="BODY" />
      </clipPath>
    </defs>
    <path :d="BODY" fill="#f6f8f4" />
    <g :clip-path="`url(#${clipId})`">
      <rect x="0" y="222" width="220" height="90" :fill="band" />
    </g>
    <text
      x="110"
      y="150"
      text-anchor="middle"
      font-size="17"
      font-weight="600"
      fill="#9aa69a"
      class="font-sans"
    >
      Photo à venir
    </text>
    <path d="M40 22 C70 2 150 2 180 22 C150 34 70 34 40 22 Z" fill="#4cb648" />
    <rect x="94" y="10" width="32" height="50" rx="5" fill="#2f9a2f" />
  </svg>
</template>

<script setup lang="ts">
import { useId } from 'vue'

defineProps<{ band: string }>()

const clipId = useId()

const BODY = 'M30 58 Q110 46 190 58 L202 282 Q110 296 18 282 Z'
</script>
