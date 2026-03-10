<template>
  <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
    <!-- Hero Section -->
    <section class="py-12 md:py-16">
      <div class="max-w-3xl mx-auto text-center space-y-8">
        <h1 class="text-4xl md:text-5xl lg:text-6xl font-light text-nordic-dark leading-tight">
          {{ $t('home.hero.find_your') }} <span class="relative inline-block">
            <span class="relative z-10 font-medium">{{ $t('home.hero.sanctuary') }}</span>
            <span class="absolute bottom-2 left-0 w-full h-3 bg-mosque/20 -rotate-1 z-0"></span>
          </span>.
        </h1>

        <div class="relative group max-w-2xl mx-auto">
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span
              class="material-icons text-nordic-dark/60 text-2xl group-focus-within:text-mosque transition-colors">search</span>
          </div>
          <input type="text" v-model="searchQuery" @keyup.enter="triggerSearch"
            class="block w-full pl-12 pr-4 py-4 rounded-xl border-none bg-white text-nordic-dark shadow-soft placeholder-nordic-dark/40 focus:ring-2 focus:ring-mosque focus:bg-white transition-all text-lg"
            :placeholder="$t('home.hero.search_placeholder')">
          <button @click="triggerSearch"
            class="absolute inset-y-2 right-2 px-6 bg-mosque hover:bg-mosque/90 text-white font-medium rounded-lg transition-colors flex items-center justify-center shadow-lg shadow-mosque/20">
            {{ $t('home.hero.search_button') }}
          </button>
        </div>

        <div class="flex items-center justify-center gap-3 overflow-x-auto hide-scroll py-2 px-4 -mx-4">
          <button v-for="type in ['All', 'House', 'Apartment', 'Villa', 'Penthouse']" :key="type"
            @click="setQuickType(type)" :class="[
              'whitespace-nowrap px-5 py-2 rounded-full text-sm font-medium transition-all',
              activeFilters.property_type === type || (type === 'All' && !activeFilters.property_type)
                ? 'bg-nordic-dark text-white shadow-lg shadow-nordic-dark/10 hover:-translate-y-0.5'
                : 'bg-white border border-nordic-dark/5 text-nordic-dark/60 hover:text-nordic-dark hover:border-mosque/50 hover:bg-mosque/5'
            ]">
            {{ type }}
          </button>
          <div class="w-px h-6 bg-nordic-dark/10 mx-2"></div>
          <button @click="isFiltersOpen = true"
            class="whitespace-nowrap flex items-center gap-1 px-4 py-2 rounded-full text-nordic-dark font-medium text-sm hover:bg-black/5 transition-colors">
            <span class="material-icons text-base">tune</span> {{ $t('home.hero.filters') }}
          </button>
        </div>
      </div>
    </section>

    <!-- Featured Collections Section -->
    <section v-show="!hasActiveSearchOrFilter" class="mb-16">
      <div class="flex items-end justify-between mb-8">
        <div>
          <h2 class="text-2xl font-light text-nordic-dark">{{ $t('home.featured.title') }}</h2>
          <p class="text-nordic-dark/60 mt-1 text-sm">{{ $t('home.featured.subtitle') }}</p>
        </div>
        <a href="#"
          class="hidden sm:flex items-center gap-1 text-sm font-medium text-mosque hover:opacity-70 transition-opacity">
          {{ $t('home.featured.view_all') }} <span class="material-icons text-sm">arrow_forward</span>
        </a>
      </div>

      <!-- Loading state -->
      <div v-if="featuredPending" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div v-for="i in 4" :key="i" class="rounded-xl overflow-hidden bg-white shadow-soft animate-pulse">
          <div class="aspect-[4/3] bg-gray-200"></div>
          <div class="p-6 space-y-3">
            <div class="h-5 bg-gray-200 rounded w-3/4"></div>
            <div class="h-4 bg-gray-100 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <NuxtLink v-for="property in featuredProperties" :key="property.id" :to="`/properties/${property.slug}`"
          class="group relative rounded-xl overflow-hidden shadow-soft bg-white cursor-pointer block">
          <div class="aspect-[4/3] w-full overflow-hidden relative">
            <NuxtImg :src="property.images?.[0] || 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9'"
              :alt="property.title"
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
                  v-if="property.price_suffix" class="text-sm font-normal">{{ property.price_suffix }}</span></span>
            </div>

            <div class="flex items-center gap-6 mt-6 pt-6 border-t border-nordic-dark/5">
              <div class="flex items-center gap-2 text-nordic-dark/60 text-sm">
                <span class="material-icons text-lg">king_bed</span> {{ property.beds }} {{ $t('home.property.beds') }}
              </div>
              <div class="flex items-center gap-2 text-nordic-dark/60 text-sm">
                <span class="material-icons text-lg">bathtub</span> {{ property.baths }} {{ $t('home.property.baths') }}
              </div>
              <div class="flex items-center gap-2 text-nordic-dark/60 text-sm">
                <span class="material-icons text-lg">square_foot</span> {{ property.area }} {{ $t('home.property.area')
                }}
              </div>
            </div>
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- New in Market Section -->
    <section>
      <div class="flex items-end justify-between mb-8">
        <div>
          <h2 class="text-2xl font-light text-nordic-dark">{{ $t('home.new_market.title') }}</h2>
          <p class="text-nordic-dark/60 mt-1 text-sm">{{ $t('home.new_market.subtitle') }}</p>
        </div>
        <div class="hidden md:flex bg-white p-1 rounded-lg">
          <button @click="setQuickStatus('All')"
            :class="['px-4 py-1.5 rounded-md text-sm font-medium transition-all',
              !activeFilters.status || activeFilters.status === 'All' ? 'bg-nordic-dark text-white shadow-sm' : 'text-nordic-dark/60 hover:text-nordic-dark']">{{
                $t('home.new_market.all') }}</button>
          <button @click="setQuickStatus('sale')"
            :class="['px-4 py-1.5 rounded-md text-sm font-medium transition-all',
              activeFilters.status === 'sale' ? 'bg-nordic-dark text-white shadow-sm' : 'text-nordic-dark/60 hover:text-nordic-dark']">{{
                $t('home.new_market.buy') }}</button>
          <button @click="setQuickStatus('rent')"
            :class="['px-4 py-1.5 rounded-md text-sm font-medium transition-all',
              activeFilters.status === 'rent' ? 'bg-nordic-dark text-white shadow-sm' : 'text-nordic-dark/60 hover:text-nordic-dark']">{{
                $t('home.new_market.rent') }}</button>
        </div>
      </div>

      <!-- Loading skeleton -->
      <div v-if="propertiesPending" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="i in PAGE_LIMIT" :key="i" class="rounded-xl bg-white shadow-card animate-pulse">
          <div class="aspect-[4/3] bg-gray-200 rounded-t-xl"></div>
          <div class="p-4 space-y-2">
            <div class="h-4 bg-gray-200 rounded w-3/4"></div>
            <div class="h-3 bg-gray-100 rounded w-1/2"></div>
          </div>
        </div>
      </div>

      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <PropertyCard v-for="prop in newProperties" :key="prop.id" :property="prop" />
      </div>

      <!-- Pagination -->
      <div class="mt-12 flex items-center justify-center gap-4">
        <button :disabled="currentPage <= 1" @click="currentPage--"
          class="flex items-center gap-2 px-5 py-2.5 bg-white border border-nordic-dark/10 rounded-lg text-nordic-dark font-medium text-sm transition-all hover:border-mosque hover:text-mosque disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-nordic-dark/10 disabled:hover:text-nordic-dark">
          <span class="material-icons text-base">arrow_back</span>
          {{ $t('home.pagination.previous') }}
        </button>

        <div class="flex items-center gap-2">
          <span class="text-sm text-nordic-dark/60">{{ $t('home.pagination.page') }}</span>
          <span class="text-sm font-semibold text-nordic-dark">{{ currentPage }}</span>
          <span class="text-sm text-nordic-dark/60">{{ $t('home.property.of') }}</span>
          <span class="text-sm font-semibold text-nordic-dark">{{ totalPages }}</span>
        </div>

        <button :disabled="currentPage >= totalPages" @click="currentPage++"
          class="flex items-center gap-2 px-5 py-2.5 bg-white border border-nordic-dark/10 rounded-lg text-nordic-dark font-medium text-sm transition-all hover:border-mosque hover:text-mosque disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-nordic-dark/10 disabled:hover:text-nordic-dark">
          {{ $t('home.pagination.next') }}
          <span class="material-icons text-base">arrow_forward</span>
        </button>
      </div>

      <!-- Result count -->
      <p v-if="totalProperties > 0" class="text-center text-sm text-nordic-dark/40 mt-4">
        {{ $t('home.property.showing') }} {{ (currentPage - 1) * PAGE_LIMIT + 1 }}–{{ Math.min(currentPage * PAGE_LIMIT,
          totalProperties) }} {{ $t('home.property.of') }} {{
          totalProperties }} {{ $t('home.property.properties') }}
      </p>
    </section>
  </main>
  <SearchFiltersModal v-model="isFiltersOpen" @apply="onApplyFilters" />
</template>

<script setup lang="ts">
const { formatPrice } = useProperties()
const { t } = useI18n()

useHead({
  title: computed(() => `LuxeEstate | ${t('home.hero.sanctuary')}`)
})

const PAGE_LIMIT = 8

// --- Featured Properties (non-paginated) ---
const { data: featuredData, pending: featuredPending } = await useAsyncData(
  'featured-properties',
  () => $fetch('/api/properties', { query: { featured: 'true', limit: 2 } })
)

const featuredProperties = computed(() => {
  const data = (featuredData.value as any)?.data ?? []
  return data.slice(0, 2)
})

// --- New in Market (paginated) ---
const currentPage = ref(1)
const searchQuery = ref('')
const activeSearchQuery = ref('') // Used to trigger fetch only on submit
const isFiltersOpen = ref(false)
const route = useRoute()
const router = useRouter()

const activeFilters = ref<any>({
  property_type: route.query.property_type || undefined,
  status: route.query.status || undefined,
})

const hasActiveSearchOrFilter = computed(() => {
  const hasSearch = !!activeSearchQuery.value
  const hasFilters = Object.values(activeFilters.value).some((v: any) => Array.isArray(v) ? v.length > 0 : !!v)
  return hasSearch || hasFilters
})

let debounceTimer: ReturnType<typeof setTimeout> | null = null

const triggerSearch = () => {
  if (debounceTimer) clearTimeout(debounceTimer)
  activeSearchQuery.value = searchQuery.value
  currentPage.value = 1
}

watch(searchQuery, (val) => {
  if (debounceTimer) clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    activeSearchQuery.value = val
    currentPage.value = 1
  }, 400)
})

const setQuickType = (type: string) => {
  const newType = type === 'All' ? undefined : type
  activeFilters.value = { ...activeFilters.value, property_type: newType }
  router.push({ query: { ...route.query, property_type: newType } })
  currentPage.value = 1
}

const setQuickStatus = (status: string) => {
  const newStatus = status === 'All' ? undefined : status
  activeFilters.value = { ...activeFilters.value, status: newStatus }
  router.push({ query: { ...route.query, status: newStatus } })
  currentPage.value = 1
}

const onApplyFilters = (filters: any) => {
  activeFilters.value = filters
  if (filters.location) {
    searchQuery.value = filters.location
    activeSearchQuery.value = filters.location
  }
  currentPage.value = 1
}

const { data: propertiesData, pending: propertiesPending } = await useAsyncData(
  'new-properties',
  () => {
    const queryParams: any = {
      page: currentPage.value,
      limit: PAGE_LIMIT
    }

    // Only filter by featured when there's no active search — so search includes all properties
    if (!activeSearchQuery.value) {
      queryParams.featured = 'false'
    }

    if (activeSearchQuery.value) queryParams.search = activeSearchQuery.value
    if (activeFilters.value.property_type) queryParams.property_type = activeFilters.value.property_type
    if (activeFilters.value.type) queryParams.property_type = activeFilters.value.type // fallback if modal sets type
    if (activeFilters.value.status) queryParams.status = activeFilters.value.status
    if (activeFilters.value.beds) queryParams.beds = activeFilters.value.beds
    if (activeFilters.value.baths) queryParams.baths = activeFilters.value.baths
    if (activeFilters.value.amenities?.length) queryParams.amenities = activeFilters.value.amenities.join(',')

    return $fetch('/api/properties', { query: queryParams })
  },
  { watch: [currentPage, activeSearchQuery, activeFilters] }
)

const newProperties = computed(() => (propertiesData.value as any)?.data ?? [])
const totalProperties = computed(() => (propertiesData.value as any)?.total ?? 0)
const totalPages = computed(() => (propertiesData.value as any)?.totalPages ?? 1)
</script>
