<template>
  <header class="pointer-events-none fixed inset-x-0 top-0 z-20 px-4 pt-14 sm:px-8">
    <nav
      aria-label="Navigation principale"
      class="pointer-events-auto relative mx-auto flex h-16 max-w-6xl items-center rounded-2xl bg-white shadow-lg shadow-black/10 md:h-20"
    >
      <ul class="hidden flex-1 items-center justify-evenly md:flex">
        <li v-for="link in LEFT_LINKS" :key="link.href">
          <a :href="link.href" class="nav-link">{{ link.label }}</a>
        </li>
      </ul>
      <a
        href="#"
        class="logo-slot"
        aria-label="PomPoche, retour en haut"
        @click.prevent="scrollToTop"
      >
        <BrandLogo class="h-full w-auto drop-shadow-md" />
      </a>
      <ul class="hidden flex-1 items-center justify-evenly md:flex">
        <li v-for="link in RIGHT_LINKS" :key="link.href">
          <a :href="link.href" class="nav-link">{{ link.label }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import BrandLogo from '@/components/BrandLogo.vue'
import { scrollToTop } from '@/lib/scroll'
import { LEFT_LINKS, RIGHT_LINKS } from '@/sections'
</script>
