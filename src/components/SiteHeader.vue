<template>
  <header class="pointer-events-none fixed inset-x-0 top-0 z-20 px-4 pt-14 sm:px-8">
    <nav
      aria-label="Navigation principale"
      class="site-nav pointer-events-auto relative mx-auto flex h-16 items-center rounded-full bg-white shadow-lg shadow-black/10 md:h-20 md:max-w-6xl md:rounded-2xl"
      :class="{ 'is-compact': compact }"
      @keydown.esc="open = false"
    >
      <span class="site-nav__spacer md:hidden" aria-hidden="true" />
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
      <button
        type="button"
        class="site-nav__burger md:hidden"
        :aria-label="open ? 'Fermer le menu' : 'Ouvrir le menu'"
        :aria-expanded="open"
        aria-controls="mobile-menu"
        @click="open = !open"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path
            :d="open ? 'M6 6l12 12M18 6L6 18' : 'M4 7h16M4 12h16M4 17h16'"
            stroke="currentColor"
            stroke-width="2.5"
            stroke-linecap="round"
          />
        </svg>
      </button>
      <ul v-if="open" id="mobile-menu" class="mobile-menu md:hidden">
        <li v-for="link in [...LEFT_LINKS, ...RIGHT_LINKS]" :key="link.href">
          <a :href="link.href" class="nav-link" @click="open = false">{{ link.label }}</a>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import BrandLogo from '@/components/BrandLogo.vue'
import { scrollToTop } from '@/lib/scroll'
import { LEFT_LINKS, RIGHT_LINKS } from '@/data/sections'

const COMPACT_AFTER = 40

const open = ref(false)
const compact = ref(false)

const onScroll = () => {
  compact.value = window.scrollY > COMPACT_AFTER
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>
