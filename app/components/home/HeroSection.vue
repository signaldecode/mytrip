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
      <div class="hero-section__overlay" />
      <div class="hero-section__gradient" />
    </div>

    <!-- Animated decorations -->
    <div class="hero-section__decorations" aria-hidden="true">
      <div class="hero-section__glow hero-section__glow--1" />
      <div class="hero-section__glow hero-section__glow--2" />
      <div class="hero-section__glow hero-section__glow--3" />
      <div class="hero-section__particles">
        <span v-for="n in 20" :key="n" class="hero-section__particle" :style="{ '--i': n }" />
      </div>
    </div>

    <!-- Content -->
    <div class="hero-section__content container">
      <div class="hero-section__badge">
        <span class="hero-section__badge-dot" />
        나만의 특별한 여행
      </div>
      <h1 class="hero-section__title">
        {{ props.data.title }}
      </h1>
      <!-- <p class="hero-section__subtitle">
        {{ props.data.subtitle }}
      </p> -->
      <div class="hero-section__cta-group">
        <NuxtLink
          v-for="(button, index) in props.data.ctaButtons"
          :key="index"
          :to="button.to"
          :aria-label="button.ariaLabel ?? button.label"
          :class="[
            'hero-section__cta',
            `hero-section__cta--${button.variant ?? 'primary'}`
          ]"
        >
          <span class="hero-section__cta-text">{{ button.label }}</span>
          <span class="hero-section__cta-icon">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </span>
        </NuxtLink>
      </div>

      <!-- Stats preview -->
      <div class="hero-section__stats">
        <div class="hero-section__stat">
          <span class="hero-section__stat-value">50,000+</span>
          <span class="hero-section__stat-label">누적 여행객</span>
        </div>
        <div class="hero-section__stat-divider" />
        <div class="hero-section__stat">
          <span class="hero-section__stat-value">12,000+</span>
          <span class="hero-section__stat-label">후기</span>
        </div>
        <div class="hero-section__stat-divider" />
        <div class="hero-section__stat">
          <span class="hero-section__stat-value">87%</span>
          <span class="hero-section__stat-label">재방문율</span>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <!-- <div class="hero-section__scroll" aria-hidden="true">
      <span class="hero-section__scroll-text">Scroll</span>
      <span class="hero-section__scroll-line" />
    </div> -->
  </section>
</template>
