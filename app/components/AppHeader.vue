<script setup lang="ts">
const auth = useAuthStore()
const router = useRouter()
const mobileOpen = ref(false)

async function logout() {
  auth.logout()
  await router.push('/')
}
</script>

<template>
  <header class="navbar bg-base-300 shadow-md sticky top-0 z-50">
    <div class="navbar-start">
      <div class="dropdown">
        <button
          class="btn btn-ghost lg:hidden"
          aria-label="Toggle menu"
          @click="mobileOpen = !mobileOpen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" />
          </svg>
        </button>
        <ul
          v-if="mobileOpen"
          class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
        >
          <li><NuxtLink to="/" @click="mobileOpen = false">Home</NuxtLink></li>
          <li><NuxtLink to="/search" @click="mobileOpen = false">Search</NuxtLink></li>
          <li><NuxtLink to="/categories" @click="mobileOpen = false">Categories</NuxtLink></li>
          <li><NuxtLink to="/events/submit" @click="mobileOpen = false">Submit Event</NuxtLink></li>
        </ul>
      </div>
      <NuxtLink to="/" class="btn btn-ghost text-xl font-bold text-primary">
        FunInATL
      </NuxtLink>
    </div>

    <div class="navbar-center hidden lg:flex">
      <ul class="menu menu-horizontal px-1 gap-1">
        <li><NuxtLink to="/" class="rounded-btn">Home</NuxtLink></li>
        <li><NuxtLink to="/search" class="rounded-btn">Search</NuxtLink></li>
        <li><NuxtLink to="/categories" class="rounded-btn">Categories</NuxtLink></li>
        <li><NuxtLink to="/events/submit" class="rounded-btn">Submit Event</NuxtLink></li>
      </ul>
    </div>

    <div class="navbar-end gap-2">
      <template v-if="auth.isAuthenticated">
        <div class="dropdown dropdown-end">
          <button tabindex="0" class="btn btn-ghost btn-circle avatar placeholder">
            <div class="bg-primary text-primary-content rounded-full w-9">
              <span class="text-sm">{{ auth.user?.name?.[0]?.toUpperCase() ?? 'U' }}</span>
            </div>
          </button>
          <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-40 z-[1]">
            <li class="menu-title px-2 py-1 text-xs opacity-60">{{ auth.user?.name }}</li>
            <li><button @click="logout">Logout</button></li>
          </ul>
        </div>
      </template>
      <template v-else>
        <NuxtLink to="/auth/login" class="btn btn-ghost btn-sm">Login</NuxtLink>
        <NuxtLink to="/auth/register" class="btn btn-primary btn-sm">Register</NuxtLink>
      </template>
    </div>
  </header>
</template>
