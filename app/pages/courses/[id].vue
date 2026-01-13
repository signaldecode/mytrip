<script setup>
const { getCourseById, getInstructorById } = useData()

const route = useRoute()
const tripId = route.params.id

const trip = computed(() => {
  return getCourseById(tripId)
})

const guide = computed(() => {
  if (!trip.value) return null
  return getInstructorById(trip.value.guideId)
})

if (!trip.value) {
  throw createError({
    statusCode: 404,
    message: '여행 상품을 찾을 수 없습니다.'
  })
}

definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: `${trip.value.title} | 마이트립`,
  description: trip.value.description,
  ogTitle: `${trip.value.title} | 마이트립`,
  ogDescription: trip.value.description,
  ogImage: trip.value.thumbnail.src
})

useHead({
  title: `${trip.value.title} | 마이트립`
})
</script>

<template>
  <main v-if="trip" class="trip-detail">
    <section class="trip-hero" :aria-label="`${trip.title} 여행 상품 소개`">
      <div class="container">
        <div class="trip-hero__content">
          <div class="trip-hero__info">
            <ul class="trip-hero__tags" aria-label="여행 태그">
              <li
                v-for="tag in trip.tags"
                :key="tag"
                class="chip"
              >
                {{ tag }}
              </li>
            </ul>
            <h1 class="trip-hero__title">{{ trip.title }}</h1>
            <p class="trip-hero__subtitle">{{ trip.detail.subtitle }}</p>
            <p class="trip-hero__description">{{ trip.description }}</p>

            <div class="trip-hero__meta">
              <div class="trip-hero__meta-item">
                <span class="trip-hero__meta-label">여행 기간</span>
                <span class="trip-hero__meta-value">{{ trip.detail.duration }}</span>
              </div>
              <div class="trip-hero__meta-item">
                <span class="trip-hero__meta-label">인원</span>
                <span class="trip-hero__meta-value">{{ trip.detail.groupSize }}</span>
              </div>
              <div class="trip-hero__meta-item">
                <span class="trip-hero__meta-label">출발지</span>
                <span class="trip-hero__meta-value">{{ trip.detail.departure }}</span>
              </div>
            </div>

            <div class="trip-hero__guide">
              <img
                v-if="guide"
                :src="guide.profileImage.src"
                :alt="guide.profileImage.alt"
                class="trip-hero__guide-image"
              />
              <div class="trip-hero__guide-info">
                <span class="trip-hero__guide-label">담당 가이드</span>
                <span class="trip-hero__guide-name">{{ guide?.name }}</span>
              </div>
            </div>
          </div>

          <div class="trip-hero__card">
            <div class="trip-hero__thumbnail">
              <img
                :src="trip.thumbnail.src"
                :alt="trip.thumbnail.alt"
                class="trip-hero__thumbnail-image"
              />
            </div>
            <div class="trip-hero__card-body">
              <div class="trip-hero__price">
                <span class="trip-hero__price-current">{{ trip.detail.price }}</span>
                <span class="trip-hero__price-original">{{ trip.detail.originalPrice }}</span>
              </div>
              <div class="trip-hero__rating">
                <span class="trip-hero__rating-star">★</span>
                <span class="trip-hero__rating-value">{{ trip.detail.rating }}</span>
                <span class="trip-hero__rating-count">({{ trip.detail.reviewCount }}개 리뷰)</span>
              </div>
              <ul class="trip-hero__features">
                <li
                  v-for="feature in trip.detail.features"
                  :key="feature"
                  class="trip-hero__feature"
                >
                  {{ feature }}
                </li>
              </ul>
              <NuxtLink
                to="/contact"
                class="trip-hero__cta btn btn--primary btn--lg"
                aria-label="예약하기"

              >
                예약하기
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="trip-content section" aria-label="여행 상세 정보">
      <div class="container">
        <div class="trip-content__grid">
          <div class="trip-content__main">
            <div class="trip-section">
              <h2 class="trip-section__title">여행 하이라이트</h2>
              <ul class="trip-section__list">
                <li
                  v-for="item in trip.detail.highlights"
                  :key="item"
                  class="trip-section__list-item"
                >
                  {{ item }}
                </li>
              </ul>
            </div>

            <div v-if="trip.detail.itinerary?.length > 0" class="trip-section">
              <h2 class="trip-section__title">여행 일정</h2>
              <div class="itinerary">
                <div
                  v-for="day in trip.detail.itinerary"
                  :key="day.day"
                  class="itinerary__day"
                >
                  <h3 class="itinerary__day-title">
                    <span class="itinerary__day-number">Day {{ day.day }}</span>
                    {{ day.title }}
                  </h3>
                  <ul class="itinerary__schedule">
                    <li
                      v-for="item in day.schedule"
                      :key="item.time"
                      class="itinerary__item"
                    >
                      <span class="itinerary__time">{{ item.time }}</span>
                      <span class="itinerary__activity">{{ item.activity }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <aside class="trip-content__sidebar">
            <div class="trip-sidebar">
              <div class="trip-sidebar__section">
                <h3 class="trip-sidebar__title">포함 사항</h3>
                <ul class="trip-sidebar__list trip-sidebar__list--includes">
                  <li
                    v-for="item in trip.detail.includes"
                    :key="item"
                    class="trip-sidebar__list-item"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div class="trip-sidebar__section">
                <h3 class="trip-sidebar__title">불포함 사항</h3>
                <ul class="trip-sidebar__list trip-sidebar__list--excludes">
                  <li
                    v-for="item in trip.detail.excludes"
                    :key="item"
                    class="trip-sidebar__list-item"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div v-if="trip.detail.notice?.length > 0" class="trip-sidebar__section">
                <h3 class="trip-sidebar__title">유의 사항</h3>
                <ul class="trip-sidebar__list trip-sidebar__list--notice">
                  <li
                    v-for="item in trip.detail.notice"
                    :key="item"
                    class="trip-sidebar__list-item"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="scss" scoped>
@use '~/assets/styles/tokens/colors' as *;
@use '~/assets/styles/tokens/typography' as *;
@use '~/assets/styles/tokens/spacing' as *;

.trip-detail {
  min-height: 100vh;
}

.trip-hero {
  padding: $space-10 0;
  background: $neutral-0;

  @media (min-width: $container-md) {
    padding: $space-16 0;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $space-8;

    @media (min-width: $container-lg) {
      flex-direction: row;
      align-items: flex-start;
    }
  }

  &__info {
    flex: 1;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: $space-2;
    list-style: none;
    margin-bottom: $space-4;
  }

  &__title {
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: $neutral-900;
    margin-bottom: $space-2;
    line-height: $line-height-tight;

    @media (min-width: $container-md) {
      font-size: $font-size-4xl;
    }
  }

  &__subtitle {
    font-size: $font-size-lg;
    color: $primary-600;
    margin-bottom: $space-3;
  }

  &__description {
    font-size: $font-size-base;
    color: $neutral-600;
    line-height: $line-height-relaxed;
    margin-bottom: $space-6;

    @media (min-width: $container-md) {
      font-size: $font-size-lg;
    }
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: $space-4;
    margin-bottom: $space-6;

    @media (min-width: $container-md) {
      gap: $space-8;
    }
  }

  &__meta-item {
    display: flex;
    flex-direction: column;
    gap: $space-1;
  }

  &__meta-label {
    font-size: $font-size-xs;
    color: $neutral-500;
  }

  &__meta-value {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $neutral-900;
  }

  &__guide {
    display: flex;
    align-items: center;
    gap: $space-3;
  }

  &__guide-image {
    width: 48px;
    height: 48px;
    border-radius: $radius-full;
    object-fit: cover;
    border: 2px solid $primary-500;
  }

  &__guide-info {
    display: flex;
    flex-direction: column;
    gap: $space-0-5;
  }

  &__guide-label {
    font-size: $font-size-xs;
    color: $neutral-500;
  }

  &__guide-name {
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    color: $neutral-900;
  }

  &__card {
    width: 100%;
    background-color: $neutral-0;
    border-radius: $radius-xl;
    overflow: hidden;
    border: 1px solid $neutral-200;
    box-shadow: 0 4px 24px rgba($neutral-900, 0.08);

    @media (min-width: $container-lg) {
      width: 380px;
      flex-shrink: 0;
      position: sticky;
      top: $space-6;
    }
  }

  &__thumbnail {
    aspect-ratio: 16 / 9;
    overflow: hidden;
  }

  &__thumbnail-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__card-body {
    padding: $space-5;
  }

  &__price {
    display: flex;
    align-items: baseline;
    gap: $space-2;
    margin-bottom: $space-3;
  }

  &__price-current {
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: $primary-600;
  }

  &__price-original {
    font-size: $font-size-base;
    color: $neutral-400;
    text-decoration: line-through;
  }

  &__rating {
    display: flex;
    align-items: center;
    gap: $space-1;
    margin-bottom: $space-4;
  }

  &__rating-star {
    color: $warning-500;
  }

  &__rating-value {
    font-weight: $font-weight-semibold;
    color: $neutral-900;
  }

  &__rating-count {
    font-size: $font-size-sm;
    color: $neutral-500;
  }

  &__features {
    list-style: none;
    margin-bottom: $space-5;
  }

  &__feature {
    display: flex;
    align-items: center;
    gap: $space-2;
    padding: $space-2 0;
    font-size: $font-size-sm;
    color: $neutral-700;
    border-bottom: 1px solid $neutral-200;

    &::before {
      content: '✓';
      color: $primary-600;
      font-weight: $font-weight-bold;
    }

    &:last-child {
      border-bottom: none;
    }
  }

  &__cta {
    width: 100%;
  }
}

.trip-content {
  background-color: $neutral-0;

  &__grid {
    display: flex;
    flex-direction: column;
    gap: $space-10;

    @media (min-width: $container-lg) {
      flex-direction: row;
    }
  }

  &__main {
    flex: 1;
  }

  &__sidebar {
    @media (min-width: $container-lg) {
      width: 320px;
      flex-shrink: 0;
    }
  }
}

.trip-section {
  margin-bottom: $space-10;

  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $neutral-900;
    margin-bottom: $space-5;
    padding-bottom: $space-3;
    border-bottom: 2px solid $primary-500;
  }

  &__list {
    list-style: none;
  }

  &__list-item {
    display: flex;
    align-items: flex-start;
    gap: $space-3;
    padding: $space-3 0;
    font-size: $font-size-base;
    color: $neutral-700;
    line-height: $line-height-relaxed;
    border-bottom: 1px solid $neutral-200;

    &::before {
      content: '✓';
      color: $primary-600;
      font-weight: $font-weight-bold;
      flex-shrink: 0;
    }

    &:last-child {
      border-bottom: none;
    }
  }
}

.itinerary {
  &__day {
    margin-bottom: $space-4;
    background-color: $neutral-0;
    border: 1px solid $neutral-200;
    border-radius: $radius-lg;
    overflow: hidden;
  }

  &__day-title {
    display: flex;
    align-items: center;
    gap: $space-3;
    padding: $space-4;
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $neutral-900;
    background-color: $neutral-100;
  }

  &__day-number {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: $space-1 $space-3;
    font-size: $font-size-sm;
    font-weight: $font-weight-bold;
    color: $neutral-0;
    background-color: $primary-600;
    border-radius: $radius-full;
  }

  &__schedule {
    list-style: none;
  }

  &__item {
    display: flex;
    gap: $space-4;
    padding: $space-3 $space-4;
    border-top: 1px solid $neutral-200;
  }

  &__time {
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $primary-600;
    min-width: 60px;
  }

  &__activity {
    font-size: $font-size-sm;
    color: $neutral-700;
  }
}

.trip-sidebar {
  background-color: $neutral-0;
  border: 1px solid $neutral-200;
  border-radius: $radius-xl;
  padding: $space-5;

  &__section {
    margin-bottom: $space-6;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__title {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $neutral-900;
    margin-bottom: $space-3;
  }

  &__list {
    list-style: none;
  }

  &__list-item {
    display: flex;
    align-items: flex-start;
    gap: $space-2;
    padding: $space-2 0;
    font-size: $font-size-sm;
    color: $neutral-700;
    line-height: $line-height-relaxed;

    &::before {
      font-weight: $font-weight-bold;
    }
  }

  &__list--includes &__list-item::before {
    content: '✓';
    color: $primary-600;
  }

  &__list--excludes &__list-item::before {
    content: '✕';
    color: $error-500;
  }

  &__list--notice &__list-item::before {
    content: '!';
    color: $warning-500;
  }
}
</style>
