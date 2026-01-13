<script setup>
import mainData from '~/data/mainData.json'
import AboutHeroSection from '~/components/about/AboutHeroSection.vue'
import CoreValuesSection from '~/components/about/CoreValuesSection.vue'
import StatsSection from '~/components/about/StatsSection.vue'
import PartnersSection from '~/components/common/PartnersSection.vue'

const aboutData = mainData.about

// 파트너 섹션: 설정 + 공통 파트너 데이터 결합
const partnersSection = {
  ...aboutData.partners,
  partners: mainData.partners.list
}

useSeoMeta({
  title: aboutData.meta.title,
  description: aboutData.meta.description,
  ogTitle: aboutData.meta.title,
  ogDescription: aboutData.meta.description
})

useHead({
  title: aboutData.meta.title
})
</script>

<template>
  <main class="about-page">
    <AboutHeroSection :data="aboutData.hero" />
    <CoreValuesSection :data="aboutData.coreValues" />
    <StatsSection :data="aboutData.stats" />
    <PartnersSection :data="partnersSection" variant="brand" />
  </main>
</template>

<style lang="scss" scoped>
.about-page {
  min-height: 100vh;
}
</style>
