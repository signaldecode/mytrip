<script setup>
import mainData from '~/data/mainData.json'
import HeroSection from '~/components/home/HeroSection.vue'
import CoursesSection from '~/components/home/CoursesSection.vue'
import HomeInstructorsSection from '~/components/home/HomeInstructorsSection.vue'
import ReviewsSection from '~/components/home/ReviewsSection.vue'
import PartnersSection from '~/components/common/PartnersSection.vue'
import FaqSection from '~/components/home/FaqSection.vue'

const { getCoursesByIds, getInstructorsByIds, getReviewsByIds, getGeneralFaqByIds, getReviewsWithCourseNames } = useData()

const data = mainData
const categories = mainData.categories.list

// 섹션 설정에서 displayIds로 마스터 데이터 필터링
const coursesSection = {
  ...data.home.courses,
  courses: getCoursesByIds(data.home.courses.displayIds)
}

const instructorsSection = {
  ...data.home.instructors,
  instructors: getInstructorsByIds(data.home.instructors.displayIds)
}

const reviewsSection = {
  ...data.home.reviews,
  reviews: getReviewsWithCourseNames(getReviewsByIds(data.home.reviews.displayIds))
}

const partnersSection = {
  ...data.home.partners,
  partners: data.partners.list
}

const faqSection = {
  ...data.home.faq,
  faqList: getGeneralFaqByIds(data.home.faq.displayIds)
}

definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: data.site.title,
  description: data.site.metaDescription,
  ogTitle: data.site.ogTitle ?? data.site.title,
  ogDescription: data.site.ogDescription ?? data.site.metaDescription,
  ogImage: data.site.ogImage,
  ogLocale: data.site.locale,
  ogSiteName: data.site.siteName,
})

useHead({
  htmlAttrs: {
    lang: 'ko',
  },
  meta: [
    { name: 'keywords', content: data.site.metaKeywords?.join(', ') },
  ],
})
</script>

<template>
  <main class="page-home">
    <h1 class="visually-hidden">{{ data.site.title }}</h1>
    <HeroSection :data="data.home.hero" />
    <CoursesSection :data="coursesSection" :categories="categories" />
    <HomeInstructorsSection :data="instructorsSection" />
    <ReviewsSection :data="reviewsSection" />
    <PartnersSection :data="partnersSection" variant="brand" />
    <FaqSection :data="faqSection" />
  </main>
</template>
