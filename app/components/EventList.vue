<template>
  <div>
    <div v-if="!groups || !groups.length" class="text-center py-16 text-gray-500 text-lg">
      No events found.
    </div>

    <template v-for="group in groups" :key="group.label">
      <!-- Period label (e.g. "This Week", "Next Week") -->
      <h3 class="text-3xl font-semibold text-center text-gray-800 mt-10 mb-4">
        {{ group.label }}
      </h3>

      <template v-if="group.days && group.days.length">
        <div v-for="day in group.days" :key="day.date">
          <!-- Day heading -->
          <div class="flex items-center mb-3 mt-6">
            <h4 class="text-xl font-semibold text-gray-700">
              {{ formatDay(day.date) }}
            </h4>
          </div>

          <!-- Cards grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
            <EventCard
              v-for="event in day.events"
              :key="event.slug"
              :event="event"
            />
          </div>
        </div>
      </template>
    </template>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  groups: Array<{ label: string; days: Array<{ date: string; events: any[] }> }>
}>()

function formatDay(dateStr: string) {
  const d = new Date(dateStr + 'T00:00:00')
  return d.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })
}
</script>
