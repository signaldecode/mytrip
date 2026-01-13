<script setup>
import mainData from '~/data/mainData.json'
import coursesPageData from '~/data/pages/coursesPage.json'
import CoursesHeroSection from '~/components/courses/CoursesHeroSection.vue'
import CoursesListSection from '~/components/courses/CoursesListSection.vue'
import InstructorsSection from '~/components/courses/InstructorsSection.vue'

const { getAllCourses, getInstructorsByIds } = useData()

const categories = mainData.categories.list

// 마스터 데이터에서 전체 강의 목록 가져오기
const allCourses = getAllCourses()

// 강사 섹션 설정
const instructorsSection = {
  ...coursesPageData.instructors,
  list: getInstructorsByIds(coursesPageData.instructors.displayIds)
}

definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: coursesPageData.meta.title,
  description: coursesPageData.meta.description,
  ogTitle: coursesPageData.meta.title,
  ogDescription: coursesPageData.meta.description
})

useHead({
  title: coursesPageData.meta.title
})
</script>

<template>
  <main class="page-courses">
    <h1 class="visually-hidden">강의 목록</h1>
    <CoursesHeroSection :data="coursesPageData.hero" />
    <CoursesListSection
      :categories="categories"
      :courses="allCourses"
    />
    <InstructorsSection :data="instructorsSection" />
  </main>
</template>
