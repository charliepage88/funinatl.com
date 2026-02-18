<template>
  <section class="text-white" style="background: linear-gradient(141deg, #1d6fa4 0%, #3298dc 71%, #4eb8f6 100%)">
    <div class="px-4 py-5">
      <div class="flex flex-wrap gap-3 items-start">

        <!-- Search input with autocomplete -->
        <div class="relative flex-1 min-w-64">
          <input
            ref="inputEl"
            v-model="query"
            type="search"
            placeholder="Search for an event"
            class="w-full px-4 py-3 text-gray-900 text-base rounded border-0 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/75"
            @input="onInput"
            @keydown.down.prevent="highlight++"
            @keydown.up.prevent="highlight = Math.max(0, highlight - 1)"
            @keydown.enter="onEnter"
            @keydown.esc="results = []"
          />

          <!-- No results -->
          <div
            v-if="query.length >= 2 && !loading && results.length === 0 && searched"
            class="absolute top-full left-0 right-0 mt-1 bg-white text-gray-800 rounded shadow-lg p-3 text-sm z-50"
          >
            No results found for <strong>{{ query }}</strong>
          </div>

          <!-- Results dropdown -->
          <div
            v-if="results.length"
            class="absolute top-full left-0 right-0 mt-1 bg-white rounded shadow-xl z-50 overflow-y-auto"
            style="max-height: 252px;"
          >
            <div
              v-for="(event, i) in results"
              :key="event.slug"
              class="flex items-center gap-3 px-3 py-2 cursor-pointer border-b border-gray-100 last:border-0 hover:bg-blue-50 transition-colors"
              :class="{ 'bg-blue-50': i === highlight }"
              @mousedown.prevent
              @click="goTo(event)"
            >
              <img
                v-if="event.photo"
                :src="event.photo"
                :alt="event.name"
                class="w-16 h-16 object-cover rounded shrink-0"
              />
              <div class="min-w-0">
                <p class="text-sm text-gray-900 font-medium" v-html="event.highlight || event.name" />
                <div class="flex items-center gap-2 mt-0.5">
                  <span class="text-xs text-gray-500">{{ event.start_date }}</span>
                  <span v-if="event.category" class="text-xs bg-success text-white px-2 py-0.5 rounded-full">
                    {{ event.category.name }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Category filter -->
        <select
          v-if="categories && categories.length"
          v-model="filters.category"
          class="px-3 py-3 text-gray-900 text-base rounded border-0 focus:outline-none focus:ring-2 focus:ring-white/50 min-w-36 bg-white/75"
          aria-label="Filter by category"
          @change="emit('filter', { ...filters })"
        >
          <option value="">Category</option>
          <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
        </select>

        <!-- Location filter -->
        <select
          v-if="locations && locations.length"
          v-model="filters.location"
          class="px-3 py-3 text-gray-900 text-base rounded border-0 focus:outline-none focus:ring-2 focus:ring-white/50 min-w-36 bg-white/75"
          aria-label="Filter by location"
          @change="emit('filter', { ...filters })"
        >
          <option value="">Location</option>
          <option v-for="l in locations" :key="l.id" :value="l.id">{{ l.name }}</option>
        </select>

        <!-- Family friendly -->
        <label class="flex items-center gap-2 py-3 cursor-pointer text-sm font-medium whitespace-nowrap">
          <input
            v-model="filters.is_family_friendly"
            type="checkbox"
            class="w-4 h-4 rounded accent-white"
            @change="emit('filter', { ...filters })"
          />
          Family Friendly
        </label>

        <!-- Reset -->
        <button
          class="bg-danger hover:opacity-90 text-white font-semibold px-5 py-3 rounded transition-opacity text-sm whitespace-nowrap"
          @click="reset"
        >
          Reset
        </button>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  categories?: any[]
  locations?: any[]
}>()

const emit = defineEmits<{
  filter: [filters: { category: string; location: string; is_family_friendly: boolean }]
}>()

const { get } = useApi()
const inputEl = ref<HTMLInputElement>()
const query = ref('')
const results = ref<any[]>([])
const highlight = ref(0)
const loading = ref(false)
const searched = ref(false)
const filters = reactive({ category: '', location: '', is_family_friendly: false })
let debounceTimer: ReturnType<typeof setTimeout>

function onInput() {
  clearTimeout(debounceTimer)
  searched.value = false
  if (query.value.length < 2) { results.value = []; return }
  loading.value = true
  debounceTimer = setTimeout(async () => {
    try {
      const data = await get<{ events: any[] }>('/events/search', { q: query.value })
      const eventsRaw = data.events || []
      // Handle Elasticsearch _source format
      results.value = eventsRaw.map((e: any) => {
        const src = e._source || e
        if (e.highlight?.name?.[0]) src.highlight = e.highlight.name[0]
        else src.highlight = src.name
        return src
      })
      highlight.value = 0
      searched.value = true
    } catch {
      results.value = []
    } finally {
      loading.value = false
    }
  }, 300)
}

function onEnter() {
  if (results.value[highlight.value]) {
    goTo(results.value[highlight.value])
  }
}

function goTo(event: any) {
  navigateTo(`/event/${event.slug}`)
  results.value = []
  query.value = ''
}

function reset() {
  query.value = ''
  results.value = []
  searched.value = false
  filters.category = ''
  filters.location = ''
  filters.is_family_friendly = false
  emit('filter', { ...filters })
}
</script>
