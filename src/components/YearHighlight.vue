<template>
  <div class="flex flex-col items-center">
    <p class="year" aria-hidden="true">
      <span v-for="(digit, i) in YEAR" :key="i" class="year__digit">
        {{ digit }}
        <PouchPlaceholder v-if="i === POUCH_DIGIT" band="#9cc23c" class="year__pouch" />
      </span>
    </p>
    <h3 class="mt-4 text-lg font-bold text-forest">{{ YEAR }}</h3>
    <p class="year__text">
      Créée en 2026, la célèbre poche PomPoche révolutionne la consommation de vin. Son format
      nomade, facile à emporter, est immédiatement adopté par les grands enfants.
    </p>
  </div>
</template>

<script setup lang="ts">
import PouchPlaceholder from '@/components/PouchPlaceholder.vue'

const YEAR = '2026'
const POUCH_DIGIT = 2
</script>
