<script setup>
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
    class="about-partners"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="container">
      <header class="about-partners__header">
        <SectionBadge :label="data.badge" />
        <h2 class="about-partners__title">{{ data.title }}</h2>
      </header>

      <ul class="about-partners__list">
        <li
          v-for="partner in data.partners"
          :key="partner.id"
          class="about-partners__item"
        >
          <a
            v-if="partner.link"
            :href="partner.link"
            class="about-partners__link"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="`${partner.name} 웹사이트로 이동 (새 창)`"
          >
            <img
              :src="partner.logo.src"
              :alt="partner.logo.alt"
              class="about-partners__logo"
              loading="lazy"
            />
          </a>
          <div v-else class="about-partners__logo-wrap">
            <img
              :src="partner.logo.src"
              :alt="partner.logo.alt"
              class="about-partners__logo"
              loading="lazy"
            />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
