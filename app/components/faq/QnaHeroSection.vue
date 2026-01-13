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
    class="qna-hero"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="qna-hero__background">
      <div class="qna-hero__gradient" />
    </div>

    <div class="qna-hero__content container">
      <SectionBadge v-if="data.badge" :label="data.badge" variant="light" />
      <h1 class="qna-hero__title">{{ data.title }}</h1>
      <p class="qna-hero__description">{{ data.description }}</p>
    </div>
  </section>
</template>

