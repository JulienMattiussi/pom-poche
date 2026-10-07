<template>
  <svg v-if="network === 'berond'" viewBox="4 5 40 14" data-wide aria-hidden="true">
    <text x="24" y="16" text-anchor="middle" font-size="11" font-weight="800" fill="currentColor">
      BeRond.
    </text>
  </svg>
  <svg v-else viewBox="0 0 24 24" aria-hidden="true">
    <g
      v-if="network === 'picolagram'"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <path d="M9 7.5h6c0 2.8-1.3 4.5-3 4.5S9 10.3 9 7.5zM12 12v4M10 16.5h4" />
    </g>
    <g v-else-if="network === 'tiktrinque'" fill="currentColor">
      <g transform="rotate(-18 8 12)">
        <path d="M5 6h6c0 3.6-1.3 5.8-3 5.8S5 9.6 5 6z" />
        <rect x="7.4" y="11.5" width="1.2" height="5" />
        <rect x="5.6" y="16.2" width="4.8" height="1.3" rx="0.6" />
      </g>
      <g transform="rotate(18 16 12)">
        <path d="M13 6h6c0 3.6-1.3 5.8-3 5.8S13 9.6 13 6z" />
        <rect x="15.4" y="11.5" width="1.2" height="5" />
        <rect x="13.6" y="16.2" width="4.8" height="1.3" rx="0.6" />
      </g>
      <path
        d="M12 1.5v2.2M9.2 2.6l1 1.6M14.8 2.6l-1 1.6"
        stroke="currentColor"
        stroke-width="1.4"
        stroke-linecap="round"
      />
    </g>
    <path
      v-else-if="network === 'facebouteille'"
      fill="currentColor"
      fill-rule="evenodd"
      d="M12 2a10 10 0 1 0 0 20a10 10 0 1 0 0-20zM11 5h2v3c1.5.6 2.5 1.8 2.5 3.5V19h-7v-7.5c0-1.7 1-2.9 2.5-3.5z"
    />
    <path
      v-else
      fill="currentColor"
      d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8A26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8zM10 15V9l5.2 3L10 15z"
    />
  </svg>
</template>

<script setup lang="ts">
import type { Network } from '@/community'

defineProps<{ network: Network }>()
</script>
