<template>
  <section class="bg-lime px-6 pt-20 pb-12">
    <div class="mx-auto flex max-w-6xl flex-col items-center">
      <div class="relative">
        <p class="tagline">
          <svg viewBox="0 0 60 50" class="tagline__arrow" aria-hidden="true">
            <path
              d="M56 10 C34 4 12 14 10 42 M3 34 L10 43 L17 35"
              fill="none"
              stroke="currentColor"
              stroke-width="2.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          Vous allez les adorer
        </p>
        <h2 class="iconics-title">Les iconiques</h2>
      </div>
      <ul class="mt-40 grid w-full max-w-5xl gap-x-8 gap-y-44 md:mt-36 md:grid-cols-3">
        <li v-for="product in PRODUCTS" :key="product.id">
          <ProductCard :product="product" />
        </li>
      </ul>
      <HealthNotice class="mt-16" />
    </div>
  </section>
</template>

<script setup lang="ts">
import HealthNotice from '@/components/HealthNotice.vue'
import ProductCard from '@/components/ProductCard.vue'
import { PRODUCTS } from '@/data/products'
</script>
