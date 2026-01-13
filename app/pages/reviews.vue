<script setup>
import mainData from '~/data/mainData.json'
import reviewsPageData from '~/data/pages/reviewsPage.json'
import ReviewsHeroSection from '~/components/reviews/ReviewsHeroSection.vue'
import PhotoReviewsSection from '~/components/reviews/PhotoReviewsSection.vue'
import MoreReviewsSection from '~/components/reviews/MoreReviewsSection.vue'

const { getPhotoReviews, getAllReviews, getReviewsWithCourseNames } = useData()

const categories = mainData.categories.list

// 포토 후기 섹션 설정
const photoReviewsSection = {
  ...reviewsPageData.photoReviews,
  list: getReviewsWithCourseNames(getPhotoReviews(reviewsPageData.photoReviews.maxDisplay))
}

// 더 많은 후기 섹션 설정
const moreReviewsSection = {
  ...reviewsPageData.moreReviews,
  list: getReviewsWithCourseNames(getAllReviews())
}

definePageMeta({
  layout: 'default'
})

useSeoMeta({
  title: reviewsPageData.meta.title,
  description: reviewsPageData.meta.description,
  ogTitle: reviewsPageData.meta.ogTitle,
  ogDescription: reviewsPageData.meta.ogDescription
})

useHead({
  title: reviewsPageData.meta.title
})
</script>

<template>
  <main class="reviews-page">
    <ReviewsHeroSection :data="reviewsPageData.hero" />
    <PhotoReviewsSection :data="photoReviewsSection" />
    <MoreReviewsSection :data="moreReviewsSection" :categories="categories" />
  </main>
</template>
