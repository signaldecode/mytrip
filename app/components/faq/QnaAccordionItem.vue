<script setup>
const props = defineProps({
  qna: {
    type: Object,
    required: true
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle'])

const handleToggle = () => {
  emit('toggle')
}
</script>

<template>
  <article
    class="qna-accordion"
    :class="{ 'qna-accordion--open': isOpen }"
    :aria-label="qna.ariaLabel ?? qna.question.title"
  >
    <button
      type="button"
      class="qna-accordion__header"
      :aria-expanded="isOpen"
      @click="handleToggle"
    >
      <div class="qna-accordion__header-content">
        <span class="qna-accordion__badge">Q</span>
        <div class="qna-accordion__title-wrap">
          <h3 class="qna-accordion__title">{{ qna.question.title }}</h3>
          <span class="qna-accordion__course">{{ qna.courseName }}</span>
        </div>
      </div>
      <span class="qna-accordion__icon" aria-hidden="true">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </span>
    </button>

    <div class="qna-accordion__body">
      <div class="qna-accordion__body-inner">
        <div class="qna-accordion__question">
          <div class="qna-accordion__meta">
            <span class="qna-accordion__author">{{ qna.question.author }}</span>
            <span class="qna-accordion__date">{{ qna.question.createdAt }}</span>
          </div>
          <p class="qna-accordion__question-content">{{ qna.question.content }}</p>
        </div>

        <div class="qna-accordion__answer">
          <div class="qna-accordion__answer-header">
            <span class="qna-accordion__badge qna-accordion__badge--answer">A</span>
            <div class="qna-accordion__answer-meta">
              <span class="qna-accordion__answer-author">{{ qna.answer.author }}</span>
              <span class="qna-accordion__answer-date">{{ qna.answer.createdAt }}</span>
            </div>
          </div>
          <div class="qna-accordion__answer-content" v-html="qna.answer.content.replace(/\n/g, '<br>')" />
        </div>
      </div>
    </div>
  </article>
</template>

