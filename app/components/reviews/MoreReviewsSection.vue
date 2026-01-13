<script setup>
import ReviewCard from './ReviewCard.vue'
import ReviewModal from '~/components/modal/ReviewModal.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  categories: {
    type: Array,
    required: true
  }
})

const activeCategory = ref('all')
const selectedReview = ref(null)
const isModalOpen = ref(false)

const filteredReviews = computed(() => {
  if (activeCategory.value === 'all') {
    return props.data.list
  }
  return props.data.list.filter(
    review => review.category === activeCategory.value
  )
})

const handleCategoryChange = (categoryId) => {
  activeCategory.value = categoryId
}

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
    class="more-reviews section"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="container">
      <header class="more-reviews__header">
        <h2 class="more-reviews__title">{{ data.title }}</h2>
        <p v-if="data.description" class="more-reviews__description">
          {{ data.description }}
        </p>
      </header>

      <nav class="more-reviews__tabs" aria-label="후기 카테고리">
        <ul class="more-reviews__tab-list" role="tablist">
          <li
            v-for="category in categories"
            :key="category.id"
            role="presentation"
          >
            <button
              type="button"
              role="tab"
              :class="[
                'more-reviews__tab',
                { 'more-reviews__tab--active': activeCategory === category.id }
              ]"
              :aria-label="category.ariaLabel ?? category.label"
              :aria-selected="activeCategory === category.id"
              @click="handleCategoryChange(category.id)"
            >
              {{ category.label }}
            </button>
          </li>
        </ul>
      </nav>

      <div class="more-reviews__count">
        <span class="more-reviews__count-number">{{ filteredReviews.length }}</span>개의 후기
      </div>

      <ul class="more-reviews__grid" role="list">
        <li
          v-for="review in filteredReviews"
          :key="review.id"
          class="more-reviews__item"
        >
          <ReviewCard
            :review="review"
            @click="handleReviewClick(review)"
          />
        </li>
      </ul>

      <p
        v-if="filteredReviews.length === 0"
        class="more-reviews__empty"
      >
        해당 카테고리에 후기가 없습니다.
      </p>
    </div>

    <ReviewModal
      :review="selectedReview"
      :is-open="isModalOpen"
      @close="handleModalClose"
    />
  </section>
</template>

