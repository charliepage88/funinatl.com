<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()

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
const endDate = ref(toISO(new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)))

const slug = computed(() => route.params.slug as string)

const { data: apiResponse, pending } = await useAsyncData(
  () => `category-events-${slug.value}-${startDate.value}-${endDate.value}`,
  () => $fetch<{ events: any[]; category: any }>(
    `/events/category/${slug.value}/${startDate.value}/${endDate.value}`,
    { baseURL: config.public.apiBase }
  ),
  { watch: [slug, startDate, endDate] }
)

const events = computed(() => flattenEvents(apiResponse.value?.events ?? []))
const category = computed(() => apiResponse.value?.category)

useSeoMeta({
  title: computed(() => `${category.value?.name ?? slug.value} Events – FunInATL`),
  description: computed(() => `Browse ${category.value?.name ?? slug.value} events in Atlanta, GA.`),
})

function onDateChange(start: string, end: string) {
  startDate.value = start
  endDate.value = end
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col gap-2">
      <nav class="breadcrumbs text-sm">
        <ul>
          <li><NuxtLink to="/">Home</NuxtLink></li>
          <li><NuxtLink to="/categories">Categories</NuxtLink></li>
          <li>{{ category?.name ?? slug }}</li>
        </ul>
      </nav>
      <h1 class="text-3xl font-bold">{{ category?.name ?? slug }} Events</h1>
      <p v-if="category?.description" class="opacity-60">{{ category.description }}</p>
    </div>

    <div class="flex flex-col sm:flex-row sm:items-center gap-4">
      <span class="font-medium text-sm opacity-70">Browse by date:</span>
      <DateRangePicker
        :start="startDate"
        :end="endDate"
        @change="onDateChange"
      />
    </div>

    <EventList :events="events" :loading="pending" />
  </div>
</template>
