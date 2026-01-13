<script setup>
import ContactCard from '~/components/ui/ContactCard.vue'
import SectionBadge from '~/components/ui/SectionBadge.vue'

defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section
    class="contact-section"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="contact-section__container">
      <header class="contact-section__header">
        <SectionBadge v-if="data.badge" :label="data.badge" />
        <h2 class="contact-section__title">{{ data.title }}</h2>
        <p v-if="data.description" class="contact-section__description">
          {{ data.description }}
        </p>
      </header>

      <ul class="contact-section__list" role="list">
        <li
          v-for="card in data.cards"
          :key="card.id"
          class="contact-section__item"
        >
          <ContactCard :card="card" />
        </li>
      </ul>
    </div>
  </section>
</template>
