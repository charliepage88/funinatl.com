<script setup lang="ts">
defineProps<{
  category: {
    slug: string
    name: string
    description?: string
    image_url?: string
    events_count?: number
  }
}>()
</script>

<template>
  <NuxtLink
    :to="`/categories/${category.slug}`"
    class="card bg-base-200 shadow hover:shadow-lg transition-shadow overflow-hidden group cursor-pointer"
  >
    <figure class="aspect-video overflow-hidden bg-base-300">
      <img
        v-if="category.image_url"
        :src="category.image_url"
        :alt="category.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-5xl opacity-20">🏷️</div>
    </figure>
    <div class="card-body p-4 gap-1">
      <h3 class="card-title text-base">{{ category.name }}</h3>
      <p v-if="category.description" class="text-sm opacity-60 line-clamp-2">{{ category.description }}</p>
      <p v-if="category.events_count !== undefined" class="text-xs opacity-50 mt-1">
        {{ category.events_count }} events
      </p>
    </div>
  </NuxtLink>
</template>
