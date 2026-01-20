<script setup>
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
      <img
        v-if="data.backgroundImage"
        :src="data.backgroundImage.src"
        :alt="data.backgroundImage.alt"
        class="reviews-hero__bg-image"
        loading="eager"
      />
    </div>

    <div class="reviews-hero__content container">
      <p v-if="data.badge" class="reviews-hero__badge">{{ data.badge }}</p>
      <h1 class="reviews-hero__title">{{ data.title }}</h1>
      <p class="reviews-hero__description">{{ data.description }}</p>
    </div>
  </section>
</template>

