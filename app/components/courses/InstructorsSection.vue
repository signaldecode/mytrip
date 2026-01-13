<script setup>
import SectionBadge from '~/components/ui/SectionBadge.vue'
import InstructorCard from './InstructorCard.vue'
import InstructorModal from '~/components/modal/InstructorModal.vue'

defineProps({
  data: {
    type: Object,
    required: true
  },
  variant: {
    type: String,
    default: 'courses'
  }
})

const selectedInstructor = ref(null)
const isModalOpen = ref(false)

const handleInstructorClick = (instructor) => {
  selectedInstructor.value = instructor
  isModalOpen.value = true
}

const handleModalClose = () => {
  isModalOpen.value = false
  selectedInstructor.value = null
}
</script>

<template>
  <section
    class="instructors-section section"
    :class="`instructors-section--${variant}`"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="container">
      <header class="instructors-section__header">
        <SectionBadge v-if="data.badge" :label="data.badge" />
        <h2 class="instructors-section__title">{{ data.title }}</h2>
        <p v-if="data.description" class="instructors-section__description">
          {{ data.description }}
        </p>
      </header>

      <ul class="instructors-section__list" role="list">
        <li
          v-for="instructor in data.list"
          :key="instructor.id"
          class="instructors-section__item"
        >
          <InstructorCard
            :instructor="instructor"
            @click="handleInstructorClick(instructor)"
          />
        </li>
      </ul>
    </div>

    <InstructorModal
      :instructor="selectedInstructor"
      :is-open="isModalOpen"
      @close="handleModalClose"
    />
  </section>
</template>

