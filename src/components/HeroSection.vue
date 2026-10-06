<template>
  <section class="hero">
    <PhotoPlaceholder video class="hero__video" />
    <div class="hero__content">
      <h1 class="hero__title">La vigne, ça rend complètement Pom'Poche !</h1>
      <PouchPlaceholder band="#e03246" class="hero__pouch" />
    </div>
  </section>
</template>

<script setup lang="ts">
import PhotoPlaceholder from '@/components/PhotoPlaceholder.vue'
import PouchPlaceholder from '@/components/PouchPlaceholder.vue'
</script>
