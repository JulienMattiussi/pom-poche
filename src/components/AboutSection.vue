<template>
  <section class="about">
    <div class="px-6 pt-16 pb-20 text-center">
      <h2 class="about__title">Pionniers depuis 2026</h2>
      <iframe
        :src="playerUrl(PIONEERS_VIDEO)"
        title="Vidéo YouTube"
        loading="lazy"
        allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
        allowfullscreen
        class="about__hero"
      />
    </div>
    <div class="overflow-x-clip px-6 pt-8 pb-40">
      <p class="about__pitch">
        Compagnons complices, nos poches PomPoche vous accompagnent partout pour transformer les
        plaisirs de la vigne en un joyeux apéro.
      </p>
      <YearHighlight class="mt-24" />
      <ul class="origin">
        <li v-for="(polaroid, i) in POLAROIDS" :key="i" class="polaroid-slot">
          <p class="polaroid-note" :data-place="polaroid.place">
            {{ polaroid.caption }}
            <svg viewBox="0 0 40 40" class="polaroid-note__arrow" aria-hidden="true">
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
          <figure class="polaroid" :style="{ '--tilt': `${polaroid.tilt}deg` }">
            <svg v-if="i === 1" viewBox="0 0 80 40" class="polaroid__clip" aria-hidden="true">
              <path d="M4 14 C20 2 60 2 76 14 C60 22 20 22 4 14 Z" fill="#4cb648" />
              <rect x="30" y="6" width="20" height="32" rx="4" fill="#2f9a2f" />
            </svg>
            <iframe
              v-if="polaroid.youtube"
              :src="playerUrl(polaroid.youtube)"
              title="Vidéo YouTube"
              loading="lazy"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowfullscreen
              class="block aspect-[4/3] w-full border-0 bg-black"
            />
            <PhotoPlaceholder v-else class="aspect-[4/3] w-full" />
          </figure>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import PhotoPlaceholder from '@/components/PhotoPlaceholder.vue'
import { playerUrl } from '@/lib/youtube'
import YearHighlight from '@/components/YearHighlight.vue'

const PIONEERS_VIDEO = 'qciVY1Hma_s'

const POLAROIDS: { tilt: number; place: string; caption: string; youtube?: string }[] = [
  {
    tilt: -5,
    place: 'top-left',
    caption: 'Nos raisins sont origine France',
    youtube: 'mFtzcQA8oHA',
  },
  {
    tilt: 3,
    place: 'bottom',
    caption: 'La biture, c’est encore mieux avec les popoches',
    youtube: '24HBTNZI-0U',
  },
  {
    tilt: 7,
    place: 'top-right',
    caption: "Faire le plein d'alcool avec Pom’Poches.",
    youtube: 't6JkG0oHcoM',
  },
]
</script>
