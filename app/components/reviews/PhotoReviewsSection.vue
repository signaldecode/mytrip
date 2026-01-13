<script setup>
import SectionBadge from '~/components/ui/SectionBadge.vue'
import PhotoReviewCard from './PhotoReviewCard.vue'
import ReviewModal from '~/components/modal/ReviewModal.vue'

defineProps({
  data: {
    type: Object,
    required: true
  }
})

const selectedReview = ref(null)
const isModalOpen = ref(false)

const handleReviewClick = (review) => {
  selectedReview.value = review
  isModalOpen.value = true
}

const handleModalClose = () => {
  isModalOpen.value = false
  selectedReview.value = null
}
</script>

<template>
  <section
    class="photo-reviews section"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="container">
      <header class="photo-reviews__header">
        <SectionBadge v-if="data.badge" :label="data.badge" />
        <h2 class="photo-reviews__title">{{ data.title }}</h2>
        <p v-if="data.description" class="photo-reviews__description">
          {{ data.description }}
        </p>
      </header>

      <ul class="photo-reviews__grid" role="list">
        <li
          v-for="review in data.list"
          :key="review.id"
          class="photo-reviews__item"
        >
          <PhotoReviewCard
            :review="review"
            @click="handleReviewClick(review)"
          />
        </li>
      </ul>
    </div>

    <ReviewModal
      :review="selectedReview"
      :is-open="isModalOpen"
      @close="handleModalClose"
    />
  </section>
</template>

