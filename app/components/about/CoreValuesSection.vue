<script setup>
import SectionBadge from '~/components/ui/SectionBadge.vue'
import ValueCard from './ValueCard.vue'

defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section
    class="core-values"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="container">
      <header class="core-values__header">
        <SectionBadge :label="data.badge" variant="light" />
        <h2 class="core-values__title">{{ data.title }}</h2>
      </header>

      <ul class="core-values__list">
        <li
          v-for="value in data.values"
          :key="value.id"
          class="core-values__item"
        >
          <ValueCard :value="value" />
        </li>
      </ul>
    </div>
  </section>
</template>
