<template>
  <div>
    <!-- Search hero (blue, matches original is-info is-bold) -->
    <SearchBar
      :categories="categories"
      :locations="locations"
      @filter="onFilter"
    />

    <!-- Date range picker -->
    <DateRangePicker :start="dateStart" :end="dateEnd" @change="onDateChange" />

    <!-- Events listing -->
    <div class="container mx-auto px-4 lg:px-16 pt-0 pb-10">
      <div v-if="pending" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-info" />
      </div>
      <div v-else-if="error" class="text-center py-16 text-red-500">
        Failed to load events. Please try again.
      </div>
      <EventList v-else :groups="filteredGroups" />
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'FunInATL – Atlanta Events' })

const { get } = useApi()

const DEFAULT_START = '2026-01-01'
const DEFAULT_END = '2026-12-31'
// defaults set above
const fmt = (d: Date) => d.toISOString().split('T')[0]

const dateStart = ref(DEFAULT_START)
const dateEnd = ref(DEFAULT_END)
const activeFilters = ref({ category: '', location: '', is_family_friendly: false })

const { data, pending, error } = await useAsyncData(
  'events-index',
  () => get<{ events: any[]; categories: any[]; locations: any[] }>(
    `/events/index/${dateStart.value}/${dateEnd.value}`
  ),
  { watch: [dateStart, dateEnd] }
)

const categories = computed(() => data.value?.categories || [])
const locations = computed(() => data.value?.locations || [])

const filteredGroups = computed(() => {
  const groups: any[] = data.value?.events || []
  const { category, location, is_family_friendly } = activeFilters.value
  if (!category && !location && !is_family_friendly) return groups

  return groups.map((g: any) => ({
    ...g,
    days: g.days.map((d: any) => ({
      ...d,
      events: d.events.filter((e: any) => {
        if (category && e.category?.id !== Number(category) && e.category?.slug !== category) return false
        if (location && e.location?.id !== Number(location) && e.location?.slug !== location) return false
        if (is_family_friendly && !e.is_family_friendly) return false
        return true
      }),
    })).filter((d: any) => d.events.length),
  })).filter((g: any) => g.days.length)
})

function onDateChange({ start, end }: { start: string; end: string }) {
  dateStart.value = start
  dateEnd.value = end
}

function onFilter(filters: { category: string; location: string; is_family_friendly: boolean }) {
  activeFilters.value = filters
}
</script>
