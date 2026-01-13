<script setup>
import faqPageData from '~/data/pages/faqPage.json'
import QnaHeroSection from '~/components/faq/QnaHeroSection.vue'
import QnaListSection from '~/components/faq/QnaListSection.vue'

const { getAllGeneralFaq, getAllCourseQnA, getQnAListWithCourseNames, getCoursesWithQnA } = useData()

definePageMeta({
  layout: 'default'
})

const { meta, hero } = faqPageData

useSeoMeta({
  title: meta.title,
  description: meta.description,
  ogTitle: meta.ogTitle ?? meta.title,
  ogDescription: meta.ogDescription ?? meta.description
})

useHead({
  title: meta.title
})

// 일반 FAQ 데이터
const generalFaqList = getAllGeneralFaq()

// 여행상품별 Q&A 데이터 (상품명 포함)
const tripQnAList = getQnAListWithCourseNames(getAllCourseQnA())

// Q&A가 있는 여행상품 목록 (필터용)
const coursesWithQnA = getCoursesWithQnA()

// Q&A 필터 카테고리 생성
const filterCategories = computed(() => [
  { id: 'all', label: faqPageData.tripQnA.allCoursesLabel, ariaLabel: '전체 Q&A 보기' },
  ...coursesWithQnA.map(course => ({
    id: course.id,
    label: course.title,
    ariaLabel: `${course.title} Q&A 보기`
  }))
])

const listData = computed(() => ({
  filter: {
    searchPlaceholder: faqPageData.tripQnA.searchPlaceholder,
    searchAriaLabel: faqPageData.tripQnA.searchAriaLabel,
    categories: filterCategories.value
  },
  qnaList: tripQnAList,
  generalFaq: {
    ...faqPageData.generalFaq,
    list: generalFaqList
  }
}))
</script>

<template>
  <main class="qna-page" aria-label="FAQ 페이지">
    <QnaHeroSection :data="hero" />
    <QnaListSection :data="listData" />
  </main>
</template>
