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
    class="contact-hero"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="contact-hero__background">
      <img
        v-if="data.backgroundImage"
        :src="data.backgroundImage.src"
        :alt="data.backgroundImage.alt"
        class="contact-hero__bg-image"
        loading="eager"
      />
    </div>

    <div class="contact-hero__content container">
      <p v-if="data.badge" class="contact-hero__badge">{{ data.badge }}</p>
      <h1 class="contact-hero__title">{{ data.title }}</h1>
      <p class="contact-hero__description">{{ data.description }}</p>
    </div>
  </section>
</template>

