<script setup>
const props = defineProps({
  course: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <article class="course-card card">
    <NuxtLink
      :to="props.course.link"
      :aria-label="props.course.ariaLabel ?? props.course.title"
      class="course-card__link"
    >
      <div class="course-card__thumbnail">
        <img
          :src="props.course.thumbnail.src"
          :alt="props.course.thumbnail.alt"
          class="course-card__image"
          loading="lazy"
        />
      </div>
      <div class="course-card__body">
        <ul class="course-card__tags" aria-label="강좌 태그">
          <li
            v-for="tag in props.course.tags"
            :key="tag"
            class="course-card__tag"
          >
            {{ tag }}
          </li>
        </ul>
        <h3 class="course-card__title">
          {{ props.course.title }}
        </h3>
        <p
          v-if="props.course.description"
          class="course-card__description"
        >
          {{ props.course.description }}
        </p>
        <p
          v-if="props.course.instructor"
          class="course-card__instructor"
        >
          {{ props.course.instructor }}
        </p>
      </div>
    </NuxtLink>
  </article>
</template>

