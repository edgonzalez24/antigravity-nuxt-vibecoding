<template>
  <div
    class="bg-background-light text-nordic-dark font-display antialiased selection:bg-mosque selection:text-white min-h-screen">
    <nav class="sticky top-0 z-50 bg-background-light/95 backdrop-blur-md border-b border-nordic-dark/10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center h-20">
          <NuxtLink to="/" class="flex-shrink-0 flex items-center gap-2 cursor-pointer">
            <div class="w-8 h-8 rounded-lg bg-nordic-dark flex items-center justify-center">
              <span class="material-icons text-white text-lg">apartment</span>
            </div>
            <span class="text-xl font-semibold tracking-tight text-nordic-dark">LuxeEstate</span>
          </NuxtLink>

          <div class="hidden md:flex items-center space-x-8">
            <a href="#" class="text-mosque font-medium text-sm border-b-2 border-mosque px-1 py-1">{{ $t('nav.buy')
              }}</a>
            <a href="#"
              class="text-nordic-dark/70 hover:text-nordic-dark font-medium text-sm hover:border-b-2 hover:border-nordic-dark/20 px-1 py-1 transition-all">{{
                $t('nav.rent') }}</a>
            <a href="#"
              class="text-nordic-dark/70 hover:text-nordic-dark font-medium text-sm hover:border-b-2 hover:border-nordic-dark/20 px-1 py-1 transition-all">{{
                $t('nav.sell') }}</a>
            <a href="#"
              class="text-nordic-dark/70 hover:text-nordic-dark font-medium text-sm hover:border-b-2 hover:border-nordic-dark/20 px-1 py-1 transition-all">{{
                $t('nav.saved_homes') }}</a>
          </div>

          <div class="flex items-center space-x-6">
            <LanguageSelector />
            <button class="text-nordic-dark hover:text-mosque transition-colors">
              <span class="material-icons">search</span>
            </button>
            <button class="text-nordic-dark hover:text-mosque transition-colors relative">
              <span class="material-icons">notifications_none</span>
              <span
                class="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-background-light"></span>
            </button>
            <button class="flex items-center gap-2 pl-2 border-l border-nordic-dark/10 ml-2">
              <div
                class="w-9 h-9 rounded-full bg-gray-200 overflow-hidden ring-2 ring-transparent hover:ring-mosque transition-all">
                <NuxtImg
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCAWhQZ663Bd08kmzjbOPmUk4UIxYooNONShMEFXLR-DtmVi6Oz-TiaY77SPwFk7g0OobkeZEOMvt6v29mSOD0Xm2g95WbBG3ZjWXmiABOUwGU0LOySRfVDo-JTXQ0-gtwjWxbmue0qDm91m-zEOEZwAW6iRFB1qC1bAU-wkjxm67Sbztq8w7srHkFT9bVEC86qG-FzhOBTomhAurNRmx9l8Yfqabk328NfdKuVLckgCdaPsNFE3yN65MeoRi05GA_gXIMwG4YDIeA"
                  alt="Profile" class="w-full h-full object-cover" width="36" height="36" />
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>

    <slot />
  </div>
</template>

<script setup lang="ts">
useHead({
  link: [
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap' }
  ]
})
</script>
