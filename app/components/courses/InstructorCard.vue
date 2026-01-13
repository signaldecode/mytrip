<script setup>
defineProps({
  instructor: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['click'])

const handleClick = () => {
  emit('click')
}
</script>

<template>
  <article
    class="instructor-card"
    :aria-label="instructor.ariaLabel ?? instructor.name"
    role="button"
    tabindex="0"
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <div class="instructor-card__image-wrap">
      <img
        :src="instructor.profileImage.src"
        :alt="instructor.profileImage.alt"
        class="instructor-card__image"
        loading="lazy"
      />
    </div>
    <div class="instructor-card__body">
      <div class="instructor-card__header">
        <h3 class="instructor-card__name">{{ instructor.name }}</h3>
        <p class="instructor-card__role">{{ instructor.role }}</p>
        <p class="instructor-card__company">{{ instructor.company }}</p>
      </div>
      <ul class="instructor-card__specialties" aria-label="전문 분야">
        <li
          v-for="specialty in instructor.specialties"
          :key="specialty"
          class="chip"
        >
          {{ specialty }}
        </li>
      </ul>
      <p class="instructor-card__description">{{ instructor.description }}</p>
    </div>
  </article>
</template>

