<template>
  <section class="about">
    <div class="px-6 pt-16 pb-20 text-center">
      <h2 class="about__title">Pionniers depuis 2026</h2>
      <YouTubePlayer :id="PIONEERS_VIDEO" class="about__hero" />
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
            <DoodleArrow class="polaroid-note__arrow" />
          </p>
          <figure class="polaroid" :style="{ '--tilt': `${polaroid.tilt}deg` }">
            <svg v-if="i === 1" viewBox="0 0 80 40" class="polaroid__clip" aria-hidden="true">
              <path d="M4 14 C20 2 60 2 76 14 C60 22 20 22 4 14 Z" fill="#4cb648" />
              <rect x="30" y="6" width="20" height="32" rx="4" fill="#2f9a2f" />
            </svg>
            <YouTubePlayer :id="polaroid.youtube" class="polaroid__video" />
          </figure>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import DoodleArrow from '@/components/DoodleArrow.vue'
import YearHighlight from '@/components/YearHighlight.vue'
import YouTubePlayer from '@/components/YouTubePlayer.vue'

type Polaroid = {
  tilt: number
  place: 'top-left' | 'bottom' | 'top-right'
  caption: string
  youtube: string
}

const PIONEERS_VIDEO = 'qciVY1Hma_s'

const POLAROIDS: Polaroid[] = [
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
