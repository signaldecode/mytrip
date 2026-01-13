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
    class="photo-review-card card"
    :aria-label="review.ariaLabel ?? review.title"
    role="button"
    tabindex="0"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <div class="photo-review-card__image-wrap">
      <img
        :src="review.image.src"
        :alt="review.image.alt"
        class="photo-review-card__image"
        loading="lazy"
      />
    </div>
    <div class="photo-review-card__body">
      <h3 class="photo-review-card__title">{{ review.title }}</h3>
      <p class="photo-review-card__content">{{ review.content }}</p>
      <div class="photo-review-card__footer">
        <div class="photo-review-card__author">
          <div class="photo-review-card__avatar" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
            </svg>
          </div>
          <span class="photo-review-card__nickname">{{ review.nickname }}</span>
        </div>
        <span class="photo-review-card__course">{{ review.courseName }}</span>
      </div>
    </div>
  </article>
</template>

