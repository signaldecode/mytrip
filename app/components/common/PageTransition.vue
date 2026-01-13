<script setup>
import { ref } from 'vue'

const router = useRouter()
const isTransitioning = ref(false)

// 페이지 전환 시작 전 비행기 애니메이션 실행
router.beforeEach((to, from, next) => {
  // 같은 페이지면 전환 효과 스킵
  if (to.path === from.path) {
    next()
    return
  }

  isTransitioning.value = true

  // 빠른 애니메이션 후 페이지 전환
  setTimeout(() => {
    next()
  }, 150)
})

// 페이지 전환 완료 후 오버레이 숨기기
router.afterEach(() => {
  setTimeout(() => {
    isTransitioning.value = false
  }, 300)
})
</script>

<template>
  <Teleport to="body">
    <div
      class="page-transition-overlay"
      :class="{ 'page-transition-overlay--active': isTransitioning }"
      aria-hidden="true"
    >
      <!-- 비행기 -->
      <div class="page-transition-plane">
        <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M58 30L42 26L28 8H22L28 26H12L8 20H4L8 32L4 44H8L12 38H28L22 56H28L42 38L58 34C60.2091 34 62 32.2091 62 30C62 27.7909 60.2091 26 58 26V30Z" fill="currentColor"/>
        </svg>
      </div>

      <!-- 비행기 자취 -->
      <div class="page-transition-trail">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </Teleport>
</template>
