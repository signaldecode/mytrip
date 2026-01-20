<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<template>
  <section
    class="hero-section"
    :class="{ 'hero-section--visible': isVisible }"
    :aria-label="props.data.ariaLabel ?? props.data.title"
  >
    <!-- Background layers -->
    <div class="hero-section__background">
      <img
        :src="props.data.backgroundImage.src"
        :alt="props.data.backgroundImage.alt"
        class="hero-section__bg-image"
        loading="eager"
      />
    </div>


    <!-- Content -->
    <div class="hero-section__content container">
      
      <h1 class="hero-section__title">
        {{ props.data.title }}
      </h1>
      <p class="hero-section__description">
        {{ props.data.subtitle }}
      </p>      
    </div>

    <!-- Scroll indicator -->
    <!-- <div class="hero-section__scroll" aria-hidden="true">
      <span class="hero-section__scroll-text">Scroll</span>
      <span class="hero-section__scroll-line" />
    </div> -->
  </section>
</template>
