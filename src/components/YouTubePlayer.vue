<template>
  <iframe
    :src="playerUrl(id)"
    title="Vidéo YouTube"
    loading="lazy"
    allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
    allowfullscreen
    class="youtube-player"
  />
</template>

<script setup lang="ts">
import { playerUrl } from '@/lib/youtube'

defineProps<{ id: string }>()
</script>
