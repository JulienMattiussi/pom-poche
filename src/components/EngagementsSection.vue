<template>
  <section class="overflow-x-clip bg-lime px-6 pt-16 pb-32">
    <h2 class="sr-only">Nos engagements</h2>
    <ul class="mx-auto flex max-w-6xl flex-col gap-12 md:gap-0">
      <li
        v-for="engagement in ENGAGEMENTS"
        :key="engagement.title"
        class="engagement-slot"
        :data-place="engagement.place"
        :style="{ '--tilt': `${engagement.tilt}deg` }"
      >
        <EngagementBurst :grapes="engagement.grapes" />
        <div class="engagement-card">
          <h3 class="engagement-card__title" :class="engagement.color">
            {{ engagement.title }}
          </h3>
        </div>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import EngagementBurst from '@/components/EngagementBurst.vue'
import { ENGAGEMENTS } from '@/data/engagements'
</script>
