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
    class="courses-hero"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="courses-hero__background">
      <img
        v-if="data.backgroundImage"
        :src="data.backgroundImage.src"
        :alt="data.backgroundImage.alt"
        class="courses-hero__bg-image"
        loading="eager"
      />
    </div>

    <div class="courses-hero__content container">
      <p v-if="data.badge" class="courses-hero__badge">{{ data.badge }}</p>
      <h1 class="courses-hero__title">{{ data.title }}</h1>
      <p class="courses-hero__description">{{ data.description }}</p>
    </div>
  </section>
</template>

