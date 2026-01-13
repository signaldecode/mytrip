<script setup>
import { ref, onMounted } from 'vue'

defineProps({
  data: {
    type: Object,
    required: true
  }
})

const showText = ref(false)
const animationStarted = ref(false)

onMounted(() => {
  // 애니메이션 시작
  setTimeout(() => {
    animationStarted.value = true
  }, 300)

  // 비행기가 날아간 후 텍스트 표시 (3초 후)
  setTimeout(() => {
    showText.value = true
  }, 3300)
})
</script>

<template>
  <section
    class="about-hero about-hero--fullwidth"
    :aria-label="data.ariaLabel ?? data.title"
  >
    <div class="airplane-animation airplane-animation--full" :class="{ 'airplane-animation--started': animationStarted }">
      <!-- 비행기 -->
      <div class="airplane-animation__plane">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M58 30L42 26L28 8H22L28 26H12L8 20H4L8 32L4 44H8L12 38H28L22 56H28L42 38L58 34C60.2091 34 62 32.2091 62 30C62 27.7909 60.2091 26 58 26V30Z" fill="currentColor"/>
        </svg>
      </div>

      <!-- 비행기 자취 (구름/연기) -->
      <div class="airplane-animation__trail">
        <span></span>
        <span></span>
        <span></span>
      </div>

      <!-- 텍스트 등장 -->
      <div class="airplane-animation__text" :class="{ 'airplane-animation__text--visible': showText }">
        <span class="airplane-animation__question">어떤 여행을 꿈꾸시나요?</span>
      </div>
    </div>
  </section>
</template>
