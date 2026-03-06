<template>
  <div class="relative" ref="dropdownRef">
    <button @click="toggleDropdown"
      class="flex items-center gap-2 px-3 py-1.5 rounded-lg text-nordic-dark/70 hover:text-nordic-dark hover:bg-nordic-dark/5 transition-colors font-medium text-sm">
      <span class="text-base leading-none">{{ currentFlag }}</span>
      <span class="uppercase">{{ locale }}</span>
      <span class="material-icons text-sm transition-transform" :class="isOpen ? 'rotate-180' : ''">expand_more</span>
    </button>

    <Transition enter-active-class="transition duration-100 ease-out" enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
      <div v-if="isOpen"
        class="absolute right-0 mt-2 w-32 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50 overflow-hidden">
        <div class="py-1">
          <button v-for="l in locales" :key="l.code" @click="selectLanguage(l.code)"
            class="w-full text-left px-4 py-2 text-sm transition-colors flex items-center justify-between"
            :class="locale === l.code ? 'bg-mosque/10 text-mosque font-semibold' : 'text-nordic-dark hover:bg-nordic-dark/5'">
            <div class="flex items-center gap-2">
              <span class="text-base leading-none">{{ l.flag }}</span>
              <span>{{ getLanguageName(l.code) }}</span>
            </div>
            <span v-if="locale === l.code" class="material-icons text-base">check</span>
          </button>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from 'vue'
const { locale, setLocale } = useI18n()

// Define valid locale codes based on config
type LocaleCode = 'en' | 'es' | 'fr'

const locales: { code: LocaleCode, flag: string }[] = [
  { code: 'en', flag: '🇺🇸' },
  { code: 'es', flag: '🇪🇸' },
  { code: 'fr', flag: '🇫🇷' }
]

const currentFlag = computed(() => {
  const current = locales.find(l => l.code === locale.value)
  return current ? current.flag : '🌐'
})

const isOpen = ref(false)
const dropdownRef = ref<HTMLElement | null>(null)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const selectLanguage = (code: LocaleCode) => {
  setLocale(code)
  isOpen.value = false
}

const getLanguageName = (code: LocaleCode) => {
  const names: Record<LocaleCode, string> = {
    en: 'English',
    es: 'Español',
    fr: 'Français'
  }
  return names[code] || code.toUpperCase()
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>
