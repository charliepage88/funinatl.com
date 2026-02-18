<script setup lang="ts">
useSeoMeta({
  title: 'Event Categories – FunInATL',
  description: 'Browse Atlanta events by category.',
})

const config = useRuntimeConfig()

const { data: categoriesResponse, pending } = await useAsyncData(
  'categories-page',
  () => $fetch<{ categories: any[] }>('/categories', { baseURL: config.public.apiBase }),
)
const categories = computed(() => categoriesResponse.value?.categories ?? [])
</script>

<template>
  <div class="flex flex-col gap-6">
    <h1 class="text-3xl font-bold">Event Categories</h1>

    <div v-if="pending" class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <div v-for="i in 8" :key="i" class="card bg-base-200 animate-pulse overflow-hidden">
        <div class="aspect-video bg-base-300" />
        <div class="card-body p-4 gap-2">
          <div class="h-4 bg-base-300 rounded w-2/3" />
        </div>
      </div>
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      <CategoryCard v-for="cat in categories" :key="cat.slug" :category="cat" />
    </div>
  </div>
</template>
