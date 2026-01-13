<script setup>
const props = defineProps({
  review: {
    type: Object,
    default: null
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

const hasImage = computed(() => {
  return props.review?.image?.src || props.review?.hasPhoto
})

const handleClose = () => {
  emit('close')
}

const handleBackdropClick = (event) => {
  if (event.target === event.currentTarget) {
    handleClose()
  }
}

const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    handleClose()
  }
}

onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
})

watch(() => props.isOpen, (newValue) => {
  if (newValue) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = ''
  }
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="isOpen && review"
        class="review-modal"
        :class="{ 'review-modal--with-image': hasImage }"
        role="dialog"
        aria-modal="true"
        :aria-label="`${review.nickname}님의 후기`"
        @click="handleBackdropClick"
      >
        <div class="review-modal__backdrop" />
        <div class="review-modal__container">
          <button
            type="button"
            class="review-modal__close"
            aria-label="모달 닫기"
            @click="handleClose"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div class="review-modal__content">
            <div v-if="hasImage && review.image" class="review-modal__image-section">
              <img
                :src="review.image.src"
                :alt="review.image.alt"
                class="review-modal__image"
              />
            </div>

            <div class="review-modal__body">
              <div class="review-modal__header">
                <div class="review-modal__author">
                  <div class="review-modal__avatar" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </div>
                  <span class="review-modal__nickname">{{ review.nickname }}</span>
                </div>
                <span class="review-modal__course">{{ review.courseName }}</span>
              </div>

              <h2 class="review-modal__title">{{ review.title }}</h2>
              <p class="review-modal__description">{{ review.content }}</p>

              <div class="review-modal__footer">
                <button
                  type="button"
                  class="review-modal__btn btn btn--primary"
                  @click="handleClose"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
