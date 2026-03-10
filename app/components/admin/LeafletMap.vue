<template>
  <div ref="mapContainer" class="w-full h-full rounded-lg overflow-hidden" />
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps({
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  zoom: {
    type: Number,
    default: 15
  }
})

const mapContainer = ref(null)
let map = null
let marker = null

const initMap = async () => {
  if (!mapContainer.value) return

  // Dynamic import to avoid SSR issues
  const L = (await import('leaflet')).default
  await import('leaflet/dist/leaflet.css')

  // Fix default marker icon path broken by bundlers
  delete L.Icon.Default.prototype._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  })

  map = L.map(mapContainer.value, {
    center: [props.latitude, props.longitude],
    zoom: props.zoom,
    zoomControl: true,
    attributionControl: false,
    scrollWheelZoom: false,
  })

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(map)

  marker = L.marker([props.latitude, props.longitude]).addTo(map)
}

watch(
  () => [props.latitude, props.longitude],
  ([lat, lng]) => {
    if (!map || !marker) return
    const pos = [lat, lng]
    map.setView(pos, props.zoom)
    marker.setLatLng(pos)
  }
)

onMounted(() => {
  initMap()
})

onUnmounted(() => {
  if (map) {
    map.remove()
    map = null
    marker = null
  }
})
</script>
