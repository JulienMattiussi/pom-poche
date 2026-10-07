<template>
  <div class="og">
    <div class="og__copy">
      <BrandLogo class="og__logo" />
      <p class="og__title">La vigne, ça rend complètement Pom'Poche !</p>
    </div>
    <div class="og__pouches">
      <div
        v-for="(item, i) in DECOR"
        :key="i"
        class="og__decor"
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
      <img
        v-for="pouch in POUCHES"
        :key="pouch.src"
        :src="pouch.src"
        alt=""
        class="og__pouch"
        :style="{
          left: `${pouch.x}%`,
          top: `${pouch.y}%`,
          width: `${pouch.width}%`,
          rotate: `${pouch.rotate}deg`,
          zIndex: pouch.z,
        }"
      />
    </div>
    <WavyRibbon text="À chaque apéro sa poche PomPoche !" class="og__ribbon" />
  </div>
</template>

<script setup lang="ts">
import BrandLogo from '@/components/BrandLogo.vue'
import GrapeBunch from '@/components/GrapeBunch.vue'
import VineLeaf from '@/components/VineLeaf.vue'
import WavyRibbon from '@/components/WavyRibbon.vue'
import type { GrapeColor } from '@/data/grapes'

const POUCHES = [
  { src: 'pouches/velo.webp', x: 2, y: 14, width: 40, rotate: -11, z: 1 },
  { src: 'pouches/mamie.webp', x: 58, y: 14, width: 40, rotate: 11, z: 1 },
  { src: 'pouches/cabernet.webp', x: 27, y: 2, width: 46, rotate: 0, z: 2 },
]

const DECOR: { kind: 'leaf' | GrapeColor; x: number; y: number; size: number; rotate: number }[] = [
  { kind: 'leaf', x: 10, y: 10, size: 30, rotate: -40 },
  { kind: 'leaf', x: 92, y: 12, size: 30, rotate: 45 },
  { kind: 'purple', x: 4, y: 58, size: 24, rotate: -12 },
  { kind: 'amber', x: 96, y: 60, size: 24, rotate: 14 },
]
</script>

<style>
body {
  margin: 0;
}

.og {
  position: relative;
  width: 1200px;
  height: 630px;
  overflow: hidden;
  background-color: var(--color-lime);
  background-image: radial-gradient(60% 70% at 25% 35%, #b5d97a 0%, transparent 70%);
}

.og__copy {
  position: absolute;
  top: 48px;
  left: 64px;
  width: 560px;
}

.og__logo {
  height: 190px;
  width: auto;
  filter: drop-shadow(0 8px 14px rgb(0 0 0 / 0.18));
}

.og__title {
  margin-top: 26px;
  color: #fff;
  font-family: var(--font-marker);
  font-size: 54px;
  line-height: 1.08;
  text-transform: uppercase;
  text-shadow: 0 3px 0 rgb(36 80 42 / 0.35);
}

.og__pouches {
  position: absolute;
  top: 24px;
  right: 40px;
  width: 520px;
  height: 520px;
}

.og__decor {
  position: absolute;
}

.og__pouch {
  position: absolute;
  filter: drop-shadow(0 16px 20px rgb(0 0 0 / 0.3));
}

.og__ribbon {
  position: absolute;
  inset: auto 0 -26px;
  background-color: transparent;
}

.og__ribbon svg {
  min-height: 0;
}
</style>
