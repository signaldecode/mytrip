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
      <div class="courses-hero__gradient" />
    </div>

    <div class="courses-hero__content container">
      <h1 class="courses-hero__title">{{ data.title }}</h1>
      <p class="courses-hero__description">{{ data.description }}</p>
    </div>
  </section>
</template>

