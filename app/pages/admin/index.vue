<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">Admin Dashboard</h1>
        <p class="mt-2 text-sm text-gray-700">Overview of your real estate platform.</p>
      </div>
    </div>

    <div class="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      <!-- Properties Stat -->
      <div class="overflow-hidden rounded-lg bg-white shadow border border-gray-100 p-6">
        <dt class="truncate text-sm font-medium text-gray-500">Total Properties</dt>
        <dd class="mt-2 flex items-baseline gap-x-2">
          <template v-if="pendingProperties">
            <div class="h-8 w-16 bg-gray-200 animate-pulse rounded"></div>
          </template>
          <template v-else>
            <span class="text-4xl font-semibold tracking-tight text-gray-900">{{ propertiesCount }}</span>
          </template>
        </dd>
      </div>
    </div>

    <!-- Instructions for Admin -->
    <div class="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
      <h3 class="text-lg font-medium text-blue-900">Welcome to the Admin Dashboard</h3>
      <p class="mt-2 text-sm text-blue-800">
        From here you can manage the platform. Use the sidebar to navigate to:
      </p>
      <ul class="mt-4 list-disc list-inside text-sm text-blue-800 space-y-1">
        <li><strong>Properties:</strong> View the list of all properties currently in the system.</li>
        <li><strong>Users & Roles:</strong> View all registered users and assign 'admin' privileges.</li>
      </ul>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})

const supabase = useSupabaseClient()

// Fetch properties count
const { data: propertiesCount, pending: pendingProperties } = await useAsyncData('properties-count', async () => {
  const { count, error } = await supabase
    .from('properties')
    .select('*', { count: 'exact', head: true })

  if (error) {
    console.error('Error fetching properties count:', error)
    return 0
  }
  return count
})

</script>
