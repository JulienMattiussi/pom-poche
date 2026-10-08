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
      <VineLeaf v-else-if="item.kind === 'leaf'" :dark="i % 2 === 0" />
      <GrapeBunch v-else :color="COLORS[i]!" :seed="i" />
    </div>
  </div>
</template>

<script setup lang="ts">
import GrapeBunch from '@/components/GrapeBunch.vue'
import VineLeaf from '@/components/VineLeaf.vue'
import { BURST } from '@/data/engagements'
import type { GrapeColor } from '@/data/grapes'

const props = defineProps<{ grapes: GrapeColor[] }>()

let bunch = 0
const COLORS = BURST.map((item) =>
  item.kind === 'bunch' ? props.grapes[bunch++ % props.grapes.length]! : undefined,
)
</script>
