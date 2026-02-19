<template>
  <div>
    <div v-if="pending" class="flex justify-center py-24">
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-info" />
    </div>

    <div v-else-if="event" class="container mx-auto px-4 lg:px-8 py-8">
      <!-- Two-column layout matching original ViewEvent -->
      <div class="flex flex-wrap lg:flex-nowrap gap-6">

        <!-- Left column -->
        <div class="w-full lg:w-1/2">
          <!-- Photo shown on mobile/tablet at top -->
          <div v-if="event.photo" class="lg:hidden mb-4">
            <img :src="event.photo" :alt="event.name" class="w-full rounded" />
          </div>

          <!-- Title -->
          <h1 class="text-4xl md:text-3xl font-bold text-gray-900 mb-3">{{ event.name }}</h1>

          <!-- Date -->
          <h3 class="text-2xl md:text-xl font-semibold text-gray-700 mb-1">
            {{ formatFriendlyDate(event.start_date) }}
          </h3>

          <!-- Time -->
          <h3 class="text-base text-gray-400 mb-4">
            {{ event.start_time }}<template v-if="event.end_time"> – {{ event.end_time }}</template>
          </h3>

          <!-- Price + Category row -->
          <div class="flex items-center justify-between mb-4 flex-wrap gap-3">
            <span class="text-xl font-semibold text-gray-800">
              Price: <span v-html="event.price" />
            </span>
            <NuxtLink
              v-if="event.category"
              :to="`/category/${event.category.slug}`"
              class="inline-block bg-success text-white no-underline px-4 py-1.5 rounded text-base font-medium hover:opacity-90 transition-opacity"
            >
              {{ event.category.name }}
            </NuxtLink>
          </div>

          <!-- Tags -->
          <div v-if="event.tags && event.tags.length" class="flex flex-wrap gap-1 mb-4">
            <NuxtLink
              v-for="tag in event.tags"
              :key="typeof tag === 'string' ? tag : tag.slug"
              :to="`/tag/${typeof tag === 'string' ? tag : tag.slug}`"
              class="text-sm bg-info text-white px-3 py-0.5 rounded no-underline hover:opacity-90 transition-opacity"
            >
              {{ typeof tag === 'string' ? tag : tag.name }}
            </NuxtLink>
          </div>

          <!-- Short description -->
          <div v-if="event.short_description" class="text-gray-700 mb-6">
            <p>{{ event.short_description }}</p>
          </div>

          <!-- Location + badges + website (pinned bottom on desktop) -->
          <div class="flex flex-wrap items-start gap-4 mt-4 ">
            <!-- Location -->
            <div v-if="event.location" class="flex items-center gap-3">
              <NuxtLink :to="`/location/${event.location.slug}`" :aria-label="event.location.name">
                <img
                  v-if="event.location.photo"
                  :src="event.location.photo"
                  :alt="event.location.name"
                  class="w-16 h-16 object-cover rounded hidden lg:block"
                />
                <img
                  v-if="event.location.photo"
                  :src="event.location.photo"
                  :alt="event.location.name"
                  class="w-24 h-24 object-cover rounded lg:hidden"
                />
              </NuxtLink>
              <NuxtLink :to="`/location/${event.location.slug}`" class="text-gray-700 no-underline hover:text-info capitalize text-base font-medium">
                {{ event.location.name }}
              </NuxtLink>
            </div>

            <!-- Family friendly -->
            <span v-if="event.is_family_friendly" class="inline-flex items-center gap-1 bg-warning text-gray-900 text-sm font-medium px-4 py-1.5 rounded">
              Family Friendly
            </span>

            <!-- Sold out -->
            <span v-if="event.is_sold_out" class="inline-flex items-center gap-1 bg-danger text-white text-sm font-medium px-4 py-1.5 rounded">
              Sold Out
            </span>

            <!-- Website -->
            <a
              v-if="event.website"
              :href="event.website"
              target="_blank"
              rel="noopener"
              class="inline-flex items-center gap-2 bg-indigo hover:opacity-90 text-white font-medium text-xl px-4 py-2 rounded transition-opacity no-underline"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
              </svg>
              Venue Website
            </a>
          </div>
        </div>

        <!-- Right column: photo (desktop) + description -->
        <div class="w-full lg:w-1/2 hidden lg:block">
          <figure v-if="event.photo" class="mb-4">
            <img :src="event.photo" :alt="event.name" class="w-full rounded aspect-video object-cover" />
          </figure>
          <div v-if="event.description" :class="{ 'mt-4': event.photo }">
            <p class="text-gray-700 leading-relaxed">{{ event.description }}</p>
          </div>
        </div>
      </div>

      <!-- Description on mobile (after main content) -->
      <div v-if="event.description" class="lg:hidden mt-6">
        <p class="text-gray-700 leading-relaxed">{{ event.description }}</p>
      </div>

      <!-- Bands section -->
      <template v-if="event.bands && event.bands.length">
        <hr class="my-8 border-gray-200" />
        <h3 class="text-3xl font-semibold text-gray-700 ml-2 mb-6">Bands</h3>
        <div class="flex flex-wrap gap-4 ml-2">
          <NuxtLink
            v-for="band in event.bands"
            :key="band.id"
            :to="`/band/${band.slug}`"
            class="flex items-center gap-3 bg-info text-white rounded-lg p-4 no-underline hover:opacity-90 transition-opacity min-w-48"
          >
            <img
              v-if="band.photo"
              :src="band.photo"
              :alt="band.name"
              class="w-16 h-16 object-cover rounded hidden lg:block"
            />
            <img
              v-if="band.photo"
              :src="band.photo"
              :alt="band.name"
              class="w-12 h-12 object-cover rounded lg:hidden"
            />
            <span class="font-semibold text-base">{{ band.name }}</span>
          </NuxtLink>
        </div>
      </template>
    </div>

    <div v-else class="text-center py-24 text-gray-400 text-lg">Event not found.</div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { get } = useApi()

const { data, pending } = await useAsyncData(
  `event-${route.params.slug}`,
  () => get<{ event: any }>(`/events/bySlug/${route.params.slug}`)
)

const event = computed(() => data.value?.event)

useHead(() => ({
  title: event.value ? `${event.value.name} | FunInATL` : 'Event – FunInATL',
  meta: [{ name: 'description', content: event.value?.short_description || '' }],
}))

function formatFriendlyDate(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}
</script>
