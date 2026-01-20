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
    class="qna-hero"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="qna-hero__background">
      <img
        v-if="data.backgroundImage"
        :src="data.backgroundImage.src"
        :alt="data.backgroundImage.alt"
        class="qna-hero__bg-image"
        loading="eager"
      />
    </div>

    <div class="qna-hero__content container">
      <p v-if="data.badge" class="qna-hero__badge">{{ data.badge }}</p>
      <h1 class="qna-hero__title">{{ data.title }}</h1>
      <p class="qna-hero__description">{{ data.description }}</p>
    </div>
  </section>
</template>

