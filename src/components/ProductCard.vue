<template>
  <article class="product-card" tabindex="0" :style="{ '--tilt': `${product.tilt}deg` }">
    <img :src="product.pouch" :alt="product.alt" loading="lazy" class="product-card__pouch" />
    <div class="product-card__fruits">
      <GrapeBunch
        v-for="bunch in product.bunches"
        :key="bunch.side"
        :color="bunch.color"
        :data-side="bunch.side"
        class="product-card__bunch"
      />
    </div>
    <p class="product-card__badge">{{ product.badge }}</p>
  </article>
</template>

<script setup lang="ts">
import GrapeBunch from '@/components/GrapeBunch.vue'
import type { Product } from '@/products'

defineProps<{ product: Product }>()
</script>
