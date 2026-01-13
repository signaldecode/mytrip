<script setup>
const props = defineProps({
  centerLabel: {
    type: String,
    required: true
  },
  fields: {
    type: Array,
    required: true
  }
})

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 300)
})

// 각 아이템에 대한 애니메이션 지연과 궤도 설정
const getItemStyle = (index) => {
  const totalItems = props.fields.length
  const angle = (360 / totalItems) * index
  const delay = index * 0.1

  return {
    '--angle': `${angle}deg`,
    '--delay': `${delay}s`,
    '--orbit-duration': `${20 + index * 2}s`
  }
}

// 아이템별 그라데이션 색상
const colors = [
  { bg: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', shadow: 'rgba(102, 126, 234, 0.4)' },
  { bg: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', shadow: 'rgba(240, 147, 251, 0.4)' },
  { bg: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', shadow: 'rgba(79, 172, 254, 0.4)' },
  { bg: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', shadow: 'rgba(67, 233, 123, 0.4)' },
  { bg: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', shadow: 'rgba(250, 112, 154, 0.4)' },
  { bg: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', shadow: 'rgba(168, 237, 234, 0.4)' },
  { bg: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', shadow: 'rgba(255, 154, 158, 0.4)' }
]

const getColorStyle = (index) => {
  const color = colors[index % colors.length]
  return {
    '--item-bg': color.bg,
    '--item-shadow': color.shadow
  }
}
</script>

<template>
  <div
    class="field-orbit"
    :class="{ 'field-orbit--visible': isVisible }"
    role="img"
    :aria-label="`${centerLabel} 중심의 학습 분야 다이어그램`"
  >
    <!-- Orbit rings -->
    <div class="field-orbit__ring field-orbit__ring--outer" aria-hidden="true" />
    <div class="field-orbit__ring field-orbit__ring--middle" aria-hidden="true" />
    <div class="field-orbit__ring field-orbit__ring--inner" aria-hidden="true" />

    <!-- Decorative particles -->
    <div class="field-orbit__particles" aria-hidden="true">
      <span v-for="n in 12" :key="n" class="field-orbit__particle" :style="{ '--particle-index': n }" />
    </div>

    <!-- Center circle -->
    <div class="field-orbit__center">
      <div class="field-orbit__center-glow" aria-hidden="true" />
      <span class="field-orbit__center-text">{{ centerLabel }}</span>
    </div>

    <!-- Orbiting fields -->
    <div
      v-for="(field, index) in props.fields"
      :key="field.id"
      class="field-orbit__item"
      :style="{ ...getItemStyle(index), ...getColorStyle(index) }"
      :aria-label="field.ariaLabel ?? field.label"
    >
      <span class="field-orbit__item-icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"/>
        </svg>
      </span>
      <span class="field-orbit__item-text">{{ field.label }}</span>
    </div>
  </div>
</template>
