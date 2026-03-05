<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
    <!-- Hero Section -->
    <section class="py-12 md:py-16">
      <div class="max-w-3xl mx-auto text-center space-y-8">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-light text-nordic-dark leading-tight">
          Find your <span class="relative inline-block">
            <span class="relative z-10 font-medium">sanctuary</span>
            <span class="absolute bottom-2 left-0 w-full h-3 bg-mosque/20 -rotate-1 z-0"></span>
          </span>.
        </h1>

        <div class="relative group max-w-2xl mx-auto">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span
              class="material-icons text-nordic-dark/60 text-2xl group-focus-within:text-mosque transition-colors">search</span>
          </div>
          <input type="text"
            class="block w-full pl-12 pr-4 py-4 rounded-xl border-none bg-white text-nordic-dark shadow-soft placeholder-nordic-dark/40 focus:ring-2 focus:ring-mosque focus:bg-white transition-all text-lg"
            placeholder="Search by city, neighborhood, or address...">
          <button
            class="absolute inset-y-2 right-2 px-6 bg-mosque hover:bg-mosque/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-mosque/20">
            Search
          </button>
        </div>

        <div class="flex items-center justify-center gap-3 overflow-x-auto hide-scroll py-2 px-4 -mx-4">
          <button
            class="whitespace-nowrap px-5 py-2 rounded-full bg-nordic-dark text-white text-sm font-medium shadow-lg shadow-nordic-dark/10 transition-transform hover:-translate-y-0.5">
            All
          </button>
          <button
            class="whitespace-nowrap px-5 py-2 rounded-full bg-white border border-nordic-dark/5 text-nordic-dark/60 hover:text-nordic-dark hover:border-mosque/50 text-sm font-medium transition-all hover:bg-mosque/5">
            House
          </button>
          <button
            class="whitespace-nowrap px-5 py-2 rounded-full bg-white border border-nordic-dark/5 text-nordic-dark/60 hover:text-nordic-dark hover:border-mosque/50 text-sm font-medium transition-all hover:bg-mosque/5">
            Apartment
          </button>
          <button
            class="whitespace-nowrap px-5 py-2 rounded-full bg-white border border-nordic-dark/5 text-nordic-dark/60 hover:text-nordic-dark hover:border-mosque/50 text-sm font-medium transition-all hover:bg-mosque/5">
            Villa
          </button>
          <button
            class="whitespace-nowrap px-5 py-2 rounded-full bg-white border border-nordic-dark/5 text-nordic-dark/60 hover:text-nordic-dark hover:border-mosque/50 text-sm font-medium transition-all hover:bg-mosque/5">
            Penthouse
          </button>
          <div class="w-px h-6 bg-nordic-dark/10 mx-2"></div>
          <button
            class="whitespace-nowrap flex items-center gap-1 px-4 py-2 rounded-full text-nordic-dark font-medium text-sm hover:bg-black/5 transition-colors">
            <span class="material-icons text-base">tune</span> Filters
          </button>
        </div>
      </div>
    </section>

    <!-- Featured Collections Section -->
    <section class="mb-16">
      <div class="flex items-end justify-between mb-8">
        <div>
          <h2 class="text-2xl font-light text-nordic-dark">Featured Collections</h2>
          <p class="text-nordic-dark/60 mt-1 text-sm">Curated properties for the discerning eye.</p>
        </div>
        <a href="#"
          class="hidden sm:flex items-center gap-1 text-sm font-medium text-mosque hover:opacity-70 transition-opacity">
          View all <span class="material-icons text-sm">arrow_forward</span>
        </a>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div v-for="property in featuredProperties" :key="property.id"
          class="group relative rounded-xl overflow-hidden shadow-soft bg-white cursor-pointer">
          <div class="aspect-[4/3] w-full overflow-hidden relative">
            <NuxtImg :src="property.image" :alt="property.title"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              loading="lazy" />
            <div v-if="property.tags && property.tags.length"
              class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-nordic-dark">
              {{ property.tags[0] }}
            </div>
            <button
              class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-nordic-dark hover:bg-mosque hover:text-white transition-all">
              <span class="material-icons text-xl">favorite_border</span>
            </button>
            <div class="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent opacity-60">
            </div>
          </div>

          <div class="p-6 relative">
            <div class="flex justify-between items-start mb-2">
              <div>
                <h3 class="text-xl font-medium text-nordic-dark group-hover:text-mosque transition-colors">{{
                  property.title }}</h3>
                <p class="text-nordic-dark/60 text-sm flex items-center gap-1 mt-1">
                  <span class="material-icons text-sm">place</span> {{ property.location }}
                </p>
              </div>
              <span class="text-xl font-semibold text-mosque">{{ formatPrice(property.price) }}<span
                  v-if="property.priceSuffix" class="text-sm font-normal">{{ property.priceSuffix }}</span></span>
            </div>

            <div class="flex items-center gap-6 mt-6 pt-6 border-t border-nordic-dark/5">
              <div class="flex items-center gap-2 text-nordic-dark/60 text-sm">
                <span class="material-icons text-lg">king_bed</span> {{ property.beds }} Beds
              </div>
              <div class="flex items-center gap-2 text-nordic-dark/60 text-sm">
                <span class="material-icons text-lg">bathtub</span> {{ property.baths }} Baths
              </div>
              <div class="flex items-center gap-2 text-nordic-dark/60 text-sm">
                <span class="material-icons text-lg">square_foot</span> {{ property.area }} m²
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- New in Market Section -->
    <section>
      <div class="flex items-end justify-between mb-8">
        <div>
          <h2 class="text-2xl font-light text-nordic-dark">New in Market</h2>
          <p class="text-nordic-dark/60 mt-1 text-sm">Fresh opportunities added this week.</p>
        </div>
        <div class="hidden md:flex bg-white p-1 rounded-lg">
          <button class="px-4 py-1.5 rounded-md text-sm font-medium bg-nordic-dark text-white shadow-sm">All</button>
          <button
            class="px-4 py-1.5 rounded-md text-sm font-medium text-nordic-dark/60 hover:text-nordic-dark">Buy</button>
          <button
            class="px-4 py-1.5 rounded-md text-sm font-medium text-nordic-dark/60 hover:text-nordic-dark">Rent</button>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <PropertyCard v-for="prop in newProperties" :key="prop.id" :property="prop" />
      </div>

      <div class="mt-12 text-center">
        <button
          class="px-8 py-3 bg-white border border-nordic-dark/10 hover:border-mosque hover:text-mosque text-nordic-dark font-medium rounded-lg transition-all hover:shadow-md">
          Load more properties
        </button>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
const { featuredProperties, newProperties, formatPrice } = useProperties()
</script>
