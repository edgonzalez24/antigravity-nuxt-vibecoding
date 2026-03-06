<template>
  <main v-if="property" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <!-- Left Column: Gallery & Details -->
      <div class="lg:col-span-2 space-y-8">
        
        <!-- Image Gallery -->
        <div class="space-y-4">
          <div class="relative rounded-2xl overflow-hidden aspect-[16/9]">
            <NuxtImg :src="property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'" :alt="property.title" class="w-full h-full object-cover" />
            <div class="absolute top-4 left-4 flex gap-2">
              <span v-if="property.featured" class="bg-mosque text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Premium</span>
              <span class="bg-white/90 text-nordic-dark text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">New</span>
            </div>
            <button class="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-nordic-dark px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors">
              <span class="material-icons text-sm">grid_view</span> View All Photos
            </button>
          </div>
          
          <div v-if="property.images && property.images.length > 1" class="grid grid-cols-4 gap-4">
            <div v-for="(img, idx) in property.images.slice(1, 5)" :key="idx" class="relative rounded-xl overflow-hidden aspect-[4/3]">
              <NuxtImg :src="img" :alt="`${property.title} thumbnail ${idx + 2}`" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        <!-- Property Features -->
        <section class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold text-nordic-dark mb-6">Property Features</h2>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="bg-background-light rounded-xl p-4 flex flex-col items-center justify-center text-center">
              <span class="material-icons text-mosque mb-2">square_foot</span>
              <span class="font-bold text-xl text-nordic-dark">{{ property.area }}</span>
              <span class="text-xs text-nordic-dark/60 uppercase tracking-wide">Square Meters</span>
            </div>
            <div class="bg-background-light rounded-xl p-4 flex flex-col items-center justify-center text-center">
              <span class="material-icons text-mosque mb-2">king_bed</span>
              <span class="font-bold text-xl text-nordic-dark">{{ property.beds }}</span>
              <span class="text-xs text-nordic-dark/60 uppercase tracking-wide">Bedrooms</span>
            </div>
            <div class="bg-background-light rounded-xl p-4 flex flex-col items-center justify-center text-center">
              <span class="material-icons text-mosque mb-2">shower</span>
              <span class="font-bold text-xl text-nordic-dark">{{ property.baths }}</span>
              <span class="text-xs text-nordic-dark/60 uppercase tracking-wide">Bathrooms</span>
            </div>
            <div class="bg-background-light rounded-xl p-4 flex flex-col items-center justify-center text-center">
              <span class="material-icons text-mosque mb-2">directions_car</span>
              <span class="font-bold text-xl text-nordic-dark">2</span>
              <span class="text-xs text-nordic-dark/60 uppercase tracking-wide">Garage</span>
            </div>
          </div>
        </section>

        <!-- About this home -->
        <section class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 class="text-xl font-bold text-nordic-dark mb-4">About this home</h2>
          <div class="text-nordic-dark/80 text-sm leading-relaxed space-y-4">
            <p v-if="property.description">{{ property.description }}</p>
            <p v-else>
              Experience modern luxury in this architecturally stunning home located in the heart of {{ property.location }}. Designed with an emphasis on indoor-outdoor living, the residence features floor-to-ceiling glass walls that flood the interiors with natural light.
              <br><br>
              The open-concept kitchen is equipped with top-of-the-line appliances and custom cabinetry, perfect for culinary enthusiasts. Retreat to the primary suite, a sanctuary of relaxation with a spa-inspired bath and private balcony.
            </p>
          </div>
          <button class="text-mosque font-medium text-sm mt-4 flex items-center gap-1 hover:underline">
            Read more <span class="material-icons text-sm">arrow_forward</span>
          </button>
        </section>

        <!-- Amenities -->
        <section class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100" v-if="property.amenities && property.amenities.length || defaultAmenities.length">
          <h2 class="text-xl font-bold text-nordic-dark mb-6">Amenities</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="(amenity, index) in (property.amenities?.length ? property.amenities : defaultAmenities)" :key="index" class="flex items-center gap-3">
              <div class="w-5 h-5 rounded-full bg-mosque/20 flex items-center justify-center text-mosque">
                <span class="material-symbols-outlined text-xs font-bold">check</span>
              </div>
              <span class="text-nordic-dark/80 text-sm">{{ amenity }}</span>
            </div>
          </div>
        </section>

        <!-- Estimated Payment Banner -->
        <div class="bg-mosque/5 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 border border-mosque/10">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-mosque">
              <span class="material-icons">calculate</span>
            </div>
            <div>
              <h4 class="font-bold text-nordic-dark">Estimated Payment</h4>
              <p class="text-sm text-nordic-dark/70">Starting from <strong class="text-mosque">$5,430/mo</strong> with 20% down</p>
            </div>
          </div>
          <button class="bg-white text-nordic-dark font-medium px-6 py-2.5 rounded-xl shadow-sm hover:shadow-md transition-shadow text-sm border border-gray-200">
            Calculate Mortgage
          </button>
        </div>

      </div>

      <!-- Right Column: Sidebar -->
      <div class="lg:col-span-1">
        <div class="sticky top-28 space-y-6">
          
          <!-- Price and Location -->
          <div class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h1 class="text-4xl font-light text-nordic-dark mb-2">{{ formatPrice(property.price) }}</h1>
            <p class="text-nordic-dark/70 flex items-center gap-1 text-sm mb-6">
              <span class="material-icons text-mosque text-lg">location_on</span>
              {{ property.location }}
            </p>

            <!-- Agent Info -->
            <div class="flex items-center justify-between pt-6 border-t border-gray-100 mb-6">
              <div class="flex items-center gap-3">
                <NuxtImg 
                  :src="property.agent?.avatar || 'https://i.pravatar.cc/150?img=5'" 
                  :alt="property.agent?.name || 'Agent'" 
                  class="w-12 h-12 rounded-full object-cover" 
                />
                <div>
                  <h4 class="font-bold text-nordic-dark text-sm">{{ property.agent?.name || 'Sarah Jenkins' }}</h4>
                  <p class="text-xs text-nordic-dark/60 flex items-center gap-1">
                    <span class="material-icons text-[10px] text-mosque">star</span>
                    {{ property.agent?.title || 'Top Rated Agent' }}
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-2">
                <button class="w-8 h-8 rounded-full bg-background-light text-nordic-dark hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <span class="material-icons text-sm">chat_bubble_outline</span>
                </button>
                <button class="w-8 h-8 rounded-full bg-background-light text-nordic-dark hover:bg-gray-200 flex items-center justify-center transition-colors">
                  <span class="material-icons text-sm">call</span>
                </button>
              </div>
            </div>

            <div class="space-y-3">
              <button class="w-full bg-mosque hover:bg-mosque/90 text-white font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span class="material-icons text-sm">calendar_month</span> Schedule Visit
              </button>
              <button class="w-full bg-white border border-gray-200 hover:border-gray-300 text-nordic-dark font-medium py-3 rounded-xl flex items-center justify-center gap-2 transition-colors">
                <span class="material-icons text-sm">mail_outline</span> Contact Agent
              </button>
            </div>
          </div>

          <!-- Map Container -->
          <div class="bg-white rounded-2xl p-2 shadow-sm border border-gray-100 overflow-hidden relative">
            <div class="h-64 w-full rounded-xl bg-gray-100 relative" id="map">
              <ClientOnly preserve-state>
                <div v-if="!mapLoaded" class="absolute inset-0 flex items-center justify-center bg-gray-50">
                   <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-mosque"></div>
                </div>
              </ClientOnly>
            </div>
            <button class="absolute bottom-4 right-4 bg-white/90 backdrop-blur text-nordic-dark text-xs font-semibold px-3 py-1.5 rounded shadow-sm">
              View on Map
            </button>
          </div>

        </div>
      </div>
      
    </div>
  </main>

  <div v-else-if="pending" class="min-h-screen flex items-center justify-center">
    <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-mosque"></div>
  </div>

  <div v-else class="min-h-screen flex flex-col items-center justify-center space-y-4">
    <h1 class="text-2xl font-bold text-nordic-dark">Property not found</h1>
    <NuxtLink to="/" class="text-mosque hover:underline">Return to Home</NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useProperties } from '~/composables/useProperties'
import type { Property } from '~/composables/useProperties'

const route = useRoute()
const { formatPrice } = useProperties()

const { data: property, pending, error } = await useFetch<Property>(`/api/properties/${route.params.slug}`)

const defaultAmenities = [
  'Smart Home System',
  'Swimming Pool',
  'Central Heating & Cooling',
  'Electric Vehicle Charging',
  'Private Gym',
  'Wine Cellar'
]

useSeoMeta({
  title: () => property.value ? `${property.value.title} | LuxeEstate` : 'Property | LuxeEstate',
  description: () => property.value?.description || 'View details for this amazing property.',
})

// Leaflet Map logic
const mapLoaded = ref(false)
let mapInstance: any = null

onMounted(async () => {
  if (import.meta.client) {
    if (property.value) {
      await initMap()
    }
  }
})

watch(property, async (newVal) => {
  if (import.meta.client && newVal && !mapInstance) {
    await initMap()
  }
})

const initMap = async () => {
  try {
    // Dynamic import to avoid SSR issues
    const L = (await import('leaflet')).default
    await import('leaflet/dist/leaflet.css')

    // Wait for next tick so DOM is ready
    await nextTick()

    const mapElement = document.getElementById('map')
    if (!mapElement) return

    // Fake coordinates for demo based on location string or generic
    const coords: [number, number] = [37.4419, -122.1430] // Palo Alto default

    mapInstance = L.map('map', {
      zoomControl: false,
      attributionControl: false
    }).setView(coords, 13)

    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(mapInstance)

    // Custom marker icon
    const customIcon = L.divIcon({
      html: `
        <div class="w-12 h-12 relative flex items-center justify-center">
          <svg viewBox="0 0 24 24" class="w-full h-full text-red-500 drop-shadow-md" fill="currentColor">
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/>
          </svg>
          <div class="absolute inset-0 flex items-center justify-center mb-2">
            <span class="material-icons text-white text-[12px]">home</span>
          </div>
        </div>
      `,
      className: '',
      iconSize: [48, 48],
      iconAnchor: [24, 48]
    })

    L.marker(coords, { icon: customIcon }).addTo(mapInstance)
    mapLoaded.value = true
  } catch (e) {
    console.error('Failed to initialize map', e)
  }
}

onUnmounted(() => {
  if (mapInstance && import.meta.client) {
    mapInstance.remove()
  }
})
</script>
