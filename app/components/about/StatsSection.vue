<script setup>
import SectionBadge from '~/components/ui/SectionBadge.vue'
import StatCard from './StatCard.vue'

defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section
    class="stats-section"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="container">
      <header class="stats-section__header">
        <SectionBadge :label="data.badge" />
        <h2 class="stats-section__title">{{ data.title }}</h2>
      </header>

      <ul class="stats-section__list">
        <li
          v-for="stat in data.stats"
          :key="stat.id"
          class="stats-section__item"
        >
          <StatCard :stat="stat" />
        </li>
      </ul>
    </div>
  </section>
</template>
