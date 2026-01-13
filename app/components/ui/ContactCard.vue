<script setup>
defineProps({
  card: {
    type: Object,
    required: true
  }
})

const iconMap = {
  mail: '/images/icons/mail.svg',
  youtube: '/images/icons/youtube.svg',
  chat: '/images/icons/chat.svg'
}
</script>

<template>
  <article
    class="contact-card"
    :aria-label="card.ariaLabel ?? card.title"
  >
    <div class="contact-card__icon">
      <img
        :src="iconMap[card.icon] ?? '/images/icons/default.svg'"
        :alt="`${card.title} 아이콘`"
        width="32"
        height="32"
      />
    </div>
    <h3 class="contact-card__title">{{ card.title }}</h3>
    <p class="contact-card__value">{{ card.value }}</p>

    <!-- 외부 링크 -->
    <a
      v-if="card.external"
      :href="card.link"
      class="contact-card__button"
      target="_blank"
      rel="noopener noreferrer"
      :aria-label="card.buttonAriaLabel ?? card.buttonLabel"
    >
      {{ card.buttonLabel }}
      <span class="visually-hidden">(새 창에서 열림)</span>
    </a>

    <!-- 내부 링크 -->
    <NuxtLink
      v-else
      :to="card.link"
      class="contact-card__button"
      :aria-label="card.buttonAriaLabel ?? card.buttonLabel"
    >
      {{ card.buttonLabel }}
    </NuxtLink>
  </article>
</template>
