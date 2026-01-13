<script setup>
import FieldOrbit from './FieldOrbit.vue'

defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <section
    class="about-hero"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="container about-hero__inner">
      <div class="about-hero__content">
        <h1 class="about-hero__title">{{ data.title }}</h1>
        <p class="about-hero__description">{{ data.description }}</p>
      </div>

      <div class="about-hero__visual">
        <FieldOrbit
          :center-label="data.centerLabel"
          :fields="data.fields"
        />
      </div>
    </div>
  </section>
</template>
