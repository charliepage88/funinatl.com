<template>
  <section class="section" v-if="event">
    <h3>{{ event.name }}</h3>
    
    <pre>{{ event }}</pre>
  </section>
</template>

<script>
import eventBySlug from '@/queries/eventBySlug'

export default {
  name: 'event-show',

  computed: {
    event () {
      return this.eventBySlug
    }
  },

  apollo: {
    eventBySlug: {
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return { slug: this.$route.params.slug }
      },
      query: eventBySlug
    }
  }
}
</script>
