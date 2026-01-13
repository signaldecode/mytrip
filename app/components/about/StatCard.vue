<script setup>
const props = defineProps({
  stat: {
    type: Object,
    required: true
  }
})

const displayValue = ref(0)
const hasAnimated = ref(false)

const animateValue = () => {
  if (hasAnimated.value) return
  hasAnimated.value = true

  const duration = 2000
  const start = performance.now()
  const target = props.stat.value

  const animate = (currentTime) => {
    const elapsed = currentTime - start
    const progress = Math.min(elapsed / duration, 1)
    const easeOutQuad = 1 - (1 - progress) * (1 - progress)

    displayValue.value = Math.floor(target * easeOutQuad)

    if (progress < 1) {
      requestAnimationFrame(animate)
    }
  }

  requestAnimationFrame(animate)
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateValue()
          observer.disconnect()
        }
      })
    },
    { threshold: 0.5 }
  )

  const el = document.getElementById(`stat-${props.stat.id}`)
  if (el) observer.observe(el)
})
</script>

<template>
  <article
    :id="`stat-${stat.id}`"
    class="stat-card"
    :aria-label="stat.ariaLabel ?? `${stat.label}: ${stat.value}${stat.suffix}`"
  >
    <p class="stat-card__value">
      {{ displayValue.toLocaleString() }}<span class="stat-card__suffix">{{ stat.suffix }}</span>
    </p>
    <p class="stat-card__label">{{ stat.label }}</p>
    <p v-if="stat.description" class="stat-card__description">{{ stat.description }}</p>
  </article>
</template>
