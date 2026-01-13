<script setup>
const props = defineProps({
  variant: {
    type: String,
    default: 'default'
  }
})
</script>

<template>
  <span
    class="app-logo"
    :class="`app-logo--${props.variant}`"
  >
    MyTrip.com
  </span>
</template>
