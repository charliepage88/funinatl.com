<template>
  <div v-if="locations.length">
    <ul v-for="location in locations">
      <li>
        <pre>{{ location }}</pre>
      </li>
    </ul>
  </div>
</template>

<script>
import Locations from '@/queries/locations'

export default {
  name: 'locations-index',

  apollo: {
    locations: {
      prefetch: true,
      query: Locations
    }
  }
}
</script>
