<template>
  <div class="photo-placeholder" role="img" :aria-label="label">
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="1.6"
      aria-hidden="true"
    >
      <template v-if="video">
        <circle cx="12" cy="12" r="9" />
        <path d="M10 8.5v7l6-3.5z" fill="currentColor" stroke-linejoin="round" />
      </template>
      <template v-else>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <circle cx="9" cy="10" r="1.6" />
        <path d="M4 17l5-5 4 4 3-3 4 4" stroke-linejoin="round" />
      </template>
    </svg>
    <span>{{ label }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{ video?: boolean }>()

const label = computed(() => (props.video ? 'Vidéo à venir' : 'Photo à venir'))
</script>
