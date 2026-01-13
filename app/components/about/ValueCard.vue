<script setup>
const props = defineProps({
  value: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <div
    class="value-card"
    :aria-label="props.value.ariaLabel ?? props.value.title"
  >
    <div class="value-card__icon">
      <!-- practice: 체크리스트 -->
      <svg v-if="props.value.icon === 'practice'" viewBox="0 0 48 48" fill="none">
        <path d="M8 12h32v28H8V12z" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M16 8v4M32 8v4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M16 22l4 4 8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M16 32h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>

      <!-- mentoring: 멘토링 -->
      <svg v-else-if="props.value.icon === 'mentoring'" viewBox="0 0 48 48" fill="none">
        <circle cx="18" cy="16" r="6" stroke="currentColor" stroke-width="2"/>
        <circle cx="34" cy="18" r="4" stroke="currentColor" stroke-width="2"/>
        <path d="M6 40c0-6.627 5.373-12 12-12h4c4.418 0 8 3.582 8 8" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M30 40c0-3.314 2.686-6 6-6s6 2.686 6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M24 20l6-2" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>

      <!-- community: 커뮤니티 -->
      <svg v-else-if="props.value.icon === 'community'" viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="14" r="6" stroke="currentColor" stroke-width="2"/>
        <circle cx="10" cy="22" r="4" stroke="currentColor" stroke-width="2"/>
        <circle cx="38" cy="22" r="4" stroke="currentColor" stroke-width="2"/>
        <path d="M12 40c0-6.627 5.373-12 12-12s12 5.373 12 12" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M4 40c0-3.314 2.686-6 6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <path d="M44 40c0-3.314-2.686-6-6-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>

      <!-- update: 최신 트렌드 -->
      <svg v-else-if="props.value.icon === 'update'" viewBox="0 0 48 48" fill="none">
        <path d="M24 8v8l6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <circle cx="24" cy="24" r="16" stroke="currentColor" stroke-width="2"/>
        <path d="M12 12l-4 4 4 4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M36 36l4-4-4-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>

      <!-- certificate: 수료 인증 -->
      <svg v-else-if="props.value.icon === 'certificate'" viewBox="0 0 48 48" fill="none">
        <rect x="8" y="6" width="32" height="26" rx="2" stroke="currentColor" stroke-width="2"/>
        <circle cx="24" cy="19" r="6" stroke="currentColor" stroke-width="2"/>
        <path d="M20 32v10l4-3 4 3V32" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M14 12h6M14 26h20" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>

      <!-- support: 취업 연계 -->
      <svg v-else-if="props.value.icon === 'support'" viewBox="0 0 48 48" fill="none">
        <path d="M12 20V16c0-6.627 5.373-12 12-12s12 5.373 12 12v4" stroke="currentColor" stroke-width="2"/>
        <rect x="6" y="20" width="8" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
        <rect x="34" y="20" width="8" height="14" rx="2" stroke="currentColor" stroke-width="2"/>
        <path d="M42 34v2c0 4.418-3.582 8-8 8h-6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
        <circle cx="24" cy="44" r="2" fill="currentColor"/>
      </svg>

      <!-- default -->
      <svg v-else viewBox="0 0 48 48" fill="none">
        <circle cx="24" cy="24" r="16" stroke="currentColor" stroke-width="2"/>
        <path d="M24 16v8l6 4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
      </svg>
    </div>

    <div class="value-card__content">
      <h3 class="value-card__title">{{ props.value.title }}</h3>
      <p class="value-card__description">{{ props.value.description }}</p>
    </div>
  </div>
</template>
