<template>
  <section class="hero">
    <div class="hero__video" aria-hidden="true">
      <iframe
        :src="backgroundUrl(HERO_VIDEO, HERO_VIDEO_START)"
        title="Vidéo d'ambiance"
        tabindex="-1"
        allow="autoplay; encrypted-media"
        class="hero__frame"
      />
    </div>
    <div class="hero__content">
      <h1 class="hero__title">La vigne, ça rend complètement Pom'Poche !</h1>
      <PouchPlaceholder band="#e03246" class="hero__pouch" />
    </div>
  </section>
</template>

<script setup lang="ts">
import PouchPlaceholder from '@/components/PouchPlaceholder.vue'
import { backgroundUrl } from '@/lib/youtube'

const HERO_VIDEO = 'MStv4W841dE'
const HERO_VIDEO_START = 12
</script>
