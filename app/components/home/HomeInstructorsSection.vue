<script setup>
import InstructorCard from '~/components/courses/InstructorCard.vue'
import InstructorModal from '~/components/modal/InstructorModal.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
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

      <ul class="instructors-section__list">
        <li
          v-for="instructor in props.data.instructors"
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

