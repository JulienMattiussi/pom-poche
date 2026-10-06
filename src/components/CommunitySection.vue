<template>
  <section class="community">
    <div class="flex flex-col items-center px-6">
      <h2 class="community__title">Complètement Pom'Poche</h2>
      <ul class="mt-8 flex gap-3" aria-label="Nos réseaux (bientôt)">
        <li v-for="network in NETWORKS" :key="network.id">
          <span class="social-badge" role="img" :aria-label="network.label">
            <SocialIcon :network="network.id" />
          </span>
        </li>
      </ul>
    </div>
    <p class="community__tag">
      #PomPocheLovers
      <svg viewBox="0 0 40 40" class="community__arrow" aria-hidden="true">
        <path
          d="M4 6 C22 4 32 14 30 34 M23 28 L30 35 L36 27"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </p>
    <div class="community__reel">
      <ul class="community__track">
        <li
          v-for="(post, i) in [...POSTS, ...POSTS]"
          :key="i"
          class="post"
          :aria-hidden="i >= POSTS.length"
          :style="{ '--tilt': `${post.tilt}deg` }"
        >
          <PhotoPlaceholder :video="post.video" class="h-full w-full" />
          <span class="social-badge post__badge">
            <SocialIcon :network="post.network" />
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import PhotoPlaceholder from '@/components/PhotoPlaceholder.vue'
import SocialIcon from '@/components/SocialIcon.vue'
import { NETWORKS, POSTS } from '@/community'
</script>
