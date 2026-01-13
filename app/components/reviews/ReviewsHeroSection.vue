<script setup>
import SectionBadge from '~/components/ui/SectionBadge.vue'

defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section
    class="reviews-hero"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="reviews-hero__background">
      <div class="reviews-hero__gradient" />
    </div>

    <div class="reviews-hero__content container">
      <SectionBadge v-if="data.badge" :label="data.badge" variant="light" />
      <h1 class="reviews-hero__title">{{ data.title }}</h1>
      <p class="reviews-hero__description">{{ data.description }}</p>
    </div>
  </section>
</template>

