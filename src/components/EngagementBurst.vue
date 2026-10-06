<template>
  <div class="burst" aria-hidden="true">
    <div
      v-for="(item, i) in BURST"
      :key="i"
      class="burst__item"
      :style="{
        left: `${item.x}%`,
        top: `${item.y}%`,
        width: `${item.size}%`,
        '--r': `${item.rotate}deg`,
        '--dx': `${(50 - item.x) * 2}%`,
        '--dy': `${(50 - item.y) * 2}%`,
        '--delay': `${i * 25}ms`,
      }"
    >
      <span v-if="item.kind === 'stick'" class="burst__stick" />
      <VineLeaf v-else-if="item.kind === 'leaf'" :fill="i % 2 ? '#3f8f3a' : '#2f7a34'" />
      <GrapeBunch v-else :color="nextGrape(i)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import GrapeBunch from '@/components/GrapeBunch.vue'
import VineLeaf from '@/components/VineLeaf.vue'
import { BURST } from '@/engagements'
import type { GrapeColor } from '@/products'

const props = defineProps<{ grapes: GrapeColor[] }>()

const bunchIndexes = BURST.flatMap((item, i) => (item.kind === 'bunch' ? [i] : []))

const nextGrape = (i: number) =>
  props.grapes[bunchIndexes.indexOf(i) % props.grapes.length] ?? 'purple'
</script>
