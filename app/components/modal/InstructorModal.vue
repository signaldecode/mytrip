<script setup>
const props = defineProps({
  instructor: {
    type: Object,
    default: null
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

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
        v-if="isOpen && instructor"
        class="instructor-modal"
        role="dialog"
        aria-modal="true"
        :aria-label="`${instructor.name} 강사 상세 정보`"
        @click="handleBackdropClick"
      >
        <div class="instructor-modal__backdrop" />
        <div class="instructor-modal__container">
          <button
            type="button"
            class="instructor-modal__close"
            aria-label="모달 닫기"
            @click="handleClose"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div class="instructor-modal__content">
            <div class="instructor-modal__header">
              <div class="instructor-modal__image-wrap">
                <img
                  :src="instructor.profileImage.src"
                  :alt="instructor.profileImage.alt"
                  class="instructor-modal__image"
                />
              </div>
              <div class="instructor-modal__info">
                <h2 class="instructor-modal__name">{{ instructor.name }}</h2>
                <p class="instructor-modal__role">{{ instructor.role }}</p>
                <p class="instructor-modal__company">{{ instructor.company }}</p>
              </div>
            </div>

            <div class="instructor-modal__body">
              <div class="instructor-modal__section">
                <h3 class="instructor-modal__section-title">전문 분야</h3>
                <ul class="instructor-modal__specialties">
                  <li
                    v-for="specialty in instructor.specialties"
                    :key="specialty"
                    class="instructor-modal__specialty"
                  >
                    {{ specialty }}
                  </li>
                </ul>
              </div>

              <div class="instructor-modal__section">
                <h3 class="instructor-modal__section-title">소개</h3>
                <p class="instructor-modal__description">{{ instructor.description }}</p>
              </div>
            </div>

            <div class="instructor-modal__footer">
              <button
                type="button"
                class="instructor-modal__btn btn btn--primary"
                @click="handleClose"
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
