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
    class="contact-hero"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="contact-hero__background">
      <div class="contact-hero__gradient" />
    </div>

    <div class="contact-hero__content container">
      <SectionBadge v-if="data.badge" :label="data.badge" variant="light" />
      <h1 class="contact-hero__title">{{ data.title }}</h1>
      <p class="contact-hero__description">{{ data.description }}</p>
    </div>
  </section>
</template>

