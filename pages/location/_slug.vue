<template>
  <section class="section" v-if="location">
    <h3>{{ location.name }}</h3>
    
    <pre>{{ location }}</pre>
  </section>
</template>

<script>
import locationBySlug from '@/queries/locationBySlug'

export default {
  name: 'location-show',

  computed: {
    location () {
      return this.locationBySlug
    }
  },

  apollo: {
    locationBySlug: {
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return { slug: this.$route.params.slug }
      },
      query: locationBySlug
    }
  }
}
</script>
