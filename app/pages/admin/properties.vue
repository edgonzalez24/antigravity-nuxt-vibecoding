<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-2xl font-semibold leading-6 text-gray-900">Properties Inventory</h1>
        <p class="mt-2 text-sm text-gray-700">A list of all properties including their title, location, price, and
          status.</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <NuxtLink to="/"
          class="block rounded-md bg-primary-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600">
          View Site</NuxtLink>
      </div>
    </div>

    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">

            <div v-if="pending" class="p-8 text-center text-gray-500">
              Loading properties...
            </div>

            <table v-else-if="properties && properties.length > 0" class="min-w-full divide-y divide-gray-300">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">Title
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Location</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Price</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="property in properties" :key="property.id">
                  <td
                    class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 truncate max-w-xs">
                    {{ property.title }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 truncate max-w-xs">{{ property.location
                    }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    ${{ property.price.toLocaleString() }}
                    <span v-if="property.price_suffix" class="text-xs text-gray-400">/ {{ property.price_suffix
                      }}</span>
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <span :class="[
                      property.status === 'sale' ? 'bg-green-50 text-green-700 ring-green-600/20' : 'bg-blue-50 text-blue-700 ring-blue-600/20',
                      'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset'
                    ]">
                      {{ property.status === 'sale' ? 'For Sale' : 'For Rent' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>

            <div v-else class="p-8 text-center text-gray-500">
              No properties found.
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: ['admin'],
})

const supabase = useSupabaseClient()

const { data: properties, pending } = await useAsyncData('admin-properties', async () => {
  const { data, error } = await supabase
    .from('properties')
    .select('id, title, location, price, price_suffix, status')
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching properties:', error)
    return []
  }
  return data
})
</script>
