<script setup>
import SectionBadge from '~/components/ui/SectionBadge.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'brand'].includes(value)
  }
})

// 슬라이딩 애니메이션을 위해 파트너 리스트를 복제
const duplicatedPartners = computed(() => {
  if (!props.data.partners) return []
  return [...props.data.partners, ...props.data.partners]
})
</script>

<template>
  <section
    class="partners-section section"
    :class="`partners-section--${variant}`"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="container">
      <header class="partners-section__header">
        <SectionBadge
          v-if="data.badge"
          :label="data.badge"
          :variant="variant === 'brand' ? 'light' : 'default'"
        />
        <h2 class="partners-section__title">{{ data.title }}</h2>
        <p
          v-if="data.subtitle"
          class="partners-section__subtitle"
        >
          {{ data.subtitle }}
        </p>
      </header>
    </div>

    <div class="partners-section__slider">
      <div class="partners-section__track">
        <div
          v-for="(partner, index) in duplicatedPartners"
          :key="`${partner.id}-${index}`"
          class="partners-section__item"
        >
          <component
            :is="partner.link ? 'a' : 'div'"
            :href="partner.link"
            :target="partner.link ? '_blank' : undefined"
            :rel="partner.link ? 'noopener noreferrer' : undefined"
            class="partners-section__logo-wrap"
            :aria-label="partner.link ? `${partner.name} 웹사이트로 이동 (새 창)` : undefined"
          >
            <img
              :src="partner.logo.src"
              :alt="partner.logo.alt"
              class="partners-section__logo"
              loading="lazy"
            />
          </component>
        </div>
      </div>
    </div>
  </section>
</template>
