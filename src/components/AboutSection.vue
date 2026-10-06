<template>
  <section class="about">
    <div class="px-6 pt-16 pb-20 text-center">
      <h2 class="about__title">Pionniers depuis 2026</h2>
      <PhotoPlaceholder class="about__hero" />
    </div>
    <div class="overflow-x-clip px-6 pt-8 pb-40">
      <p class="about__pitch">
        Compagnons complices, nos poches PomPoche vous accompagnent partout pour transformer les
        plaisirs de la vigne en un joyeux apéro.
      </p>
      <YearHighlight class="mt-24" />
      <div class="origin">
        <p class="origin__caption">
          Nos raisins sont origine France
          <svg viewBox="0 0 40 40" class="origin__arrow" aria-hidden="true">
            <path
              d="M4 6 C22 4 32 14 30 34 M23 28 L30 35 L36 27"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </p>
        <figure
          v-for="(tilt, i) in POLAROID_TILTS"
          :key="i"
          class="polaroid"
          :style="{ '--tilt': `${tilt}deg` }"
        >
          <svg v-if="i === 1" viewBox="0 0 80 40" class="polaroid__clip" aria-hidden="true">
            <path d="M4 14 C20 2 60 2 76 14 C60 22 20 22 4 14 Z" fill="#4cb648" />
            <rect x="30" y="6" width="20" height="32" rx="4" fill="#2f9a2f" />
          </svg>
          <PhotoPlaceholder class="aspect-[4/3] w-full" />
        </figure>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import PhotoPlaceholder from '@/components/PhotoPlaceholder.vue'
import YearHighlight from '@/components/YearHighlight.vue'

const POLAROID_TILTS = [-5, 3, 7]
</script>
