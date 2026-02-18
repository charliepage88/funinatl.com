<script setup lang="ts">
interface EventCategory {
  name: string
  slug: string
}

interface EventLocation {
  name: string
  slug: string
}

interface Event {
  slug: string
  name: string
  start_date: string
  start_time?: string
  photo?: string
  category?: EventCategory
  location?: EventLocation
  is_family_friendly?: boolean
}

defineProps<{ event: Event }>()

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  })
}
</script>

<template>
  <NuxtLink :to="`/events/${event.slug}`" class="card bg-base-200 shadow hover:shadow-lg transition-shadow overflow-hidden group">
    <figure class="aspect-video overflow-hidden bg-base-300">
      <img
        v-if="event.photo"
        :src="event.photo"
        :alt="event.name"
        class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        loading="lazy"
      />
      <div v-else class="w-full h-full flex items-center justify-center text-4xl opacity-20">🎉</div>
    </figure>
    <div class="card-body p-4 gap-2">
      <div class="flex flex-wrap gap-1">
        <span v-if="event.category" class="badge badge-primary badge-sm">{{ event.category.name }}</span>
        <span v-if="event.is_family_friendly" class="badge badge-success badge-sm">Family</span>
      </div>
      <h3 class="card-title text-base leading-snug line-clamp-2">{{ event.name }}</h3>
      <div class="text-sm opacity-60 flex flex-col gap-0.5">
        <span>📅 {{ formatDate(event.start_date) }}<span v-if="event.start_time"> · {{ event.start_time }}</span></span>
        <span v-if="event.location">📍 {{ event.location.name }}</span>
      </div>
    </div>
  </NuxtLink>
</template>
