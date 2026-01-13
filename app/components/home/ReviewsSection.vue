<script setup>
import PhotoReviewCard from '~/components/reviews/PhotoReviewCard.vue'
import ReviewModal from '~/components/modal/ReviewModal.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

// 모달 상태
const isModalOpen = ref(false)
const selectedReview = ref(null)

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
    class="reviews-section section"
    :aria-label="props.data.ariaLabel ?? props.data.title"
  >
    <div class="container">
      <header class="section-header">
        <h2 class="section-header__title">
          {{ props.data.title }}
        </h2>
        <p
          v-if="props.data.subtitle"
          class="section-header__subtitle"
        >
          {{ props.data.subtitle }}
        </p>
      </header>

      <ul class="reviews-section__list">
        <li
          v-for="review in props.data.reviews"
          :key="review.id"
          class="reviews-section__item"
        >
          <PhotoReviewCard
            :review="review"
            @click="handleReviewClick(review)"
          />
        </li>
      </ul>

      <div
        v-if="props.data.moreLink"
        class="reviews-section__more"
      >
        <NuxtLink
          :to="props.data.moreLink.to"
          :aria-label="props.data.moreLink.ariaLabel ?? props.data.moreLink.label"
          class="btn btn--outline"
        >
          {{ props.data.moreLink.label }}
        </NuxtLink>
      </div>
    </div>

    <!-- 후기 상세 모달 -->
    <ReviewModal
      :review="selectedReview"
      :is-open="isModalOpen"
      @close="handleModalClose"
    />
  </section>
</template>

