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
      <DoodleArrow class="community__arrow" />
    </p>
    <div class="community__reel">
      <ul class="community__track">
        <CommunityPost
          v-for="(post, i) in [...POSTS, ...POSTS]"
          :key="i"
          :post="post"
          v-bind="SLOTS[i % POSTS.length]"
          :duplicate="i >= POSTS.length"
          :aria-hidden="i >= POSTS.length"
        />
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import CommunityPost from '@/components/CommunityPost.vue'
import DoodleArrow from '@/components/DoodleArrow.vue'
import SocialIcon from '@/components/SocialIcon.vue'
import { BACKUP_ONLY, NETWORKS, PHOTOS, POSTS, SHORTS } from '@/data/community'
import { assignVideos, shuffle } from '@/lib/rotation'

const videos = assignVideos(
  POSTS.filter((post) => post.network === 'youtube').length,
  SHORTS,
  BACKUP_ONLY,
)
const photos = shuffle(PHOTOS)

let video = 0
let photo = 0
const SLOTS = POSTS.map((post) =>
  post.network === 'youtube' ? { videos: videos[video++] } : { photo: photos[photo++] },
)
</script>
