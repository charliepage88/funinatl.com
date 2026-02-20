<template>
  <div>
    <div v-if="pending" class="flex justify-center py-20">
      @@@
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-info" />
    </div>
    <div v-else-if="band">
      ###
      <DateRangePicker :start="dateStart" :end="dateEnd" @change="onDateChange" />

      <div class="flex justify-center pt-6 pb-4 px-4">
        <div class="flex flex-wrap items-center gap-6 justify-center">
          <div v-if="band.photo" class="shrink-0">
            <img :src="band.photo" :alt="band.name" class="w-32 h-32 object-cover rounded" />
          </div>
          <div class="text-center">
            <h1 class="text-4xl font-semibold text-gray-800 capitalize">{{ band.name }}</h1>
          </div>
        </div>
      </div>

      <div class="container mx-auto px-4 lg:px-16 pt-0 pb-10">
        <EventList :groups="events || []" />
      </div>
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
  `band-${slug.value}`,
  () => get<{ events: any[]; band: any }>(`/events/band/${slug.value}/${dateStart.value}/${dateEnd.value}`),
  { watch: [dateStart, dateEnd] }
)

console.log(data.value)
console.log(pending.value)

const band = computed(() => data.value?.band)
const events = computed(() => data.value?.events)

console.log(band.value)

useHead(() => ({
  title: band.value ? `Atlanta Events – ${band.value.name} | FunInATL` : 'Artist – FunInATL',
  meta: [{ name: 'description', content: band.value ? `Atlanta events for ${band.value.name}.` : '' }],
}))

function onDateChange({ start, end }: { start: string; end: string }) {
  dateStart.value = start
  dateEnd.value = end
}
</script>
