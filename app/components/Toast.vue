<template>
  <Teleport to="body">
    <div class="fixed top-5 right-5 z-[9999] flex flex-col gap-3 pointer-events-none" aria-live="polite">
      <TransitionGroup name="toast">
        <div v-for="toast in toasts" :key="toast.id"
          class="pointer-events-auto flex items-start gap-3 min-w-[300px] max-w-[420px] rounded-xl shadow-xl px-4 py-3.5 border backdrop-blur-sm cursor-pointer"
          :class="styleMap[toast.type]" @click="remove(toast.id)">
          <span class="material-icons text-xl mt-0.5 flex-shrink-0">{{ iconMap[toast.type] }}</span>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold">{{ labelMap[toast.type] }}</p>
            <p class="text-xs opacity-80 mt-0.5 break-words">{{ toast.message }}</p>
          </div>
          <button class="opacity-50 hover:opacity-100 transition-opacity mt-0.5 flex-shrink-0">
            <span class="material-icons text-sm">close</span>
          </button>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>

<script setup>
import { useToast } from '~/composables/useToast'

const { toasts, remove } = useToast()

const iconMap = {
  success: 'check_circle',
  error: 'error',
  warning: 'warning',
  info: 'info'
}

const labelMap = {
  success: 'Success',
  error: 'Error',
  warning: 'Warning',
  info: 'Info'
}

const styleMap = {
  success: 'bg-green-50 dark:bg-green-900/40 border-green-200 dark:border-green-700/50 text-green-900 dark:text-green-100',
  error: 'bg-red-50 dark:bg-red-900/40 border-red-200 dark:border-red-700/50 text-red-900 dark:text-red-100',
  warning: 'bg-amber-50 dark:bg-amber-900/40 border-amber-200 dark:border-amber-700/50 text-amber-900 dark:text-amber-100',
  info: 'bg-blue-50 dark:bg-blue-900/40 border-blue-200 dark:border-blue-700/50 text-blue-900 dark:text-blue-100'
}
</script>

<style scoped>
.toast-enter-active {
  transition: all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.toast-leave-active {
  transition: all 0.25s ease-in;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(60px) scale(0.95);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(60px) scale(0.92);
}
</style>
