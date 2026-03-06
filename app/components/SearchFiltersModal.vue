<template>
  <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center p-4">
    <!-- Modal Overlay -->
    <div
      class="fixed inset-0 bg-nordic-dark/40 backdrop-blur-sm transition-opacity"
      @click="closeModal"
    ></div>

    <!-- Main Modal Container -->
    <main
      class="relative z-10 w-full max-w-2xl bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
    >
      <!-- Header -->
      <header
        class="px-8 py-6 border-b border-nordic-dark/5 flex justify-between items-center bg-white sticky top-0 z-20"
      >
        <h1 class="text-2xl font-semibold tracking-tight text-nordic-dark">Filters</h1>
        <button
          @click="closeModal"
          class="p-2 rounded-full hover:bg-black/5 transition-colors text-nordic-dark/60"
        >
          <span class="material-icons">close</span>
        </button>
      </header>

      <!-- Scrollable Content -->
      <div class="flex-1 overflow-y-auto hide-scroll p-8 space-y-10">
        <!-- Section 1: Location -->
        <section>
          <label class="block text-xs font-semibold text-nordic-dark/60 uppercase tracking-wider mb-3">
            Location
          </label>
          <div class="relative group">
            <span
              class="material-icons absolute left-4 top-3.5 text-nordic-dark/40 group-focus-within:text-mosque transition-colors"
            >
              location_on
            </span>
            <input
              v-model="filters.location"
              class="w-full pl-12 pr-4 py-3 bg-gray-50 border-0 rounded-lg text-nordic-dark placeholder-nordic-dark/40 focus:ring-2 focus:ring-mosque focus:bg-white transition-all shadow-sm"
              placeholder="City, neighborhood, or address"
              type="text"
            />
          </div>
        </section>

        <!-- Section 2: Property Details -->
        <section class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <!-- Property Type -->
          <div class="space-y-3">
            <label class="block text-xs font-semibold text-nordic-dark/60 uppercase tracking-wider">
              Property Type
            </label>
            <div class="relative">
              <select
                v-model="filters.type"
                class="w-full bg-gray-50 border-0 rounded-lg py-3 pl-4 pr-10 text-nordic-dark appearance-none focus:ring-2 focus:ring-mosque cursor-pointer"
              >
                <option value="">Any Type</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
              <span class="material-icons absolute right-3 top-3 text-nordic-dark/40 pointer-events-none">
                expand_more
              </span>
            </div>
          </div>

          <!-- Rooms -->
          <div class="space-y-4">
            <!-- Beds -->
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium text-nordic-dark">Bedrooms</span>
              <div class="flex items-center space-x-3 bg-gray-50 rounded-full p-1">
                <button
                  @click="filters.beds > 0 ? filters.beds-- : null"
                  :disabled="filters.beds === 0"
                  class="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-nordic-dark/60 hover:text-mosque disabled:opacity-50 transition-colors"
                >
                  <span class="material-icons text-base">remove</span>
                </button>
                <span class="text-sm font-semibold w-4 text-center">{{ filters.beds }}+</span>
                <button
                  @click="filters.beds++"
                  class="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-mosque hover:bg-mosque hover:text-white transition-colors"
                >
                  <span class="material-icons text-base">add</span>
                </button>
              </div>
            </div>

            <!-- Baths -->
            <div class="flex justify-between items-center">
              <span class="text-sm font-medium text-nordic-dark">Bathrooms</span>
              <div class="flex items-center space-x-3 bg-gray-50 rounded-full p-1">
                <button
                  @click="filters.baths > 0 ? filters.baths-- : null"
                  :disabled="filters.baths === 0"
                  class="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-nordic-dark/60 hover:text-mosque disabled:opacity-50 transition-colors"
                >
                  <span class="material-icons text-base">remove</span>
                </button>
                <span class="text-sm font-semibold w-4 text-center">{{ filters.baths }}+</span>
                <button
                  @click="filters.baths++"
                  class="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-mosque hover:bg-mosque hover:text-white transition-colors"
                >
                  <span class="material-icons text-base">add</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <!-- Section 3: Amenities -->
        <section>
          <label class="block text-xs font-semibold text-nordic-dark/60 uppercase tracking-wider mb-4">
            Amenities & Features
          </label>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
            <label
              v-for="amenity in availableAmenities"
              :key="amenity.value"
              class="cursor-pointer group relative"
            >
              <input
                type="checkbox"
                v-model="filters.amenities"
                :value="amenity.value"
                class="peer sr-only"
              />
              <div
                class="h-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-nordic-dark/60 text-sm flex items-center justify-center gap-2 transition-all hover:border-gray-300 peer-checked:border-mosque peer-checked:bg-mosque/5 peer-checked:text-mosque font-medium"
              >
                <span
                  class="material-icons text-lg text-nordic-dark/40 group-hover:text-nordic-dark/60 peer-checked:text-mosque transition-colors"
                >
                  {{ amenity.icon }}
                </span>
                {{ amenity.label }}
              </div>
              <div
                class="absolute top-2 right-2 w-2 h-2 bg-mosque rounded-full opacity-0 peer-checked:opacity-100 transition-opacity"
              ></div>
            </label>
          </div>
        </section>
      </div>

      <!-- Footer -->
      <footer
        class="bg-white border-t border-nordic-dark/5 px-8 py-6 sticky bottom-0 z-20 flex items-center justify-between"
      >
        <button
          @click="clearFilters"
          class="text-sm font-medium text-nordic-dark/60 hover:text-nordic-dark transition-colors underline decoration-nordic-dark/20 hover:decoration-nordic-dark underline-offset-4"
        >
          Clear all filters
        </button>
        <button
          @click="applyFilters"
          class="bg-mosque hover:bg-mosque/90 text-white px-8 py-3 rounded-lg font-medium shadow-lg shadow-mosque/30 transition-all hover:shadow-mosque/40 flex items-center gap-2 transform active:scale-95"
        >
          Apply Filters
          <span class="material-icons text-sm">arrow_forward</span>
        </button>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch } from 'vue'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'apply', filters: FilterOptions): void
}>()

export interface FilterOptions {
  location: string
  type: string
  beds: number
  baths: number
  amenities: string[]
}

const defaultFilters: FilterOptions = {
  location: '',
  type: '',
  beds: 0,
  baths: 0,
  amenities: []
}

const filters = reactive<FilterOptions>({ ...defaultFilters })

const availableAmenities = [
  { label: 'Swimming Pool', value: 'Pool', icon: 'pool' },
  { label: 'Gym', value: 'Gym', icon: 'fitness_center' },
  { label: 'Parking', value: 'Parking', icon: 'local_parking' },
  { label: 'Air Conditioning', value: 'AC', icon: 'ac_unit' },
  { label: 'High-speed Wifi', value: 'Wifi', icon: 'wifi' },
  { label: 'Patio / Terrace', value: 'Patio', icon: 'deck' }
]

const closeModal = () => {
  emit('update:modelValue', false)
}

const clearFilters = () => {
  Object.assign(filters, defaultFilters)
}

const applyFilters = () => {
  emit('apply', { ...filters })
  closeModal()
}
</script>

<style scoped>
.hide-scroll::-webkit-scrollbar {
  display: none;
}
.hide-scroll {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
