<script setup>
import QnaAccordionItem from './QnaAccordionItem.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const activeCategory = ref('all')
const searchQuery = ref('')
const openAccordions = ref([])

const filteredQnaList = computed(() => {
  let result = props.data.qnaList

  // Category filter
  if (activeCategory.value !== 'all') {
    result = result.filter(qna => qna.courseId === activeCategory.value)
  }

  // Search filter
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase().trim()
    result = result.filter(qna =>
      qna.question.title.toLowerCase().includes(query) ||
      qna.question.content.toLowerCase().includes(query) ||
      qna.answer.content.toLowerCase().includes(query) ||
      qna.courseName.toLowerCase().includes(query)
    )
  }

  return result
})

const isAccordionOpen = (qnaId) => {
  return openAccordions.value.includes(qnaId)
}

const toggleAccordion = (qnaId) => {
  const index = openAccordions.value.indexOf(qnaId)
  if (index === -1) {
    openAccordions.value.push(qnaId)
  } else {
    openAccordions.value.splice(index, 1)
  }
}

const resultCount = computed(() => filteredQnaList.value.length)
const totalCount = computed(() => props.data.qnaList.length)
</script>

<template>
  <section
    class="qna-list-section"
    :aria-label="data.filter.ariaLabel ?? '강의별 Q&A'"
  >
    <div class="qna-list-section__container container">
      <div class="qna-list-section__top">
        <p class="qna-list-section__result-count">
          총 <strong>{{ resultCount }}</strong>개의 Q&A
          <span v-if="resultCount !== totalCount"> (전체 {{ totalCount }}개)</span>
        </p>
        <div class="qna-list-section__search">
          <label for="qna-search" class="visually-hidden">{{ data.filter.searchAriaLabel }}</label>
          <div class="qna-list-section__search-wrap">
            <svg
              class="qna-list-section__search-icon"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              aria-hidden="true"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="M21 21l-4.35-4.35" />
            </svg>
            <input
              id="qna-search"
              type="text"
              class="qna-list-section__search-input"
              :placeholder="data.filter.searchPlaceholder"
              :value="searchQuery"
              @input="searchQuery = $event.target.value"
            />
          </div>
        </div>
      </div>

      <div class="qna-list-section__content">

        <div
          v-if="filteredQnaList.length > 0"
          class="qna-list-section__list"
          role="list"
        >
          <QnaAccordionItem
            v-for="qna in filteredQnaList"
            :key="qna.id"
            :qna="qna"
            :is-open="isAccordionOpen(qna.id)"
            @toggle="toggleAccordion(qna.id)"
          />
        </div>

        <div
          v-else
          class="qna-list-section__empty"
          role="status"
          aria-live="polite"
        >
          <svg
            class="qna-list-section__empty-icon"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="M21 21l-4.35-4.35" />
          </svg>
          <p class="qna-list-section__empty-text">
            {{ data.filter.emptyMessage ?? '검색 결과가 없습니다.' }}
          </p>
          <p class="qna-list-section__empty-hint">
            {{ data.filter.emptyHint ?? '다른 키워드나 카테고리로 검색해 보세요.' }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

