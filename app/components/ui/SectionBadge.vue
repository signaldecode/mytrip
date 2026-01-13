<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'light'].includes(value)
  }
})
</script>

<template>
  <span
    :class="[
      'section-badge',
      `section-badge--${variant}`
    ]"
  >
    {{ label }}
  </span>
</template>
