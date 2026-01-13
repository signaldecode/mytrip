<script setup>
import mainData from '~/data/mainData.json'
import AppHeader from '~/components/common/AppHeader.vue'
import AppFooter from '~/components/common/AppFooter.vue'
import ContactSection from '~/components/common/ContactSection.vue'

const data = mainData
</script>

<template>
  <div class="layout-default">
    <AppHeader :data="data" />
    <slot />
    <ContactSection :data="data.about.contact" />
    <AppFooter :data="data" />
  </div>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;

.layout-default {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background-color: $color-background;
}
</style>
