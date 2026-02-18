<script setup lang="ts">
useSeoMeta({
  title: 'FunInATL – Things to Do in Atlanta',
  description: 'Discover the best events, concerts, festivals, and activities happening in Atlanta, GA.',
  ogTitle: 'FunInATL – Things to Do in Atlanta',
  ogDescription: 'Discover the best events, concerts, festivals, and activities happening in Atlanta, GA.',
})

const config = useRuntimeConfig()

// API returns events grouped: [{ label, days: [{ date, events: [] }] }]
// Flatten to a single array for grid display
function flattenEvents(grouped: any[]): any[] {
  if (!Array.isArray(grouped)) return []
  return grouped.flatMap(group =>
    (group.days ?? []).flatMap((day: any) => day.events ?? [])
  )
}

function toISO(d: Date) {
  return d.toISOString().slice(0, 10)
}

const today = new Date()
const startDate = ref(toISO(today))
const endDate = ref(toISO(new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000)))

const { data: apiResponse, pending } = await useAsyncData(
  () => `events-${startDate.value}-${endDate.value}`,
  () => $fetch<{ events: any[]; categories: any[]; locations: any[] }>(
    `/events/index/${startDate.value}/${endDate.value}`,
    { baseURL: config.public.apiBase }
  )
)

const events = computed(() => flattenEvents(apiResponse.value?.events ?? []))
const categories = computed(() => apiResponse.value?.categories ?? [])

function onDateChange(start: string, end: string) {
  startDate.value = start
  endDate.value = end
}
</script>

<template>
  <div class="flex flex-col gap-8">
    <section class="flex flex-col gap-2">
      <h1 class="text-3xl font-bold">Atlanta Events</h1>
      <p class="opacity-60">Find fun things to do in Atlanta, GA</p>
    </section>

    <!-- Category chips -->
    <section v-if="categories.length" class="flex flex-wrap gap-2">
      <NuxtLink
        v-for="cat in categories"
        :key="cat.slug"
        :to="`/categories/${cat.slug}`"
        class="badge badge-lg badge-outline hover:badge-primary transition-colors cursor-pointer"
      >
        {{ cat.name }}
      </NuxtLink>
    </section>

    <!-- Date range -->
    <section class="flex flex-col sm:flex-row sm:items-center gap-4">
      <span class="font-medium text-sm opacity-70">Browse by date:</span>
      <DateRangePicker
        :start="startDate"
        :end="endDate"
        @change="onDateChange"
      />
    </section>

    <!-- Event listing -->
    <EventList :events="events" :loading="pending" />
  </div>
</template>
