<template>
  <div
    class="bg-background-light dark:bg-background-dark font-display text-nordic dark:text-gray-100 min-h-screen flex flex-col">
    <!-- Navbar -->
    <nav class="bg-card-white border-b border-nordic/5 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto flex items-center justify-between h-16">
        <div class="flex items-center gap-12">
          <div class="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <span class="material-symbols-outlined text-primary text-2xl">apartment</span>
            <span class="font-bold text-lg text-nordic tracking-tight">LuxeEstate</span>
          </div>
          <div class="hidden md:flex space-x-8">
            <NuxtLink to="/admin"
              class="px-1 py-2 text-sm font-medium transition-colors border-b-2 text-nordic/60 hover:text-primary border-transparent"
              exact-active-class="text-primary border-primary">
              Dashboard
            </NuxtLink>
            <NuxtLink to="/admin/properties"
              class="px-1 py-2 text-sm font-medium transition-colors border-b-2 text-nordic/60 hover:text-primary border-transparent"
              exact-active-class="text-primary border-primary">
              Properties
            </NuxtLink>
            <NuxtLink to="/admin/users"
              class="px-1 py-2 text-sm font-medium transition-colors border-b-2 text-nordic/60 hover:text-primary border-transparent"
              exact-active-class="text-primary border-primary">
              Users
            </NuxtLink>
          </div>
        </div>
        <div class="flex items-center gap-5">
          <button class="text-nordic/60 hover:text-primary transition-colors">
            <span class="material-symbols-outlined text-xl">search</span>
          </button>
          <button class="text-nordic/60 hover:text-primary transition-colors relative">
            <span class="material-symbols-outlined text-xl">notifications</span>
            <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
          </button>

          <div class="flex items-center gap-3 pl-4 border-l border-gray-200 dark:border-gray-700 ml-2">
            <div class="flex flex-col items-end hidden sm:flex">
              <span class="text-sm font-semibold text-nordic dark:text-white">{{ user?.user_metadata?.full_name ||
                user?.email?.split('@')[0] || 'Admin' }}</span>
              <button @click="logout" class="text-xs text-red-500 hover:text-red-700 dark:text-red-400">Logout</button>
            </div>

            <div
              class="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center text-primary overflow-hidden ring-2 ring-white dark:ring-primary/20 cursor-pointer">
              <img v-if="user?.user_metadata?.avatar_url" :src="user.user_metadata.avatar_url" alt="User profile"
                class="h-full w-full object-cover" referrerpolicy="no-referrer" />
              <span v-else
                class="material-symbols-outlined items-center justify-center flex text-nordic/60 text-lg">person</span>
            </div>
          </div>

        </div>
      </div>
    </nav>

    <!-- Main Content -->
    <main class="flex-grow w-full">
      <slot />
    </main>

    <!-- Footer -->
    <footer class="mt-auto border-t border-gray-200 dark:border-primary/20 bg-white dark:bg-[#152e2a]">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-sm text-gray-400 dark:text-gray-500">© 2026 LuxeEstate Property Management. All
          rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const user = useSupabaseUser()
const supabase = useSupabaseClient()
const router = useRouter()

const logout = async () => {
  await supabase.auth.signOut()
  router.push('/login')
}
</script>

<style scoped>
/* Scoped styles */
.router-link-active {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.dark .router-link-active {
  color: var(--color-primary);
}
</style>
