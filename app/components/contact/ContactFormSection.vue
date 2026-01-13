<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true
  },
  info: {
    type: Object,
    default: null
  }
})

const formData = reactive({})
const isSubmitting = ref(false)
const isSubmitted = ref(false)

onMounted(() => {
  props.data.fields.forEach((field) => {
    formData[field.name] = field.type === 'checkbox' ? false : ''
  })
  formData.privacyConsent = false
})

const handleSubmit = async () => {
  isSubmitting.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))
  isSubmitting.value = false
  isSubmitted.value = true

  setTimeout(() => {
    isSubmitted.value = false
    Object.keys(formData).forEach((key) => {
      formData[key] = typeof formData[key] === 'boolean' ? false : ''
    })
  }, 3000)
}

const getIconComponent = (iconName) => {
  const icons = {
    mail: `<path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>`,
    phone: `<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>`,
    clock: `<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>`
  }
  return icons[iconName] || ''
}
</script>

<template>
  <section
    class="contact-form-section"
    :aria-label="data.ariaLabel ?? '문의하기'"
  >
    <div class="contact-form-section__container container">
      <div class="contact-form-section__main">
        <form
          class="contact-form"
          @submit.prevent="handleSubmit"
        >
          <div class="contact-form__fields">
            <div
              v-for="field in data.fields"
              :key="field.id"
              :class="[
                'contact-form__group',
                { 'contact-form__group--full': field.type === 'textarea' }
              ]"
            >
              <label
                :for="field.id"
                class="contact-form__label"
              >
                {{ field.label }}
                <span
                  v-if="field.required"
                  class="contact-form__required"
                  aria-hidden="true"
                >*</span>
              </label>

              <input
                v-if="['text', 'email', 'tel'].includes(field.type)"
                :id="field.id"
                v-model="formData[field.name]"
                :type="field.type"
                :name="field.name"
                :placeholder="field.placeholder"
                :required="field.required"
                :aria-describedby="field.ariaDescribedBy"
                class="contact-form__input"
              />

              <div
                v-else-if="field.type === 'select'"
                class="contact-form__select-wrap"
              >
                <select
                  :id="field.id"
                  v-model="formData[field.name]"
                  :name="field.name"
                  :required="field.required"
                  :aria-describedby="field.ariaDescribedBy"
                  class="contact-form__select"
                >
                  <option
                    v-for="option in field.options"
                    :key="option.value"
                    :value="option.value"
                    :disabled="option.value === ''"
                  >
                    {{ option.label }}
                  </option>
                </select>
                <svg
                  class="contact-form__select-icon"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </div>

              <textarea
                v-else-if="field.type === 'textarea'"
                :id="field.id"
                v-model="formData[field.name]"
                :name="field.name"
                :placeholder="field.placeholder"
                :required="field.required"
                :aria-describedby="field.ariaDescribedBy"
                class="contact-form__textarea"
              />

              <p
                v-if="field.helpText"
                :id="field.ariaDescribedBy"
                class="contact-form__help"
              >
                {{ field.helpText }}
              </p>
            </div>
          </div>

          <div class="contact-form__consent">
            <div class="contact-form__checkbox">
              <input
                :id="data.privacyConsent.id"
                v-model="formData.privacyConsent"
                type="checkbox"
                name="privacyConsent"
                :required="data.privacyConsent.required"
                :aria-describedby="data.privacyConsent.ariaDescribedBy"
              />
              <label :for="data.privacyConsent.id">
                {{ data.privacyConsent.label }}
                <span
                  v-if="data.privacyConsent.required"
                  class="contact-form__required"
                  aria-hidden="true"
                >*</span>
              </label>
            </div>
            <p
              v-if="data.privacyConsent.helpText"
              :id="data.privacyConsent.ariaDescribedBy"
              class="contact-form__help"
            >
              {{ data.privacyConsent.helpText }}
            </p>
          </div>

          <div class="contact-form__submit">
            <button
              type="submit"
              :disabled="isSubmitting"
              :aria-label="data.submitButton.ariaLabel ?? data.submitButton.label"
              class="contact-form__btn btn btn--primary"
            >
              <span v-if="isSubmitting">{{ data.submitButton.loadingLabel }}</span>
              <span v-else-if="isSubmitted">{{ data.submitButton.successLabel }}</span>
              <span v-else>{{ data.submitButton.label }}</span>
            </button>
          </div>

          <Transition name="fade">
            <div
              v-if="isSubmitted"
              class="contact-form__success"
              role="alert"
              aria-live="polite"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                aria-hidden="true"
              >
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
              {{ data.successMessage }}
            </div>
          </Transition>
        </form>
      </div>

      <aside
        v-if="info"
        class="contact-form-section__sidebar"
      >
        <h2 class="contact-form-section__sidebar-title">{{ info.title }}</h2>
        <ul class="contact-form-section__info-list">
          <li
            v-for="item in info.items"
            :key="item.id"
            class="contact-form-section__info-item"
          >
            <div class="contact-form-section__info-icon">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                aria-hidden="true"
                v-html="getIconComponent(item.icon)"
              />
            </div>
            <div class="contact-form-section__info-content">
              <span class="contact-form-section__info-label">{{ item.label }}</span>
              <a
                v-if="item.link"
                :href="item.link"
                class="contact-form-section__info-value contact-form-section__info-value--link"
              >
                {{ item.value }}
              </a>
              <span v-else class="contact-form-section__info-value">{{ item.value }}</span>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  </section>
</template>

