<template>
  <section class="section">
    <h3>Events</h3>
    <ul v-if="events && events.length">
      <li v-for="event in events" :key="event.id">
        <NuxtLink :to="`event/${event.slug}`">
          {{ event.name }} - {{ event.start_date }} @ {{ event.start_time }}
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>

<script>
import Events from '@/queries/Events'

export default {
  name: 'index',

  apollo: {
    events: {
      prefetch: true,
      query: Events
    }
  }
}
</script>
