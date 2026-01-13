<script setup>
const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  activeCategory: {
    type: String,
    default: 'all'
  },
  searchQuery: {
    type: String,
    default: ''
  },
  searchPlaceholder: {
    type: String,
    default: '검색'
  },
  searchAriaLabel: {
    type: String,
    default: '검색'
  }
})

const emit = defineEmits(['update:activeCategory', 'update:searchQuery'])

const handleCategoryClick = (categoryId) => {
  emit('update:activeCategory', categoryId)
}

const handleSearchInput = (event) => {
  emit('update:searchQuery', event.target.value)
}
</script>

<template>
  <aside class="qna-filter" aria-label="Q&A 필터">
    <div class="qna-filter__search">
      <label for="qna-search" class="visually-hidden">{{ searchAriaLabel }}</label>
      <div class="qna-filter__search-wrap">
        <svg
          class="qna-filter__search-icon"
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
          class="qna-filter__search-input"
          :placeholder="searchPlaceholder"
          :value="searchQuery"
          @input="handleSearchInput"
        />
      </div>
    </div>

    <nav class="qna-filter__categories" aria-label="강의별 카테고리">
      <!-- <ul class="qna-filter__list" role="tablist">
        <li
          v-for="category in categories"
          :key="category.id"
          role="presentation"
        >
          <button
            type="button"
            role="tab"
            :class="[
              'qna-filter__item',
              { 'qna-filter__item--active': activeCategory === category.id }
            ]"
            :aria-label="category.ariaLabel ?? category.label"
            :aria-selected="activeCategory === category.id"
            @click="handleCategoryClick(category.id)"
          >
            {{ category.label }}
          </button>
        </li>
      </ul> -->
    </nav>
  </aside>
</template>

