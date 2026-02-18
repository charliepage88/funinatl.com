<template>
  <nav class="bg-[#222] text-white sticky top-0 z-50 shadow-md" role="navigation" aria-label="main navigation">
    <div class="max-w-full px-4">
      <div class="flex items-center justify-between navbar-height">
        <!-- Brand: logo image + name, matching original -->
        <NuxtLink to="/" class="flex items-center gap-2 text-white no-underline shrink-0 relative" aria-label="Homepage">
          <img :src="logoSrc" alt="FunInATL" class="hidden sm:block" style="max-height: 90px;" />
          <span class="navbar-brand-name font-bold tracking-tight absolute" style="left: 30px; font-size: 2rem;">FunInATL</span>
        </NuxtLink>

        <!-- Desktop nav links -->
        <div class="hidden md:flex items-center gap-1">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors"
            active-class="text-white bg-white/10"
          >
            {{ link.label }}
          </NuxtLink>

          <template v-if="auth.isLoggedIn">
            <NuxtLink to="/user/dashboard" class="px-4 py-2 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 rounded transition-colors">
              Dashboard
            </NuxtLink>
            <button class="ml-2 px-4 py-2 text-sm font-medium bg-danger hover:opacity-90 text-white rounded transition-opacity" @click="auth.logout()">
              Logout
            </button>
          </template>
        </div>

        <!-- Mobile burger -->
        <button class="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 cursor-pointer" aria-label="Toggle menu" @click="menuOpen = !menuOpen">
          <span v-for="i in 3" :key="i" class="block w-6 h-0.5 bg-white transition-all" />
        </button>
      </div>

      <!-- Mobile dropdown -->
      <div v-if="menuOpen" class="md:hidden pb-4 flex flex-col border-t border-white/10 mt-1">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="px-4 py-3 text-sm font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
const auth = useAuthStore()
auth.init()
const menuOpen = ref(false)

// Use a runtime variable so Vite doesn't try to bundle the image
const logoSrc = '/images/funinatl-bg.png'

const navLinks = [
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/submit-event', label: 'Submit Event' },
  { to: '/subscribe', label: 'Subscribe' },
]
</script>

<style scoped>
.navbar-height {
  height: 110px;
}

.navbar-brand-name {
  top: 40px;
}

@media (max-width: 768px) {
  .navbar-height {
    height: 80px !important;
  }
  .navbar-brand-name {
    font-size: 1.5rem !important;
    top: 28px;
  }
  img {
    width: 300px;
  }
}
</style>
