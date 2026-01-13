<script setup>
import AppLogo from '~/components/common/AppLogo.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}
</script>

<template>
  <header class="app-header">
    <div class="container app-header__inner">
      <NuxtLink
        to="/"
        class="app-header__logo"
        :aria-label="`${props.data.site.title} 홈으로 이동`"
      >
        <AppLogo />
      </NuxtLink>

      <nav
        class="app-header__nav"
        :class="{ 'app-header__nav--open': isMobileMenuOpen }"
        :aria-label="'메인 네비게이션'"
      >
        <ul class="app-header__menu">
          <li
            v-for="item in props.data.navigation.headerMenu"
            :key="item.to"
            class="app-header__menu-item"
          >
            <NuxtLink
              :to="item.to"
              :aria-label="item.ariaLabel ?? item.label"
              class="app-header__link"
              @click="closeMobileMenu"
            >
              {{ item.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <button
        type="button"
        class="app-header__mobile-toggle"
        :aria-label="isMobileMenuOpen ? '메뉴 닫기' : '메뉴 열기'"
        :aria-expanded="isMobileMenuOpen"
        @click="toggleMobileMenu"
      >
        <span class="app-header__hamburger">
          <span />
          <span />
          <span />
        </span>
      </button>
    </div>
  </header>
</template>

