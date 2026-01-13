<script setup>
const props = defineProps({
  faq: {
    type: Object,
    required: true
  },
  isOpen: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['toggle'])

const panelId = computed(() => `faq-panel-${props.faq.id}`)
const headerId = computed(() => `faq-header-${props.faq.id}`)

const handleToggle = () => {
  emit('toggle', props.faq.id)
}

const handleKeydown = (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault()
    handleToggle()
  }
}
</script>

<template>
  <div
    class="faq-item"
    :class="{ 'faq-item--open': props.isOpen }"
  >
    <h3 class="faq-item__header">
      <button
        :id="headerId"
        type="button"
        class="faq-item__trigger"
        :aria-expanded="props.isOpen"
        :aria-controls="panelId"
        @click="handleToggle"
        @keydown="handleKeydown"
      >
        <span class="faq-item__question">
          {{ props.faq.question }}
        </span>
        <span
          class="faq-item__icon"
          aria-hidden="true"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </span>
      </button>
    </h3>
    <div
      :id="panelId"
      role="region"
      :aria-labelledby="headerId"
      class="faq-item__panel"
      :hidden="!props.isOpen"
    >
      <div class="faq-item__answer">
        {{ props.faq.answer }}
      </div>
    </div>
  </div>
</template>

