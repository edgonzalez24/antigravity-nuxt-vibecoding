<template>
  <div class="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <header class="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-200 dark:border-primary/20 pb-8">
      <div class="space-y-4">
        <nav aria-label="Breadcrumb" class="flex">
          <ol class="flex items-center space-x-2 text-sm text-gray-500 font-medium">
            <li><NuxtLink to="/admin/properties" class="hover:text-primary transition-colors">Properties</NuxtLink></li>
            <li><span class="material-icons text-xs text-gray-400">chevron_right</span></li>
            <li aria-current="page" class="text-nordic dark:text-gray-300">Edit Property</li>
          </ol>
        </nav>
        <div>
          <h1 class="text-3xl md:text-4xl font-bold text-nordic dark:text-white tracking-tight mb-2">Edit {{ initialData?.title || 'Property' }}</h1>
          <p class="text-base text-gray-500 dark:text-gray-400 max-w-2xl font-normal">
            Update the property details below.
          </p>
        </div>
      </div>
      <div class="flex gap-3 hidden md:flex">
        <button @click="goBack" class="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-primary/30 bg-white dark:bg-transparent text-nordic dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-primary/10 transition-colors font-medium text-sm">
          Cancel
        </button>
        <button @click="triggerSave" :disabled="loading || fetching" class="px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium shadow-md transition-all flex items-center gap-2 text-sm disabled:opacity-50">
          <span class="material-icons text-sm">save</span>
          {{ loading ? 'Saving...' : 'Save Changes' }}
        </button>
      </div>
    </header>

    <div v-if="fetching" class="p-12 text-center text-gray-500">
      <span class="material-icons animate-spin text-primary text-3xl mb-4">refresh</span>
      <p>Loading property data...</p>
    </div>
    
    <AdminPropertyForm v-else ref="formRef" @save="onSave" @cancel="goBack" :loading="loading" :initialData="initialData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()

const loading = ref(false)
const fetching = ref(true)
const formRef = ref(null)
const initialData = ref({})

definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})

onMounted(async () => {
  try {
    const { data, error } = await supabase.from('properties').select('*').eq('id', route.params.id).single()
    if (error) throw error
    initialData.value = data
  } catch (err) {
    console.error('Error fetching property:', err)
    alert('Property not found')
    router.push('/admin/properties')
  } finally {
    fetching.value = false
  }
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
    // Generate new slug if title changed (optional, but good practice)
    if (payload.title !== initialData.value.title) {
         payload.slug = generateSlug(payload.title)
    }

    if (payload.property_type_id === "") {
        payload.property_type_id = null
    }

    // Safety checks for null numeric values so postgres doesn't complain about empty strings
    if (payload.price === "") payload.price = 0;
    if (payload.area === "") payload.area = null;
    if (payload.year_built === "") payload.year_built = null;

    // Destructure to remove fields we don't want to update
    const { id, created_at, ...updateData } = payload

    await $fetch(`/api/admin/properties/${route.params.id}`, {
      method: 'PUT',
      body: updateData
    })
    
    // Success
    router.push('/admin/properties')
  } catch (err) {
    console.error('Error updating property:', err)
    alert(`Failed to update property. ${err.message || 'Please try again.'}`)
  } finally {
    loading.value = false
  }
}
</script>
