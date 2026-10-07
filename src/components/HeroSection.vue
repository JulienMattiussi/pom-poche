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
      <img
        :src="HERO_POUCH"
        alt="Poche PomPoche Cabernet-Sauvignon, Cuvée des anciens"
        class="hero__pouch"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { backgroundUrl } from '@/lib/youtube'

const HERO_VIDEO = 'MStv4W841dE'
const HERO_VIDEO_START = 12
const HERO_POUCH = 'pouches/cabernet.webp'
</script>
