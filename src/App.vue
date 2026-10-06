<template>
  <SiteHeader />
  <main>
    <HeroSection />
    <WavyRibbon id="produits" text="À chaque apéro sa poche PomPoche !" class="hero-ribbon" />
    <IconicsSection />
    <WavyRibbon id="engagements" text="Découvrez nos engagements" inverted reverse />
    <EngagementsSection />
    <WavyRibbon id="qui-sommes-nous" text="La vigne, notre terrain de jeu" />
    <AboutSection />
    <WavyRibbon
      id="communaute"
      text="Rejoignez la communauté complètement Pom'Poches"
      inverted
      reverse
    />
    <CommunitySection />
  </main>
  <SiteFooter />
</template>

<script setup lang="ts">
import AboutSection from '@/components/AboutSection.vue'
import CommunitySection from '@/components/CommunitySection.vue'
import EngagementsSection from '@/components/EngagementsSection.vue'
import HeroSection from '@/components/HeroSection.vue'
import IconicsSection from '@/components/IconicsSection.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import SiteHeader from '@/components/SiteHeader.vue'
import WavyRibbon from '@/components/WavyRibbon.vue'
</script>
