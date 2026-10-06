<template>
  <svg v-if="network === 'bereal'" viewBox="4 5 40 14" data-wide aria-hidden="true">
    <text x="24" y="16" text-anchor="middle" font-size="11" font-weight="800" fill="currentColor">
      BeReal.
    </text>
  </svg>
  <svg v-else viewBox="0 0 24 24" aria-hidden="true">
    <g v-if="network === 'instagram'" fill="none" stroke="currentColor" stroke-width="2">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
    </g>
    <path
      v-else-if="network === 'tiktok'"
      fill="currentColor"
      d="M16 3c.4 2.3 1.9 3.8 4 4v3.1c-1.5 0-2.9-.5-4-1.3V15a6 6 0 1 1-6-6v3.2a2.8 2.8 0 1 0 2.8 2.8V3H16z"
    />
    <path
      v-else
      fill="currentColor"
      d="M12 2a10 10 0 0 0-1.6 19.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.3c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0 0 12 2z"
    />
  </svg>
</template>

<script setup lang="ts">
import type { Network } from '@/community'

defineProps<{ network: Network }>()
</script>
