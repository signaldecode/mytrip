<script setup>
import AppLogo from '~/components/common/AppLogo.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const currentYear = new Date().getFullYear()
</script>

<template>
  <footer class="app-footer">
    <div class="container">
      <div class="app-footer__inner">
        <div class="app-footer__info">
          <NuxtLink
            to="/"
            class="app-footer__logo"
            :aria-label="`${props.data.site.title} 홈으로 이동`"
          >
            <AppLogo variant="light" />
          </NuxtLink>

          <address class="app-footer__address">
            <p>{{ props.data.geo.address }}</p>
            <p>
              <a
                :href="`tel:${props.data.geo.phone}`"
                :aria-label="`전화번호 ${props.data.geo.phone}`"
              >
                {{ props.data.geo.phone }}
              </a>
              <span class="app-footer__separator">|</span>
              <a
                :href="`mailto:${props.data.geo.email}`"
                :aria-label="`이메일 ${props.data.geo.email}`"
              >
                {{ props.data.geo.email }}
              </a>
            </p>
            <p>{{ props.data.geo.businessHours }}</p>
          </address>
        </div>

        <nav
          class="app-footer__nav"
          aria-label="푸터 네비게이션"
        >
          <ul class="app-footer__menu">
            <li
              v-for="item in props.data.navigation.footerMenu"
              :key="item.to"
            >
              <NuxtLink
                :to="item.to"
                :aria-label="item.ariaLabel ?? item.label"
                class="app-footer__link"
              >
                {{ item.label }}
              </NuxtLink>
            </li>
          </ul>
        </nav>
      </div>

      <div class="app-footer__bottom">
        <p class="app-footer__copyright">
          &copy; {{ currentYear }} {{ props.data.site.siteName }}. All rights reserved.
        </p>
      </div>
    </div>
  </footer>
</template>

