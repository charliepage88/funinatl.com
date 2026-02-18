<template>
  <div class="bg-white rounded shadow hover:shadow-md transition-shadow overflow-hidden flex flex-col">
    <!-- Event photo -->
    <NuxtLink :to="`/event/${event.slug}`" class="block overflow-hidden shrink-0" :aria-label="event.name">
      <img
        v-if="event.photo || event.thumb_desktop || event.thumb_tablet || event.thumb_mobile"
        :src="event.photo || event.thumb_desktop || event.thumb_tablet || event.thumb_mobile"
        :alt="event.name"
        class="w-full object-cover"
        style="height: 250px;"
        loading="lazy"
      />
      <div v-else class="w-full bg-gray-100 flex items-center justify-center" style="height: 250px;">
        <svg class="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    </NuxtLink>

    <!-- Card body -->
    <div class="p-4 flex-1 flex flex-col">
      <!-- Media row: location thumb + category tag | title + location -->
      <div class="flex gap-3 mb-3">
        <!-- Left: location thumbnail + category tag -->
        <div v-if="event.location?.thumb_small || event.location?.photo" class="shrink-0 flex flex-col items-center gap-1" style="width: 128px;">
          <NuxtLink :to="`/location/${event.location.slug}`" :aria-label="event.location.name">
            <img
              :src="event.location.thumb_small || event.location.photo"
              :alt="event.location.name"
              class="object-cover rounded"
              style="width: 128px; height: 128px;"
              loading="lazy"
            />
          </NuxtLink>
          <NuxtLink
            v-if="event.category"
            :to="`/category/${event.category.slug}`"
            class="block text-center bg-success text-white text-xs font-medium py-1 rounded no-underline hover:opacity-90 transition-opacity"
            style="width: 128px;"
            :aria-label="event.category.name"
          >
            {{ event.category.name }}
          </NuxtLink>
        </div>
        <div v-else-if="event.category" class="shrink-0">
          <NuxtLink
            :to="`/category/${event.category.slug}`"
            class="inline-block bg-success text-white text-xs font-medium px-2 py-1 rounded no-underline"
          >
            {{ event.category.name }}
          </NuxtLink>
        </div>

        <!-- Right: title + location -->
        <div class="flex-1 min-w-0">
          <h4 class="font-bold text-gray-900 text-lg leading-snug mb-1 capitalize">
            <NuxtLink :to="`/event/${event.slug}`" class="text-gray-900 no-underline hover:text-info transition-colors" :aria-label="event.name">
              {{ event.name }}
            </NuxtLink>
          </h4>
          <h5 v-if="event.location" class="text-gray-600 text-base capitalize">
            <NuxtLink :to="`/location/${event.location.slug}`" class="text-gray-600 no-underline hover:text-info transition-colors" :aria-label="event.location.name">
              {{ event.location.name }}
            </NuxtLink>
          </h5>
        </div>
      </div>

      <!-- Dates -->
      <div class="text-center mb-1">
        <p class="text-sm font-medium text-gray-700">
          {{ formatDate(event.start_date) }}<template v-if="event.end_date"> – {{ formatDate(event.end_date) }}</template>
        </p>
      </div>

      <!-- Times -->
      <div class="text-center mb-2">
        <p class="text-sm text-gray-400">
          {{ event.start_time }}<template v-if="event.end_time"> – {{ event.end_time }}</template>
        </p>
      </div>

      <!-- Price -->
      <div class="flex justify-center mb-2">
        <span
          class="inline-block bg-gray-100 text-gray-800 text-sm font-medium px-4 py-1.5 rounded"
          v-html="event.price"
        />
      </div>

      <!-- Family Friendly -->
      <div v-if="event.is_family_friendly" class="flex justify-center mb-2">
        <span class="inline-flex items-center gap-1 bg-warning text-gray-900 text-xs font-medium px-3 py-1 rounded">
          <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2a3 3 0 100 6 3 3 0 000-6zm-6 9a1 1 0 000 2h12a1 1 0 000-2H6zm2 4a4 4 0 00-4 4v1h16v-1a4 4 0 00-4-4H8z"/>
          </svg>
          Family Friendly
        </span>
      </div>

      <!-- Description -->
      <p v-if="event.short_description" class="text-sm text-gray-600 mt-1 mb-2">
        {{ event.short_description.length > 200 ? event.short_description.slice(0, 200) + '…' : event.short_description }}
      </p>

      <!-- Tags -->
      <div v-if="event.tags && event.tags.length" class="mt-auto pt-2 flex flex-wrap gap-1">
        <NuxtLink
          v-for="tag in event.tags"
          :key="typeof tag === 'string' ? tag : tag.slug"
          :to="`/tag/${typeof tag === 'string' ? tag : tag.slug}`"
          class="text-xs bg-info text-white px-2 py-0.5 rounded no-underline hover:opacity-90 transition-opacity"
        >
          {{ typeof tag === 'string' ? tag : tag.name }}
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{ event: Record<string, any> }>()

function formatDate(dateStr: string) {
  if (!dateStr) return ''
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })
}
</script>
