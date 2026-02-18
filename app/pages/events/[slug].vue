<script setup lang="ts">
const route = useRoute()
const config = useRuntimeConfig()

const { data: response, error } = await useAsyncData(
  () => `event-${route.params.slug}`,
  () => $fetch<{ event: any }>(`/events/bySlug/${route.params.slug}`, {
    baseURL: config.public.apiBase,
  }),
)

if (error.value) {
  throw createError({ statusCode: 404, message: 'Event not found' })
}

const event = computed(() => response.value?.event)

useSeoMeta({
  title: computed(() => event.value ? `${event.value.name} – FunInATL` : 'Event – FunInATL'),
  description: computed(() => event.value?.description?.slice(0, 160) ?? ''),
  ogTitle: computed(() => event.value?.name ?? ''),
  ogDescription: computed(() => event.value?.description?.slice(0, 160) ?? ''),
  ogImage: computed(() => event.value?.photo ?? ''),
})

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

// API returns start_time as "8:00 PM" already — display as-is
</script>

<template>
  <div v-if="event" class="flex flex-col gap-8 max-w-4xl mx-auto">
    <nav class="breadcrumbs text-sm">
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li>{{ event.name }}</li>
      </ul>
    </nav>

    <!-- Hero image -->
    <div v-if="event.photo" class="rounded-2xl overflow-hidden aspect-video">
      <img :src="event.photo" :alt="event.name" class="w-full h-full object-cover" />
    </div>

    <div class="flex flex-col gap-6">
      <!-- Category + family badge -->
      <div class="flex flex-wrap gap-2">
        <NuxtLink
          v-if="event.category"
          :to="`/categories/${event.category.slug}`"
          class="badge badge-primary"
        >{{ event.category.name }}</NuxtLink>
        <span v-if="event.is_family_friendly" class="badge badge-success">Family Friendly</span>
      </div>

      <h1 class="text-3xl md:text-4xl font-bold">{{ event.name }}</h1>

      <!-- Meta info -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div class="card bg-base-200 p-4 flex flex-col gap-1">
          <span class="text-xs opacity-50 uppercase tracking-wide">Date &amp; Time</span>
          <span class="font-medium">{{ formatDate(event.start_date) }}</span>
          <span v-if="event.start_time" class="text-sm opacity-70">{{ event.start_time }}</span>
          <span v-if="event.end_date && event.end_date !== event.start_date" class="text-sm opacity-70">
            through {{ formatDate(event.end_date) }}
          </span>
        </div>

        <div v-if="event.location" class="card bg-base-200 p-4 flex flex-col gap-1">
          <span class="text-xs opacity-50 uppercase tracking-wide">Location</span>
          <span class="font-medium">{{ event.location.name }}</span>
          <span v-if="event.location.address" class="text-sm opacity-70">{{ event.location.address }}</span>
        </div>
      </div>

      <!-- Price -->
      <div v-if="event.price" class="text-sm">
        <span class="opacity-50">Price: </span>
        <span class="font-medium">{{ event.price }}</span>
      </div>

      <!-- Description -->
      <div v-if="event.description" class="prose prose-sm max-w-none opacity-90" v-html="event.description" />

      <!-- Short description fallback -->
      <p v-else-if="event.short_description" class="opacity-80">{{ event.short_description }}</p>

      <!-- Tags -->
      <div v-if="event.tags?.length" class="flex flex-wrap gap-2">
        <span class="text-sm opacity-50">Tags:</span>
        <span v-for="tag in event.tags" :key="tag" class="badge badge-outline badge-sm">{{ tag }}</span>
      </div>

      <!-- Website link -->
      <div v-if="event.website" class="flex gap-3">
        <a
          :href="event.website"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary btn-sm"
        >Get Tickets / More Info</a>
      </div>

      <!-- Share -->
      <div class="flex items-center gap-3">
        <span class="text-sm opacity-50">Share:</span>
        <a
          :href="`https://twitter.com/intent/tweet?text=${encodeURIComponent(event.name)}&url=${encodeURIComponent('https://funinatl.com/events/' + event.slug)}`"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-ghost btn-sm"
        >Twitter/X</a>
        <a
          :href="`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent('https://funinatl.com/events/' + event.slug)}`"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-ghost btn-sm"
        >Facebook</a>
      </div>
    </div>
  </div>
</template>
