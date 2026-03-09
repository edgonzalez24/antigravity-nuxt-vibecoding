<template>
  <div class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <!-- Header Section -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 class="text-3xl font-bold text-nordic dark:text-white tracking-tight">Properties Inventory</h1>
        <p class="text-gray-500 dark:text-gray-400 mt-1">Manage your portfolio and track performance.</p>
      </div>
      <div class="flex items-center gap-3">
        <NuxtLink to="/"
          class="bg-white dark:bg-[#152e2a] border border-gray-200 dark:border-primary/30 text-nordic dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-primary/10 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors shadow-sm inline-flex items-center gap-2">
          <span class="material-icons text-base">visibility</span> View Site
        </NuxtLink>
        <button
          class="bg-primary hover:bg-primary/90 text-white px-5 py-2.5 rounded-lg text-sm font-medium shadow-md shadow-primary/20 transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2">
          <span class="material-icons text-base">add</span> Add New Property
        </button>
      </div>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
      <div
        class="bg-white dark:bg-[#152e2a] p-5 rounded-xl border border-primary/10 shadow-sm flex items-center justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">Total Listings</p>
          <p class="text-2xl font-bold text-nordic dark:text-white mt-1">{{ properties?.length || 0 }}</p>
        </div>
        <div class="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
          <span class="material-icons">apartment</span>
        </div>
      </div>
    </div>

    <!-- Property List Container -->
    <div
      class="bg-white dark:bg-[#152e2a] rounded-xl shadow-sm border border-gray-200 dark:border-primary/20 overflow-hidden">
      <!-- Table Header -->
      <div
        class="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50/50 dark:bg-primary/5 border-b border-gray-100 dark:border-primary/10 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
        <div class="col-span-6">Property Details</div>
        <div class="col-span-2">Price</div>
        <div class="col-span-2">Status</div>
        <div class="col-span-2 text-right">Actions</div>
      </div>

      <div v-if="pending" class="p-8 text-center text-gray-500">
        Loading properties...
      </div>

      <div v-else-if="!properties || properties.length === 0" class="p-8 text-center text-gray-500">
        No properties found.
      </div>

      <div v-else class="divide-y divide-gray-100 dark:divide-primary/10">
        <!-- List Item -->
        <div v-for="property in properties" :key="property.id"
          class="group grid grid-cols-1 md:grid-cols-12 gap-4 px-6 py-5 hover:bg-background-light dark:hover:bg-primary/5 transition-colors items-center">

          <!-- Property Details -->
          <div class="col-span-12 md:col-span-6 flex gap-4 items-center">
            <div class="relative h-20 w-28 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
              <img
                :src="`https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80&sig=${property.id}`"
                alt="Property"
                class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div>
              <h3
                class="text-lg font-bold text-nordic dark:text-white group-hover:text-primary transition-colors cursor-pointer">
                {{ property.title }}</h3>
              <p class="text-sm text-gray-500 dark:text-gray-400">{{ property.location }}</p>
              <div class="flex items-center gap-3 mt-1.5 text-xs text-gray-400 dark:text-gray-500">
                <span class="flex items-center gap-1"><span class="material-icons text-[14px]">bed</span> 3 Beds</span>
                <span class="w-1 h-1 rounded-full bg-gray-300"></span>
                <span class="flex items-center gap-1"><span class="material-icons text-[14px]">bathtub</span> 2
                  Baths</span>
              </div>
            </div>
          </div>

          <!-- Price -->
          <div class="col-span-6 md:col-span-2">
            <div class="text-base font-semibold text-nordic dark:text-gray-200">${{ property.price.toLocaleString() }}
            </div>
            <div v-if="property.price_suffix" class="text-xs text-gray-400">/ {{ property.price_suffix }}</div>
          </div>

          <!-- Status -->
          <div class="col-span-6 md:col-span-2">
            <span :class="[
              'inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border',
              property.status === 'sale'
                ? 'bg-hint-green text-primary border-primary/10 dark:bg-primary/20 dark:text-green-300'
                : 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300'
            ]">
              <span :class="[
                'w-1.5 h-1.5 rounded-full mr-1.5',
                property.status === 'sale' ? 'bg-primary dark:bg-green-400' : 'bg-blue-500 dark:bg-blue-400'
              ]"></span>
              {{ property.status === 'sale' ? 'For Sale' : 'For Rent' }}
            </span>
          </div>

          <!-- Actions -->
          <div class="col-span-12 md:col-span-2 flex items-center justify-end gap-2">
            <button
              class="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-hint-green/30 transition-all tooltip-trigger"
              title="Edit Property">
              <span class="material-icons text-xl">edit</span>
            </button>
            <button
              class="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all tooltip-trigger"
              title="Delete Property">
              <span class="material-icons text-xl">delete_outline</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Pagination -->
      <div v-if="totalPages > 1"
        class="px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-gray-100 dark:border-primary/10 gap-4">
        <div>
          <p class="text-sm text-gray-700 dark:text-gray-300">
            Showing
            <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
            to
            <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, totalProperties) }}</span>
            of
            <span class="font-medium">{{ totalProperties }}</span>
            results
          </p>
        </div>
        <div>
          <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
            <button @click="goToPage(currentPage - 1)" :disabled="currentPage === 1"
              class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
              <span class="sr-only">Previous</span>
              <span class="material-icons text-sm">chevron_left</span>
            </button>

            <button v-for="page in totalPages" :key="page" @click="goToPage(page)" :class="[
              page === currentPage
                ? 'z-10 bg-primary/10 border-primary text-primary dark:bg-primary/20'
                : 'bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700',
              'relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-colors'
            ]">
              {{ page }}
            </button>

            <button @click="goToPage(currentPage + 1)" :disabled="currentPage === totalPages"
              class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed">
              <span class="sr-only">Next</span>
              <span class="material-icons text-sm">chevron_right</span>
            </button>
          </nav>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Properties Inventory | LuxeEstate'
})

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})

const supabase = useSupabaseClient()

const currentPage = ref(1)
const itemsPerPage = 5
const totalProperties = ref(0)
const totalPages = computed(() => Math.ceil(totalProperties.value / itemsPerPage))

const fetchProperties = async () => {
  const from = (currentPage.value - 1) * itemsPerPage
  const to = from + itemsPerPage - 1

  const { data, count, error } = await supabase
    .from('properties')
    .select('id, title, location, price, price_suffix, status', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to)

  if (error) {
    console.error('Error fetching properties:', error)
    return { data: [], count: 0 }
  }
  return { data, count }
}

const { data: result, pending, refresh } = await useAsyncData('admin-properties', fetchProperties)

const properties = computed(() => result.value?.data || [])
watch(() => result.value?.count, (newCount) => {
  if (newCount !== undefined) {
    totalProperties.value = newCount
  }
}, { immediate: true })

const goToPage = (page) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page
    refresh()
  }
}
</script>
