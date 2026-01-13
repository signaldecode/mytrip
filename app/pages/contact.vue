<script setup>
import contactData from '~/data/contactData.json'
import ContactHeroSection from '~/components/contact/ContactHeroSection.vue'
import ContactFormSection from '~/components/contact/ContactFormSection.vue'

const { meta, hero, form, info } = contactData

definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: meta.title,
  description: meta.description,
  ogTitle: meta.ogTitle ?? meta.title,
  ogDescription: meta.ogDescription ?? meta.description
})

useHead({
  title: meta.title,
  meta: [
    { name: 'keywords', content: meta.keywords }
  ]
})
</script>

<template>
  <main class="contact-page" aria-label="문의하기 페이지">
    <ContactHeroSection :data="hero" />
    <ContactFormSection :data="form" :info="info" />
  </main>
</template>

<style lang="scss" scoped>
.contact-page {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
</style>
