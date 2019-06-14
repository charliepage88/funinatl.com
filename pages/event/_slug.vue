<template>
  <div class="container mx-auto" v-if="event">
    {{ event.name }}
  </div>
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

  data () {
    return {
      mode: 'event'
    }
  },

  methods: {
    changeMode (value) {
      this.mode = value
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
