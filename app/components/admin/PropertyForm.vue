<template>
  <form @submit.prevent="save" class="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
    <div class="xl:col-span-8 space-y-8">
      <!-- Basic Information -->
      <div
        class="bg-white dark:bg-[#152e2a] rounded-xl shadow-sm border border-gray-100 dark:border-primary/20 overflow-hidden">
        <div
          class="px-8 py-6 border-b border-hint-green/30 dark:border-primary/20 flex items-center gap-3 bg-gradient-to-r from-hint-green/10 dark:from-primary/10 to-transparent">
          <div
            class="w-8 h-8 rounded-full bg-hint-green dark:bg-primary/20 flex items-center justify-center text-nordic dark:text-primary">
            <span class="material-icons text-lg">info</span>
          </div>
          <h2 class="text-xl font-bold text-nordic dark:text-white">Basic Information</h2>
        </div>

        <div class="p-8 space-y-6">
          <div class="group">
            <label for="title" class="block text-sm font-medium text-nordic dark:text-gray-300 mb-1.5">Property Title
              <span class="text-red-500">*</span></label>
            <input type="text" id="title" v-model="form.title" required
              class="w-full text-base px-4 py-2.5 rounded-md border border-gray-200 dark:border-primary/30 bg-white dark:bg-[#0f2420] text-nordic dark:text-white placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary transition-all"
              placeholder="e.g. Modern Penthouse with Ocean View">
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label for="price" class="block text-sm font-medium text-nordic dark:text-gray-300 mb-1.5">Price <span
                  class="text-red-500">*</span></label>
              <div class="relative">
                <span class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">$</span>
                <input type="number" id="price" v-model="form.price" required
                  class="w-full pl-7 pr-4 py-2.5 rounded-md border border-gray-200 dark:border-primary/30 bg-white dark:bg-[#0f2420] text-nordic dark:text-white placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary transition-all text-base font-medium"
                  placeholder="0">
              </div>
            </div>

            <div>
              <label for="status" class="block text-sm font-medium text-nordic dark:text-gray-300 mb-1.5">Status</label>
              <select id="status" v-model="form.status"
                class="w-full px-4 py-2.5 rounded-md border border-gray-200 dark:border-primary/30 bg-white dark:bg-[#0f2420] text-nordic dark:text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all text-base cursor-pointer">
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>

            <div>
              <label for="type" class="block text-sm font-medium text-nordic dark:text-gray-300 mb-1.5">Property
                Type</label>
              <select id="type" v-model="form.property_type_id"
                class="w-full px-4 py-2.5 rounded-md border border-gray-200 dark:border-primary/30 bg-white dark:bg-[#0f2420] text-nordic dark:text-white focus:ring-1 focus:ring-primary focus:border-primary transition-all text-base cursor-pointer">
                <option value="">Select a type</option>
                <option v-for="type in propertyTypes" :key="type.id" :value="type.id">
                  {{ type.name }}
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div
        class="bg-white dark:bg-[#152e2a] rounded-xl shadow-sm border border-gray-100 dark:border-primary/20 overflow-hidden">
        <div
          class="px-8 py-6 border-b border-hint-green/30 dark:border-primary/20 flex items-center gap-3 bg-gradient-to-r from-hint-green/10 dark:from-primary/10 to-transparent">
          <div
            class="w-8 h-8 rounded-full bg-hint-green dark:bg-primary/20 flex items-center justify-center text-nordic dark:text-primary">
            <span class="material-icons text-lg">description</span>
          </div>
          <h2 class="text-xl font-bold text-nordic dark:text-white">Description</h2>
        </div>

        <div class="p-8">
          <!-- Formatting Toolbar -->
          <div class="mb-2 flex gap-1 border-b border-gray-100 dark:border-primary/10 pb-2">
            <button type="button" @click="applyFormat('bold')"
              class="p-1.5 text-gray-400 hover:text-nordic dark:hover:text-white hover:bg-gray-50 dark:hover:bg-primary/10 rounded transition-colors"
              title="Bold">
              <span class="material-icons text-lg">format_bold</span>
            </button>
            <button type="button" @click="applyFormat('italic')"
              class="p-1.5 text-gray-400 hover:text-nordic dark:hover:text-white hover:bg-gray-50 dark:hover:bg-primary/10 rounded transition-colors"
              title="Italic">
              <span class="material-icons text-lg">format_italic</span>
            </button>
            <button type="button" @click="applyFormat('list')"
              class="p-1.5 text-gray-400 hover:text-nordic dark:hover:text-white hover:bg-gray-50 dark:hover:bg-primary/10 rounded transition-colors"
              title="Bullet List">
              <span class="material-icons text-lg">format_list_bulleted</span>
            </button>
          </div>
          <textarea id="description" ref="descriptionRef" v-model="form.description"
            class="w-full px-4 py-3 rounded-md border border-gray-200 dark:border-primary/30 bg-white dark:bg-[#0f2420] text-nordic dark:text-white placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary transition-all text-base leading-relaxed resize-y min-h-[200px]"
            placeholder="Describe the property features, neighborhood, and unique selling points..."></textarea>
          <div class="mt-2 text-right text-xs text-gray-400">
            {{ (form.description || "").length }} characters
          </div>
        </div>
      </div>

      <!-- Gallery -->
      <div
        class="bg-white dark:bg-[#152e2a] rounded-xl shadow-sm border border-gray-100 dark:border-primary/20 overflow-hidden">
        <div
          class="px-8 py-6 border-b border-hint-green/30 dark:border-primary/20 flex justify-between items-center bg-gradient-to-r from-hint-green/10 dark:from-primary/10 to-transparent">
          <div class="flex items-center gap-3">
            <div
              class="w-8 h-8 rounded-full bg-hint-green dark:bg-primary/20 flex items-center justify-center text-nordic dark:text-primary">
              <span class="material-icons text-lg">image</span>
            </div>
            <h2 class="text-xl font-bold text-nordic dark:text-white">Gallery</h2>
          </div>
          <span class="text-xs font-medium text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">JPG, PNG,
            WEBP</span>
        </div>

        <div class="p-8">
          <div @click="triggerFileInput" @dragover.prevent="isDragging = true" @dragleave.prevent="isDragging = false"
            @drop.prevent="handleDrop" :class="[
              'relative border-2 border-dashed rounded-xl p-10 text-center transition-colors cursor-pointer group',
              isDragging
                ? 'border-primary bg-hint-green/20 dark:bg-primary/20'
                : 'border-gray-300 dark:border-primary/40 bg-gray-50/50 dark:bg-primary/5 hover:bg-hint-green/10 dark:hover:bg-primary/10 hover:border-primary/40'
            ]">
            <input type="file" ref="fileInput" @change="handleFileSelect" multiple
              accept="image/jpeg,image/png,image/webp" class="hidden">
            <div class="flex flex-col items-center justify-center space-y-3 pointer-events-none">
              <div :class="[
                'w-12 h-12 bg-white dark:bg-[#0f2420] rounded-full flex items-center justify-center shadow-sm transition-transform duration-300',
                isDragging ? 'scale-110 text-primary' : 'text-primary group-hover:scale-110'
              ]">
                <span class="material-icons text-2xl">{{ isDragging ? 'file_download' : 'cloud_upload' }}</span>
              </div>
              <div class="space-y-1">
                <p class="text-base font-medium text-nordic dark:text-gray-300">
                  {{ isDragging ? 'Drop images here!' : 'Click or drag images here' }}
                </p>
                <p class="text-xs text-gray-400">Max file size 5MB per image</p>
              </div>
            </div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
            <!-- Existing Images -->
            <div v-for="(img, idx) in form.images" :key="'exist_' + idx"
              class="aspect-square rounded-lg overflow-hidden relative group shadow-sm">
              <img :src="img" alt="Property Image" class="w-full h-full object-cover">
              <div
                class="absolute inset-0 bg-nordic/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                <button @click.prevent="removeExistingImage(idx)" type="button"
                  class="w-8 h-8 rounded-full bg-white text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors">
                  <span class="material-icons text-sm">delete</span>
                </button>
              </div>
            </div>

            <!-- New Images -->
            <div v-for="(item, idx) in newImages" :key="'new_' + idx"
              class="aspect-square rounded-lg overflow-hidden relative group shadow-sm border border-primary/20">
              <img :src="item.preview" alt="New ImagePreview" class="w-full h-full object-cover">
              <div
                class="absolute inset-0 bg-nordic/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                <button @click.prevent="removeNewImage(idx)" type="button"
                  class="w-8 h-8 rounded-full bg-white text-red-500 hover:bg-red-50 flex items-center justify-center transition-colors">
                  <span class="material-icons text-sm">delete</span>
                </button>
              </div>
              <span
                class="absolute top-2 left-2 bg-primary text-white text-[10px] font-bold px-2 py-0.5 rounded shadow-sm uppercase tracking-wider">NEW</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar / Additional Info -->
    <div class="xl:col-span-4 space-y-8">

      <!-- Location -->
      <div
        class="bg-white dark:bg-[#152e2a] rounded-xl shadow-sm border border-gray-100 dark:border-primary/20 overflow-hidden">
        <div
          class="px-6 py-4 border-b border-hint-green/30 dark:border-primary/20 flex items-center gap-3 bg-gradient-to-r from-hint-green/10 dark:from-primary/10 to-transparent">
          <div
            class="w-8 h-8 rounded-full bg-hint-green dark:bg-primary/20 flex items-center justify-center text-nordic dark:text-primary">
            <span class="material-icons text-lg">place</span>
          </div>
          <h2 class="text-lg font-bold text-nordic dark:text-white">Location</h2>
        </div>
        <div class="p-6 space-y-4">
          <div>
            <label for="location"
              class="block text-sm font-medium text-nordic dark:text-gray-300 mb-1.5">Address</label>
            <input type="text" id="location" v-model="form.location"
              class="w-full px-4 py-2.5 rounded-md border border-gray-200 dark:border-primary/30 bg-white dark:bg-[#0f2420] text-nordic dark:text-white placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm mb-4"
              placeholder="Street Address, City, Zip">

            <!-- Map Preview -->
            <div
              class="relative h-48 w-full rounded-lg overflow-hidden border border-gray-200 dark:border-primary/30 mb-4"
              :class="hasCoordinates ? '' : 'bg-gray-100 dark:bg-gray-800'">
              <!-- Leaflet map when coordinates are available -->
              <ClientOnly>
                <AdminLeafletMap v-if="hasCoordinates" :latitude="Number(form.latitude)"
                  :longitude="Number(form.longitude)" class="w-full h-full" />
              </ClientOnly>
              <!-- Placeholder when no coordinates -->
              <div v-if="!hasCoordinates"
                class="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none">
                <span class="material-icons text-3xl text-gray-300 dark:text-gray-600">location_off</span>
                <p class="text-xs text-gray-400 dark:text-gray-500 text-center font-medium">Enter coordinates
                  below<br>to preview location</p>
              </div>
            </div>

            <!-- Lat/Lng Coordinates -->
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label for="latitude"
                  class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                  <span class="material-icons text-xs text-primary">my_location</span> Latitude
                </label>
                <input type="number" id="latitude" v-model="form.latitude" step="0.0000001"
                  class="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-primary/30 bg-white dark:bg-[#0f2420] text-nordic dark:text-white placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary transition-all text-xs"
                  placeholder="e.g. 37.4419">
              </div>
              <div>
                <label for="longitude"
                  class="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1 flex items-center gap-1">
                  <span class="material-icons text-xs text-primary">my_location</span> Longitude
                </label>
                <input type="number" id="longitude" v-model="form.longitude" step="0.0000001"
                  class="w-full px-3 py-2 rounded-md border border-gray-200 dark:border-primary/30 bg-white dark:bg-[#0f2420] text-nordic dark:text-white placeholder-gray-400 focus:ring-1 focus:ring-primary focus:border-primary transition-all text-xs"
                  placeholder="e.g. -122.143">
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Details -->
      <div
        class="bg-white dark:bg-[#152e2a] rounded-xl shadow-sm border border-gray-100 dark:border-primary/20 overflow-hidden sticky top-24">
        <div
          class="px-6 py-4 border-b border-hint-green/30 dark:border-primary/20 flex items-center gap-3 bg-gradient-to-r from-hint-green/10 dark:from-primary/10 to-transparent">
          <div
            class="w-8 h-8 rounded-full bg-hint-green dark:bg-primary/20 flex items-center justify-center text-nordic dark:text-primary">
            <span class="material-icons text-lg">straighten</span>
          </div>
          <h2 class="text-lg font-bold text-nordic dark:text-white">Details</h2>
        </div>

        <div class="p-6 space-y-6">
          <div class="grid grid-cols-2 gap-4">
            <div class="group">
              <label for="area" class="text-xs text-gray-500 font-medium mb-1 block">Area (m²)</label>
              <input type="number" id="area" v-model="form.area"
                class="w-full text-left px-3 py-2 rounded border border-gray-200 dark:border-primary/30 bg-gray-50 dark:bg-[#0f2420] text-nordic dark:text-white focus:bg-white dark:focus:bg-[#152e2a] focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm"
                placeholder="0">
            </div>
            <div class="group">
              <label for="year" class="text-xs text-gray-500 font-medium mb-1 block">Year Built</label>
              <input type="number" id="year" v-model="form.year_built"
                class="w-full text-left px-3 py-2 rounded border border-gray-200 dark:border-primary/30 bg-gray-50 dark:bg-[#0f2420] text-nordic dark:text-white focus:bg-white dark:focus:bg-[#152e2a] focus:ring-1 focus:ring-primary focus:border-primary transition-all text-sm"
                placeholder="YYYY">
            </div>
          </div>

          <hr class="border-gray-100 dark:border-primary/10">

          <div class="space-y-4">
            <!-- Counters -->
            <div class="flex items-center justify-between">
              <label class="text-sm font-medium text-nordic dark:text-gray-300 flex items-center gap-2">
                <span class="material-icons text-gray-400 text-sm">bed</span> Bedrooms
              </label>
              <div
                class="flex items-center border border-gray-200 dark:border-primary/30 rounded-md overflow-hidden bg-white dark:bg-[#0f2420] shadow-sm">
                <button type="button" @click="adjustValue('beds', -1)"
                  class="w-8 h-8 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-primary/10 text-gray-600 dark:text-gray-400 transition-colors border-r border-gray-200 dark:border-primary/30">-</button>
                <input type="text" readonly :value="form.beds"
                  class="w-10 text-center border-none bg-transparent text-nordic dark:text-white p-0 focus:ring-0 text-sm font-medium">
                <button type="button" @click="adjustValue('beds', 1)"
                  class="w-8 h-8 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-primary/10 text-gray-600 dark:text-gray-400 transition-colors border-l border-gray-200 dark:border-primary/30">+</button>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <label class="text-sm font-medium text-nordic dark:text-gray-300 flex items-center gap-2">
                <span class="material-icons text-gray-400 text-sm">shower</span> Bathrooms
              </label>
              <div
                class="flex items-center border border-gray-200 dark:border-primary/30 rounded-md overflow-hidden bg-white dark:bg-[#0f2420] shadow-sm">
                <button type="button" @click="adjustValue('baths', -1)"
                  class="w-8 h-8 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-primary/10 text-gray-600 dark:text-gray-400 transition-colors border-r border-gray-200 dark:border-primary/30">-</button>
                <input type="text" readonly :value="form.baths"
                  class="w-10 text-center border-none bg-transparent text-nordic dark:text-white p-0 focus:ring-0 text-sm font-medium">
                <button type="button" @click="adjustValue('baths', 1)"
                  class="w-8 h-8 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-primary/10 text-gray-600 dark:text-gray-400 transition-colors border-l border-gray-200 dark:border-primary/30">+</button>
              </div>
            </div>

            <div class="flex items-center justify-between">
              <label class="text-sm font-medium text-nordic dark:text-gray-300 flex items-center gap-2">
                <span class="material-icons text-gray-400 text-sm">directions_car</span> Parking
              </label>
              <div
                class="flex items-center border border-gray-200 dark:border-primary/30 rounded-md overflow-hidden bg-white dark:bg-[#0f2420] shadow-sm">
                <button type="button" @click="adjustValue('parking', -1)"
                  class="w-8 h-8 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-primary/10 text-gray-600 dark:text-gray-400 transition-colors border-r border-gray-200 dark:border-primary/30">-</button>
                <input type="text" readonly :value="form.parking"
                  class="w-10 text-center border-none bg-transparent text-nordic dark:text-white p-0 focus:ring-0 text-sm font-medium">
                <button type="button" @click="adjustValue('parking', 1)"
                  class="w-8 h-8 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-primary/10 text-gray-600 dark:text-gray-400 transition-colors border-l border-gray-200 dark:border-primary/30">+</button>
              </div>
            </div>
          </div>

          <hr class="border-gray-100 dark:border-primary/10">

          <!-- Amenities -->
          <div>
            <h3 class="text-xs font-bold text-gray-500 mb-3 uppercase tracking-wider">Amenities</h3>
            <div class="space-y-2">
              <label v-for="amenity in availableAmenities" :key="amenity"
                class="flex items-center gap-2.5 cursor-pointer group">
                <input type="checkbox" :checked="(form.amenities || []).includes(amenity)"
                  @change="toggleAmenity(amenity)"
                  class="w-4 h-4 text-primary border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-800 focus:ring-primary focus:ring-offset-gray-900">
                <span
                  class="text-sm text-gray-700 dark:text-gray-300 group-hover:text-nordic dark:group-hover:text-white transition-colors">{{
                    amenity }}</span>
              </label>
            </div>
          </div>

          <hr class="border-gray-100 dark:border-primary/10">

          <!-- Featured Toggle -->
          <div class="flex items-center justify-between p-3 rounded-lg"
            :class="form.featured ? 'bg-hint-green/20 dark:bg-primary/10 border border-primary/20' : 'bg-gray-50 dark:bg-[#0f2420] border border-gray-200 dark:border-primary/20'">
            <div class="flex items-center gap-2">
              <span class="material-icons text-sm" :class="form.featured ? 'text-primary' : 'text-gray-400'">star</span>
              <div>
                <p class="text-sm font-semibold text-nordic dark:text-white">Featured</p>
                <p class="text-xs text-gray-400">Highlight on homepage</p>
              </div>
            </div>
            <button type="button" @click="form.featured = !form.featured"
              :class="form.featured ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none">
              <span :class="form.featured ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200" />
            </button>
          </div>

          <!-- Active / Inactive Toggle -->
          <div class="flex items-center justify-between p-3 rounded-lg"
            :class="form.is_active ? 'bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800' : 'bg-gray-50 dark:bg-[#0f2420] border border-gray-200 dark:border-primary/20'">
            <div class="flex items-center gap-2">
              <span class="material-icons text-sm" :class="form.is_active ? 'text-emerald-600' : 'text-gray-400'">{{
                form.is_active ? 'visibility' : 'visibility_off' }}</span>
              <div>
                <p class="text-sm font-semibold text-nordic dark:text-white">{{ form.is_active ? 'Active' : 'Inactive' }}</p>
                <p class="text-xs text-gray-400">{{ form.is_active ? 'Visible on public site' : 'Hidden from public site' }}</p>
              </div>
            </div>
            <button type="button" @click="form.is_active = !form.is_active"
              :class="form.is_active ? 'bg-emerald-500' : 'bg-gray-300 dark:bg-gray-600'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none">
              <span :class="form.is_active ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200" />
            </button>
          </div>

        </div>
      </div>
    </div>

    <!-- Actions - Desktop uses header in page view, Mobile floating -->
    <div
      class="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-[#152e2a] border-t border-gray-200 dark:border-primary/20 shadow-xl z-40 flex gap-3">
      <button type="button" @click="cancel"
        class="flex-1 py-3 rounded-lg border border-gray-300 dark:border-primary/30 bg-white dark:bg-transparent text-nordic dark:text-gray-300 font-medium font-sf-pro">
        Cancel
      </button>
      <button type="submit" :disabled="loading || uploading"
        class="flex-1 py-3 rounded-lg bg-primary text-white font-medium flex justify-center items-center gap-2 disabled:opacity-50">
        <span v-if="loading || uploading" class="material-icons animate-spin">refresh</span>
        {{ (loading || uploading) ? 'Saving...' : 'Save' }}
      </button>
    </div>

    <!-- Hidden submit button for external trigger -->
    <button type="submit" ref="submitBtn" class="hidden">Submit</button>
  </form>
</template>

<script setup>
import { ref, watch, computed, onMounted, nextTick } from 'vue'

const props = defineProps({
  initialData: {
    type: Object,
    default: () => ({})
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['save', 'cancel'])

const supabase = useSupabaseClient()

const form = ref({
  title: '',
  price: '',
  price_suffix: '',
  status: 'sale',
  property_type_id: '',
  location: '',
  description: '',
  area: '',
  featured: false,
  is_active: true,
  latitude: null,
  longitude: null,
  year_built: '',
  beds: 3,
  baths: 2,
  parking: 1,
  amenities: [],
  images: [],
})

watch(() => props.initialData, (newVal) => {
  if (newVal && Object.keys(newVal).length > 0) {
    // Ensure nested objects/arrays are defined safely
    const safeData = {
      ...newVal,
      amenities: newVal.amenities || [],
      images: newVal.images || []
    }
    form.value = { ...form.value, ...safeData }
  }
}, { immediate: true, deep: true })

const propertyTypes = ref([])
const fetchTypes = async () => {
  const { data } = await supabase.from('property_types').select('id, name').order('name')
  propertyTypes.value = data || []

  if (!form.value.property_type_id && propertyTypes.value.length > 0) {
    form.value.property_type_id = propertyTypes.value[0].id
  }
}

const hasCoordinates = computed(() => {
  const lat = form.value.latitude
  const lng = form.value.longitude
  return lat !== null && lat !== '' && lng !== null && lng !== '' &&
    !isNaN(Number(lat)) && !isNaN(Number(lng))
})

onMounted(() => {
  fetchTypes()
})

const availableAmenities = [
  'Swimming Pool', 'Garden', 'Air Conditioning', 'Smart Home', 'Security System', 'Balcony', 'Gym'
]

const toggleAmenity = (amenity) => {
  // Ensure amenities is array
  if (!Array.isArray(form.value.amenities)) {
    form.value.amenities = []
  }

  const index = form.value.amenities.indexOf(amenity)
  if (index === -1) {
    form.value.amenities.push(amenity)
  } else {
    form.value.amenities.splice(index, 1)
  }
}

const adjustValue = (field, delta) => {
  const newVal = (parseInt(form.value[field]) || 0) + delta
  if (newVal >= 0) form.value[field] = newVal
}

// File Upload Logic
// Description formatting
const descriptionRef = ref(null)

const applyFormat = (type) => {
  const el = descriptionRef.value
  if (!el) return
  const start = el.selectionStart
  const end = el.selectionEnd
  const selected = form.value.description.substring(start, end)
  let replacement = selected

  if (type === 'bold') {
    replacement = `**${selected || 'bold text'}**`
  } else if (type === 'italic') {
    replacement = `*${selected || 'italic text'}*`
  } else if (type === 'list') {
    const lines = (selected || 'List item').split('\n')
    replacement = lines.map(l => `• ${l}`).join('\n')
  }

  form.value.description =
    form.value.description.substring(0, start) +
    replacement +
    form.value.description.substring(end)

  // Restore focus and selection
  nextTick(() => {
    el.focus()
    el.setSelectionRange(start, start + replacement.length)
  })
}

// File Upload Logic
const fileInput = ref(null)
const newImages = ref([])
const uploading = ref(false)
const isDragging = ref(false)

const triggerFileInput = () => fileInput.value?.click()

const processFiles = (files) => {
  Array.from(files).forEach(file => {
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) return
    const preview = URL.createObjectURL(file)
    newImages.value.push({ file, preview })
  })
}

const handleFileSelect = (event) => {
  processFiles(event.target.files || [])
}

const handleDrop = (event) => {
  isDragging.value = false
  processFiles(event.dataTransfer?.files || [])
}

const removeExistingImage = (idx) => {
  form.value.images.splice(idx, 1)
}

const removeNewImage = (idx) => {
  URL.revokeObjectURL(newImages.value[idx].preview)
  newImages.value.splice(idx, 1)
}

const submitBtn = ref(null)

// Expose a trigger method to allow parent to trigger save action
defineExpose({
  triggerSave: () => submitBtn.value?.click()
})

const uploadImages = async () => {
  const uploadedUrls = []
  for (const item of newImages.value) {
    const file = item.file
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${ext}`

    const { data, error } = await supabase.storage
      .from('property-images')
      .upload(fileName, file, { cacheControl: '3600', upsert: false })

    if (!error && data) {
      const { data: publicUrlData } = supabase.storage
        .from('property-images')
        .getPublicUrl(data.path)
      uploadedUrls.push(publicUrlData.publicUrl)
    }
  }
  return uploadedUrls
}

const cancel = () => emit('cancel')

const save = async () => {
  uploading.value = true
  try {
    const newlyUploadedUrls = await uploadImages()
    const finalImages = [...(form.value.images || []), ...newlyUploadedUrls]

    const payload = { ...form.value, images: finalImages }

    // Clean up payloads
    payload.price = Number(payload.price)
    if (payload.area) payload.area = Number(payload.area)
    if (payload.year_built) payload.year_built = Number(payload.year_built)
    // Convert lat/lng to number or null
    payload.latitude = (payload.latitude !== null && payload.latitude !== '') ? Number(payload.latitude) : null
    payload.longitude = (payload.longitude !== null && payload.longitude !== '') ? Number(payload.longitude) : null

    emit('save', payload)
  } catch (error) {
    console.error("Error saving property:", error)
    alert("Error uploading images")
  } finally {
    uploading.value = false
  }
}
</script>
