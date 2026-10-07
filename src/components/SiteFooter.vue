<template>
  <footer class="bg-sky-light">
    <div class="flex flex-col items-center px-6 pt-20">
      <a
        href="#"
        class="footer-logo"
        aria-label="PomPoche, retour en haut"
        @click.prevent="scrollToTop"
      >
        <div
          v-for="(item, i) in DECOR"
          :key="i"
          class="footer-logo__decor"
          aria-hidden="true"
          :style="{
            left: `${item.x}%`,
            top: `${item.y}%`,
            width: `${item.size}%`,
            transform: `translate(-50%, -50%) rotate(${item.rotate}deg)`,
          }"
        >
          <VineLeaf v-if="item.kind === 'leaf'" :dark="i % 2 === 0" />
          <GrapeBunch v-else :color="item.kind" />
        </div>
        <BrandLogo class="relative h-full w-auto drop-shadow-lg" />
      </a>
      <HealthNotice class="mt-10" />
      <button type="button" class="footer-up" aria-label="Retour en haut" @click="scrollToTop">
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          aria-hidden="true"
        >
          <path d="M12 19V5M6 11l6-6 6 6" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>
    <svg
      viewBox="0 0 1440 140"
      preserveAspectRatio="none"
      class="block h-24 w-full md:h-36"
      aria-hidden="true"
    >
      <path
        d="M0 30 C240 0 520 20 760 100 C960 160 1100 70 1260 20 C1340 0 1400 4 1440 12 V140 H0 Z"
        fill="var(--color-lime)"
      />
    </svg>
    <p class="footer-credits">
      <span>Pom'Poche 2026</span>
      <span class="hidden sm:inline" aria-hidden="true">·</span>
      <a href="https://yavadeus.dev" class="footer-credits__link">Fait avec ❤️ par YavaDeus</a>
    </p>
  </footer>
</template>

<script setup lang="ts">
import BrandLogo from '@/components/BrandLogo.vue'
import GrapeBunch from '@/components/GrapeBunch.vue'
import HealthNotice from '@/components/HealthNotice.vue'
import VineLeaf from '@/components/VineLeaf.vue'
import { scrollToTop } from '@/lib/scroll'
import type { GrapeColor } from '@/data/grapes'

type Decor = { kind: 'leaf' | GrapeColor; x: number; y: number; size: number; rotate: number }

const DECOR: Decor[] = [
  { kind: 'leaf', x: -8, y: 30, size: 55, rotate: -50 },
  { kind: 'leaf', x: 108, y: 28, size: 55, rotate: 50 },
  { kind: 'leaf', x: -2, y: 80, size: 50, rotate: -110 },
  { kind: 'leaf', x: 102, y: 82, size: 50, rotate: 115 },
  { kind: 'red', x: -18, y: 52, size: 52, rotate: -14 },
  { kind: 'green', x: 118, y: 50, size: 52, rotate: 12 },
  { kind: 'purple', x: 14, y: 6, size: 40, rotate: -24 },
  { kind: 'amber', x: 88, y: 4, size: 40, rotate: 22 },
]
</script>
