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
        <CommunityPost
          v-for="(post, i) in [...POSTS, ...POSTS]"
          :key="i"
          :post="post"
          :videos="videosFor(i % POSTS.length)"
          :photo="photoFor(i % POSTS.length)"
          :duplicate="i >= POSTS.length"
          :aria-hidden="i >= POSTS.length"
        />
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import CommunityPost from '@/components/CommunityPost.vue'
import SocialIcon from '@/components/SocialIcon.vue'
import { BACKUP_ONLY, NETWORKS, PHOTOS, POSTS, SHORTS } from '@/community'
import { assignVideos, shuffle } from '@/lib/rotation'

const videoSlots = POSTS.flatMap((post, i) => (post.network === 'youtube' ? [i] : []))
const assignment = assignVideos(videoSlots.length, SHORTS, BACKUP_ONLY)

const videosFor = (index: number) => {
  const slot = videoSlots.indexOf(index)
  return slot === -1 ? undefined : assignment[slot]
}

const photoSlots = POSTS.flatMap((post, i) => (post.network === 'youtube' ? [] : [i]))
const photos = shuffle(PHOTOS)

const photoFor = (index: number) => {
  const slot = photoSlots.indexOf(index)
  return slot === -1 ? undefined : photos[slot]
}
</script>
