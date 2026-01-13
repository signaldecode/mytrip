<script setup>
import CourseCard from '~/components/home/CourseCard.vue'

const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  courses: {
    type: Array,
    required: true
  }
})

const activeCategory = ref('all')

const filteredCourses = computed(() => {
  if (activeCategory.value === 'all') {
    return props.courses
  }
  return props.courses.filter(
    course => course.category === activeCategory.value
  )
})

const handleCategoryChange = (categoryId) => {
  activeCategory.value = categoryId
}
</script>

<template>
  <section class="courses-list section" aria-label="강의 목록">
    <div class="container">
      <nav class="courses-list__tabs" aria-label="강의 카테고리">
        <ul class="courses-list__tab-list" role="tablist">
          <li
            v-for="category in categories"
            :key="category.id"
            role="presentation"
          >
            <button
              type="button"
              role="tab"
              :class="[
                'courses-list__tab',
                { 'courses-list__tab--active': activeCategory === category.id }
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

      <div class="courses-list__count">
        <span class="courses-list__count-number">{{ filteredCourses.length }}</span>개의 강의
      </div>

      <ul class="courses-list__grid" role="list">
        <li
          v-for="course in filteredCourses"
          :key="course.id"
          class="courses-list__item"
        >
          <CourseCard :course="course" />
        </li>
      </ul>

      <p
        v-if="filteredCourses.length === 0"
        class="courses-list__empty"
      >
        해당 카테고리에 강의가 없습니다.
      </p>
    </div>
  </section>
</template>

