<template>
  <div class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <header
      class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 dark:border-primary/20 pb-8">
      <div class="space-y-4">
        <nav aria-label="Breadcrumb" class="flex">
          <ol class="flex items-center space-x-2 text-sm text-gray-500 font-medium">
            <li>
              <NuxtLink to="/admin/properties" class="hover:text-primary transition-colors">Properties</NuxtLink>
            </li>
            <li><span class="material-icons text-xs text-gray-400">chevron_right</span></li>
            <li aria-current="page" class="text-nordic dark:text-gray-300">Add New</li>
          </ol>
        </nav>
        <div>
          <h1 class="text-3xl md:text-4xl font-bold text-nordic dark:text-white tracking-tight mb-2">Add New Property
          </h1>
          <p class="text-base text-gray-500 dark:text-gray-400 max-w-2xl font-normal">
            Fill in the details below to create a new listing. Fields marked with * are mandatory.
          </p>
        </div>
      </div>
      <div class="flex gap-3 hidden md:flex">
        <button @click="goBack"
          class="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-primary/30 bg-white dark:bg-transparent text-nordic dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-primary/10 transition-colors font-medium text-sm">
          Cancel
        </button>
        <button @click="triggerSave" :disabled="loading"
          class="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium shadow-md transition-all flex items-center gap-2 text-sm disabled:opacity-50">
          <span class="material-icons text-sm">save</span>
          {{ loading ? 'Saving...' : 'Save Property' }}
        </button>
      </div>
    </header>

    <AdminPropertyForm ref="formRef" @save="onSave" @cancel="goBack" :loading="loading" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const router = useRouter()
const supabase = useSupabaseClient()
const loading = ref(false)
const formRef = ref(null)
const { success: toastSuccess, error: toastError } = useToast()

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})

const goBack = () => {
  router.push('/admin/properties')
}

const triggerSave = () => {
  formRef.value?.triggerSave()
}

const generateSlug = (title) => {
  const base = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
  return `${base}-${Date.now().toString().slice(-4)}`
}

const onSave = async (payload) => {
  loading.value = true
  try {
    if (!payload.slug) {
      payload.slug = generateSlug(payload.title)
    }

    // Drop property_type_id if empty string, it expects UUID or null
    if (payload.property_type_id === "") {
      payload.property_type_id = null
    }

    // Safety checks for null numeric values so postgres doesn't complain about empty strings
    if (payload.price === "") payload.price = 0;
    if (payload.area === "") payload.area = null;
    if (payload.year_built === "") payload.year_built = null;

    // Strip lat/lng until DB migration adds those columns
    const { latitude, longitude, ...cleanPayload } = payload

    await $fetch('/api/admin/properties', {
      method: 'POST',
      body: cleanPayload
    })

    // Success
    toastSuccess('Property created successfully!')
    router.push('/admin/properties')
  } catch (err) {
    console.error('Error creating property:', err)
    toastError(`Failed to create property. ${err.message || 'Please try again.'}`)
  } finally {
    loading.value = false
  }
}
</script>
