<script setup lang="ts">
defineProps<{
  events: any[]
  loading?: boolean
}>()
</script>

<template>
  <div>
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <div v-for="i in 8" :key="i" class="card bg-base-200 animate-pulse overflow-hidden">
        <div class="aspect-video bg-base-300" />
        <div class="card-body p-4 gap-3">
          <div class="h-3 bg-base-300 rounded w-1/3" />
          <div class="h-4 bg-base-300 rounded w-full" />
          <div class="h-4 bg-base-300 rounded w-2/3" />
          <div class="h-3 bg-base-300 rounded w-1/2" />
        </div>
      </div>
    </div>

    <div v-else-if="events.length === 0" class="text-center py-16 opacity-50">
      <p class="text-4xl mb-3">🎭</p>
      <p class="text-lg">No events found for this period.</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      <EventCard v-for="event in events" :key="event.slug" :event="event" />
    </div>
  </div>
</template>
