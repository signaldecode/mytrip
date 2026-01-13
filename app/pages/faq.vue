<script setup>
import mainData from '~/data/mainData.json'
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

// 강의별 Q&A 데이터 (강의명 포함)
const courseQnAList = getQnAListWithCourseNames(getAllCourseQnA())

// Q&A가 있는 강의 목록 (필터용)
const coursesWithQnA = getCoursesWithQnA()

// Q&A 필터 카테고리 생성
const filterCategories = computed(() => [
  { id: 'all', label: faqPageData.courseQnA.allCoursesLabel, ariaLabel: '전체 Q&A 보기' },
  ...coursesWithQnA.map(course => ({
    id: course.id,
    label: course.title,
    ariaLabel: `${course.title} Q&A 보기`
  }))
])

const listData = computed(() => ({
  filter: {
    searchPlaceholder: faqPageData.courseQnA.searchPlaceholder,
    searchAriaLabel: faqPageData.courseQnA.searchAriaLabel,
    categories: filterCategories.value
  },
  qnaList: courseQnAList,
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
