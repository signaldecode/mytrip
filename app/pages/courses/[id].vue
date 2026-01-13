<script setup>
const { getCourseById, getInstructorById } = useData()

const route = useRoute()
const courseId = route.params.id

const course = computed(() => {
  return getCourseById(courseId)
})

const instructor = computed(() => {
  if (!course.value) return null
  return getInstructorById(course.value.instructorId)
})

if (!course.value) {
  throw createError({
    statusCode: 404,
    message: '강의를 찾을 수 없습니다.'
  })
}

definePageMeta({
  layout: 'default',
})

useSeoMeta({
  title: `${course.value.title} | 에듀테크 아카데미`,
  description: course.value.description,
  ogTitle: `${course.value.title} | 에듀테크 아카데미`,
  ogDescription: course.value.description,
  ogImage: course.value.thumbnail.src
})

useHead({
  title: `${course.value.title} | 에듀테크 아카데미`
})
</script>

<template>
  <main v-if="course" class="course-detail">
    <section class="course-hero" :aria-label="`${course.title} 강의 소개`">
      <div class="container">
        <div class="course-hero__content">
          <div class="course-hero__info">
            <ul class="course-hero__tags" aria-label="강좌 태그">
              <li
                v-for="tag in course.tags"
                :key="tag"
                class="course-hero__tag"
              >
                {{ tag }}
              </li>
            </ul>
            <h1 class="course-hero__title">{{ course.title }}</h1>
            <p class="course-hero__subtitle">{{ course.detail.subtitle }}</p>
            <p class="course-hero__description">{{ course.description }}</p>

            <div class="course-hero__meta">
              <div class="course-hero__meta-item">
                <span class="course-hero__meta-label">난이도</span>
                <span class="course-hero__meta-value">{{ course.detail.level }}</span>
              </div>
              <div class="course-hero__meta-item">
                <span class="course-hero__meta-label">수강 기간</span>
                <span class="course-hero__meta-value">{{ course.detail.duration }}</span>
              </div>
              <div class="course-hero__meta-item">
                <span class="course-hero__meta-label">수강생</span>
                <span class="course-hero__meta-value">{{ course.detail.studentCount.toLocaleString() }}명</span>
              </div>
            </div>

            <div class="course-hero__instructor">
              <img
                v-if="instructor"
                :src="instructor.profileImage.src"
                :alt="instructor.profileImage.alt"
                class="course-hero__instructor-image"
              />
              <div class="course-hero__instructor-info">
                <span class="course-hero__instructor-label">강사</span>
                <span class="course-hero__instructor-name">{{ course.instructor }}</span>
              </div>
            </div>
          </div>

          <div class="course-hero__card">
            <div class="course-hero__thumbnail">
              <img
                :src="course.thumbnail.src"
                :alt="course.thumbnail.alt"
                class="course-hero__thumbnail-image"
              />
            </div>
            <div class="course-hero__card-body">
              <div class="course-hero__price">
                <span class="course-hero__price-current">{{ course.detail.price }}</span>
                <span class="course-hero__price-original">{{ course.detail.originalPrice }}</span>
              </div>
              <div class="course-hero__rating">
                <span class="course-hero__rating-star">★</span>
                <span class="course-hero__rating-value">{{ course.detail.rating }}</span>
                <span class="course-hero__rating-count">({{ course.detail.reviewCount }}개 리뷰)</span>
              </div>
              <ul class="course-hero__features">
                <li
                  v-for="feature in course.detail.features"
                  :key="feature"
                  class="course-hero__feature"
                >
                  {{ feature }}
                </li>
              </ul>
              <button
                type="button"
                class="course-hero__cta btn btn--primary btn--lg"
                aria-label="수강 신청하기"
              >
                수강 신청하기
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="course-content section" aria-label="강의 상세 정보">
      <div class="container">
        <div class="course-content__grid">
          <div class="course-content__main">
            <div class="course-section">
              <h2 class="course-section__title">이런 걸 배워요</h2>
              <ul class="course-section__list">
                <li
                  v-for="item in course.detail.whatYouLearn"
                  :key="item"
                  class="course-section__list-item"
                >
                  {{ item }}
                </li>
              </ul>
            </div>

            <div v-if="course.detail.curriculum.length > 0" class="course-section">
              <h2 class="course-section__title">커리큘럼</h2>
              <div class="curriculum">
                <div
                  v-for="(section, index) in course.detail.curriculum"
                  :key="section.title"
                  class="curriculum__section"
                >
                  <h3 class="curriculum__section-title">
                    <span class="curriculum__section-number">{{ index + 1 }}</span>
                    {{ section.title }}
                  </h3>
                  <ul class="curriculum__lessons">
                    <li
                      v-for="lesson in section.lessons"
                      :key="lesson.title"
                      class="curriculum__lesson"
                    >
                      <span class="curriculum__lesson-title">{{ lesson.title }}</span>
                      <span class="curriculum__lesson-duration">{{ lesson.duration }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <aside class="course-content__sidebar">
            <div class="course-sidebar">
              <div class="course-sidebar__section">
                <h3 class="course-sidebar__title">수강 대상</h3>
                <ul class="course-sidebar__list">
                  <li
                    v-for="item in course.detail.targetAudience"
                    :key="item"
                    class="course-sidebar__list-item"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>

              <div class="course-sidebar__section">
                <h3 class="course-sidebar__title">선수 지식</h3>
                <ul class="course-sidebar__list">
                  <li
                    v-for="item in course.detail.requirements"
                    :key="item"
                    class="course-sidebar__list-item"
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

.course-detail {
  min-height: 100vh;
}

.course-hero {
  padding: $space-10 0;
  background: linear-gradient(135deg, $primary-50 0%, $color-background 100%);

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

  &__tag {
    padding: $space-1 $space-3;
    font-size: $font-size-sm;
    font-weight: $font-weight-medium;
    color: $primary-700;
    background-color: $primary-100;
    border-radius: $radius-full;
  }

  &__title {
    font-size: $font-size-2xl;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
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
    color: $color-text-secondary;
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
    color: $color-text-tertiary;
  }

  &__meta-value {
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
  }

  &__instructor {
    display: flex;
    align-items: center;
    gap: $space-3;
  }

  &__instructor-image {
    width: 48px;
    height: 48px;
    border-radius: $radius-full;
    object-fit: cover;
  }

  &__instructor-info {
    display: flex;
    flex-direction: column;
    gap: $space-0-5;
  }

  &__instructor-label {
    font-size: $font-size-xs;
    color: $color-text-tertiary;
  }

  &__instructor-name {
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    color: $color-text-primary;
  }

  &__card {
    width: 100%;
    background-color: $color-surface;
    border-radius: $radius-xl;
    overflow: hidden;
    box-shadow: 0 4px 24px rgba($neutral-900, 0.1);

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
    color: $color-text-primary;
  }

  &__price-original {
    font-size: $font-size-base;
    color: $color-text-tertiary;
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
    color: $color-text-primary;
  }

  &__rating-count {
    font-size: $font-size-sm;
    color: $color-text-tertiary;
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
    color: $color-text-secondary;
    border-bottom: 1px solid $color-border-light;

    &::before {
      content: '✓';
      color: $success-500;
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

.course-content {
  background-color: $color-background;

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

.course-section {
  margin-bottom: $space-10;

  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-bold;
    color: $color-text-primary;
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
    color: $color-text-secondary;
    line-height: $line-height-relaxed;
    border-bottom: 1px solid $color-border-light;

    &::before {
      content: '✓';
      color: $primary-500;
      font-weight: $font-weight-bold;
      flex-shrink: 0;
    }

    &:last-child {
      border-bottom: none;
    }
  }
}

.curriculum {
  &__section {
    margin-bottom: $space-4;
    background-color: $color-surface;
    border: 1px solid $color-border-light;
    border-radius: $radius-lg;
    overflow: hidden;
  }

  &__section-title {
    display: flex;
    align-items: center;
    gap: $space-3;
    padding: $space-4;
    font-size: $font-size-base;
    font-weight: $font-weight-semibold;
    color: $color-text-primary;
    background-color: $neutral-50;
  }

  &__section-number {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    font-size: $font-size-sm;
    font-weight: $font-weight-bold;
    color: $neutral-0;
    background-color: $primary-500;
    border-radius: $radius-full;
  }

  &__lessons {
    list-style: none;
  }

  &__lesson {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: $space-3 $space-4;
    border-top: 1px solid $color-border-light;
  }

  &__lesson-title {
    font-size: $font-size-sm;
    color: $color-text-secondary;
  }

  &__lesson-duration {
    font-size: $font-size-xs;
    color: $color-text-tertiary;
  }
}

.course-sidebar {
  background-color: $color-surface;
  border: 1px solid $color-border-light;
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
    color: $color-text-primary;
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
    color: $color-text-secondary;
    line-height: $line-height-relaxed;

    &::before {
      content: '•';
      color: $primary-500;
      font-weight: $font-weight-bold;
    }
  }
}
</style>
