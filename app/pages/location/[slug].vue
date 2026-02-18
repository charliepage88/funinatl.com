<template>
  <div v-if="location">
    <DateRangePicker :start="dateStart" :end="dateEnd" @change="onDateChange" />

    <div class="flex justify-center pt-6 pb-4 px-4">
      <div class="flex flex-wrap items-center gap-6 justify-center max-w-2xl w-full">
        <!-- Photo -->
        <div v-if="location.thumb_medium || location.photo" class="shrink-0">
          <img
            :src="location.thumb_medium || location.photo"
            :alt="location.name"
            class="w-32 h-32 object-cover rounded"
          />
        </div>

        <!-- Name + address -->
        <div class="text-center">
          <h1 class="text-4xl font-semibold text-gray-800 capitalize">{{ location.name }}</h1>
          <a
            v-if="location.address"
            :href="mapsUrl"
            target="_blank"
            rel="noopener"
            class="block mt-2 text-info hover:underline text-sm"
          >
            {{ location.address }}<br />
            {{ location.city }}<template v-if="location.state">, {{ location.state }}</template>
            {{ location.zip }}
          </a>
        </div>

        <!-- Website button -->
        <div v-if="location.website" class="shrink-0">
          <a
            :href="location.website"
            target="_blank"
            rel="noopener"
            class="flex items-center gap-2 bg-indigo hover:opacity-90 text-white font-semibold px-5 py-3 rounded transition-opacity"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            Website
          </a>
        </div>
      </div>
    </div>

    <div class="container mx-auto px-4 lg:px-16 pt-0 pb-10">
      <div v-if="pending" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-info" />
      </div>
      <EventList v-else :groups="data?.events || []" />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = computed(() => route.params.slug as string)
const { get } = useApi()

const DEFAULT_START = '2021-01-01'
const DEFAULT_END = '2021-12-31'
// defaults set above
const fmt = (d: Date) => d.toISOString().split('T')[0]

const dateStart = ref(DEFAULT_START)
const dateEnd = ref(DEFAULT_END)

const { data, pending } = await useAsyncData(
  `location-${slug.value}`,
  () => get<{ events: any[]; location: any }>(`/events/location/${slug.value}/${dateStart.value}/${dateEnd.value}`),
  { watch: [dateStart, dateEnd] }
)

const location = computed(() => data.value?.location)

const mapsUrl = computed(() => {
  if (!location.value?.address) return '#'
  const q = [location.value.address, location.value.city, location.value.state, location.value.zip]
    .filter(Boolean).join(', ').replace(/ /g, '+')
  return `https://www.google.com/maps/place/${q}`
})

useHead(() => ({
  title: location.value ? `Atlanta Events – ${location.value.name} | FunInATL` : 'Venue – FunInATL',
  meta: [{ name: 'description', content: location.value ? `Atlanta events at ${location.value.name}.` : '' }],
}))

function onDateChange({ start, end }: { start: string; end: string }) {
  dateStart.value = start
  dateEnd.value = end
}
</script>
