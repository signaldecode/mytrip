<script setup>
import CourseCard from '~/components/home/CourseCard.vue'

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

const filteredCourses = computed(() => {
  if (activeCategory.value === 'all') {
    return props.data.courses
  }
  return props.data.courses.filter(
    course => course.category === activeCategory.value
  )
})

const handleCategoryChange = (categoryId) => {
  activeCategory.value = categoryId
}
</script>

<template>
  <section
    class="courses-section section"
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

      <nav class="courses-section__categories" aria-label="강좌 카테고리">
        <ul class="courses-section__category-list">
          <li
            v-for="category in props.categories"
            :key="category.id"
          >
            <button
              type="button"
              :class="[
                'courses-section__category-btn',
                { 'courses-section__category-btn--active': activeCategory === category.id }
              ]"
              :aria-label="category.ariaLabel ?? category.label"
              :aria-pressed="activeCategory === category.id"
              @click="handleCategoryChange(category.id)"
            >
              {{ category.label }}
            </button>
          </li>
        </ul>
      </nav>

      <ul class="courses-section__list">
        <li
          v-for="course in filteredCourses"
          :key="course.id"
          class="courses-section__item"
        >
          <CourseCard :course="course" />
        </li>
      </ul>

      <div
        v-if="props.data.moreLink"
        class="courses-section__more"
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
  </section>
</template>

