<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar -->
    <aside class="w-64 bg-white border-r border-gray-200 flex flex-col">
      <div class="h-16 flex items-center px-6 border-b border-gray-200">
        <NuxtLink to="/" class="text-xl font-bold text-gray-900 tracking-tight">Luxus <span
            class="text-primary-600">Admin</span></NuxtLink>
      </div>

      <div class="flex-1 py-4 overflow-y-auto">
        <nav class="px-4 space-y-1">
          <NuxtLink to="/admin"
            class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            exact-active-class="bg-gray-100 text-gray-900">
            <svg class="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Dashboard
          </NuxtLink>
          <NuxtLink to="/admin/properties"
            class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            exact-active-class="bg-gray-100 text-gray-900">
            <svg class="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Properties
          </NuxtLink>
          <NuxtLink to="/admin/users"
            class="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            exact-active-class="bg-gray-100 text-gray-900">
            <svg class="mr-3 flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-500" fill="none"
              viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
            Users & Roles
          </NuxtLink>
        </nav>
      </div>

      <div class="p-4 border-t border-gray-200">
        <div class="flex items-center justify-between">
          <span class="text-sm text-gray-600 truncate">{{ user?.email }}</span>
          <button @click="logout" class="text-sm text-red-600 hover:text-red-800 focus:outline-none">
            Logout
          </button>
        </div>
      </div>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 overflow-y-auto w-full">
      <div class="py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
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
  background-color: #f3f4f6;
  color: #111827;
}
</style>
