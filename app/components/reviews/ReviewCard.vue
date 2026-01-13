<script setup>
defineProps({
  review: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <article
    class="review-card card"
    :class="{ 'review-card--has-photo': review.hasPhoto }"
    :aria-label="review.ariaLabel ?? review.title"
    role="button"
    tabindex="0"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <div v-if="review.hasPhoto && review.image" class="review-card__photo">
      <img
        :src="review.image.src"
        :alt="review.image.alt"
        class="review-card__photo-image"
        loading="lazy"
      />
    </div>

    <div class="review-card__body">
      <div class="review-card__header">
        <div class="review-card__author">
          <div class="review-card__avatar" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <span class="review-card__nickname">{{ review.nickname }}</span>
        </div>
        <span class="chip chip--md">{{ review.courseName }}</span>
      </div>

      <h3 class="review-card__title">{{ review.title }}</h3>
      <p class="review-card__content">{{ review.content }}</p>
    </div>
  </article>
</template>

