<script setup lang="ts">
useSeoMeta({
  title: 'Search Events – FunInATL',
  description: 'Search for events in Atlanta, GA.',
})

const config = useRuntimeConfig()
const route = useRoute()
const router = useRouter()

const q = ref((route.query.q as string) ?? '')
const selectedCategory = ref((route.query.category as string) ?? '')
const selectedLocation = ref((route.query.location as string) ?? '')
const familyFriendly = ref(route.query.family_friendly === '1')

const { data: categoriesResponse } = await useAsyncData(
  'search-categories',
  () => $fetch<{ categories: any[] }>('/categories', { baseURL: config.public.apiBase }),
)
const { data: locationsResponse } = await useAsyncData(
  'search-locations',
  () => $fetch<{ locations: any[] }>('/locations', { baseURL: config.public.apiBase }),
)

const categories = computed(() => categoriesResponse.value?.categories ?? [])
const locations = computed(() => locationsResponse.value?.locations ?? [])

const { data: searchResponse, pending, refresh } = await useAsyncData(
  'search-results',
  () => {
    const params: Record<string, string> = {}
    if (q.value) params.q = q.value
    if (selectedCategory.value) params.category = selectedCategory.value
    if (selectedLocation.value) params.location = selectedLocation.value
    if (familyFriendly.value) params.is_family_friendly = '1'

    return $fetch<{ events: any[] }>('/events/search', {
      baseURL: config.public.apiBase,
      params,
    })
  },
  { lazy: true }
)

const events = computed(() => searchResponse.value?.events ?? null)

function doSearch() {
  const query: Record<string, string> = {}
  if (q.value) query.q = q.value
  if (selectedCategory.value) query.category = selectedCategory.value
  if (selectedLocation.value) query.location = selectedLocation.value
  if (familyFriendly.value) query.family_friendly = '1'
  router.push({ path: '/search', query })
  refresh()
}

// Run search on mount if query params present
onMounted(() => {
  if (q.value || selectedCategory.value || selectedLocation.value || familyFriendly.value) {
    refresh()
  }
})
</script>

<template>
  <div class="flex flex-col gap-8">
    <h1 class="text-3xl font-bold">Search Events</h1>

    <SearchBar
      v-model="q"
      v-model:category="selectedCategory"
      v-model:location="selectedLocation"
      v-model:family-friendly="familyFriendly"
      :categories="categories"
      :locations="locations"
      @search="doSearch"
    />

    <div v-if="events === null && !pending" class="text-center py-12 opacity-50">
      <p class="text-lg">Enter a search term to find events.</p>
    </div>

    <EventList v-else :events="events ?? []" :loading="pending" />
  </div>
</template>
