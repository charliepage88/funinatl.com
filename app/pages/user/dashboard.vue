<template>
  <div class="max-w-2xl mx-auto px-4 sm:px-6 py-16">
    <h1 class="text-3xl font-bold text-gray-900 mb-6">My Dashboard</h1>
    <div v-if="auth.user" class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div class="flex items-center gap-4 mb-6">
        <div class="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-2xl font-bold">
          {{ auth.user.name?.[0]?.toUpperCase() }}
        </div>
        <div>
          <p class="font-semibold text-gray-900 text-lg">{{ auth.user.name }}</p>
          <p class="text-gray-500 text-sm">{{ auth.user.email }}</p>
        </div>
      </div>
      <div class="flex gap-3">
        <NuxtLink to="/submit-event" class="bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
          Submit Event
        </NuxtLink>
        <button
          class="border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          @click="auth.logout(); navigateTo('/')"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ middleware: 'auth' })
useHead({ title: 'Dashboard – FunInATL' })
const auth = useAuthStore()
</script>
