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
      <ul
        ref="list"
        class="iconics-list max-w-5xl md:mt-36 md:grid md:w-full md:grid-cols-3 md:gap-x-8"
        @scroll.passive="onScroll"
      >
        <li v-for="product in PRODUCTS" :key="product.id">
          <ProductCard :product="product" />
        </li>
      </ul>
      <div class="carousel-controls md:hidden">
        <button
          type="button"
          class="carousel-controls__arrow"
          aria-label="Produit précédent"
          :disabled="current === 0"
          @click="goTo(current - 1)"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
        </button>
        <ol class="flex gap-2">
          <li v-for="(product, i) in PRODUCTS" :key="product.id">
            <button
              type="button"
              class="carousel-controls__dot"
              :aria-label="`Produit ${i + 1} sur ${PRODUCTS.length}`"
              :aria-current="i === current"
              @click="goTo(i)"
            />
          </li>
        </ol>
        <button
          type="button"
          class="carousel-controls__arrow"
          aria-label="Produit suivant"
          :disabled="current === PRODUCTS.length - 1"
          @click="goTo(current + 1)"
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14M13 6l6 6-6 6" />
          </svg>
        </button>
      </div>
      <HealthNotice class="mt-16" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, useTemplateRef } from 'vue'
import HealthNotice from '@/components/HealthNotice.vue'
import ProductCard from '@/components/ProductCard.vue'
import { PRODUCTS } from '@/data/products'

const list = useTemplateRef<HTMLUListElement>('list')
const current = ref(0)

const slides = () => [...(list.value?.children ?? [])] as HTMLElement[]

const centerOffset = (slide: HTMLElement) =>
  slide.offsetLeft - (list.value!.clientWidth - slide.clientWidth) / 2

const onScroll = () => {
  const left = list.value!.scrollLeft
  const distances = slides().map((slide) => Math.abs(centerOffset(slide) - left))
  current.value = distances.indexOf(Math.min(...distances))
}

const goTo = (i: number) => {
  const slide = slides()[i]
  if (slide) list.value!.scrollTo({ left: centerOffset(slide) })
}
</script>
