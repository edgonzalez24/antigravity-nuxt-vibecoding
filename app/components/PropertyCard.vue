<template>
  <NuxtLink :to="`/properties/${property.slug}`"
    class="bg-white rounded-xl overflow-hidden shadow-card hover:shadow-soft transition-all duration-300 group cursor-pointer h-full flex flex-col block">
    <div class="relative aspect-[4/3] overflow-hidden">
      <NuxtImg :src="property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'"
        :alt="property.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        loading="lazy" />
      <button
        class="absolute top-3 right-3 w-9 h-9 flex items-center justify-center bg-white/90 rounded-full hover:bg-mosque hover:text-white transition-colors text-nordic-dark">
        <span class="material-icons text-lg">favorite_border</span>
      </button>
      <div v-if="property.tags && property.tags.length"
        class="absolute bottom-3 left-3 text-white text-xs font-bold px-2 py-1 rounded"
        :class="property.status === 'rent' ? 'bg-mosque/90' : 'bg-nordic-dark/90'">
        {{ property.tags[0] }}
      </div>
    </div>

    <div class="p-4 flex flex-col flex-grow">
      <div class="flex justify-between items-baseline mb-2">
        <h3 class="font-bold text-lg text-nordic-dark">
          {{ formatPrice(property.price) }}<span v-if="property.price_suffix"
            class="text-sm font-normal text-nordic-dark/60">{{ property.price_suffix }}</span>
        </h3>
      </div>
      <h4 class="text-nordic-dark font-medium truncate mb-1">{{ property.title }}</h4>
      <p class="text-nordic-dark/60 text-xs mb-4">{{ property.location }}</p>

      <div class="mt-auto flex items-center justify-between pt-3 border-t border-gray-100">
        <div class="flex items-center gap-1 text-nordic-dark/60 text-xs">
          <span class="material-icons text-sm text-mosque/80">king_bed</span> {{ property.beds }}
        </div>
        <div class="flex items-center gap-1 text-nordic-dark/60 text-xs">
          <span class="material-icons text-sm text-mosque/80">bathtub</span> {{ property.baths }}
        </div>
        <div class="flex items-center gap-1 text-nordic-dark/60 text-xs">
          <span class="material-icons text-sm text-mosque/80">square_foot</span> {{ property.area }} {{
            $t('home.property.area') }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { Property } from '~/composables/useProperties'

const props = defineProps<{
  property: Property
}>()

const { formatPrice } = useProperties()
</script>
