<template>
  <div class="container is-fluid is-content" v-if="hasEvent">
    <ViewEvent :event="event" />
  </div>
</template>

<script>
import moment from 'moment'
import isEmpty from 'lodash.isempty'
import eventBySlug from '@/queries/eventBySlug'
import ViewEvent from '@/components/Dynamic/ViewEvent'

export default {
  name: 'event-show',

  head () {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description
        }
      ]
    }
  },

  scrollToTop: true,

  async asyncData ({ $axios, $payloadURL, route, app, params, payload }) {
    // get payload locally if available
    if (process.static && process.client) {
      return await $axios.$get($payloadURL(route))
    }

    // return payload if available
    if (payload) {
      return payload
    }

    // fetch data from apollo
    let client = app.apolloProvider.defaultClient

    const event = await client.query({
      query: eventBySlug,
      variables: params
    }).then(({ data }) => {
      return data.eventBySlug
    })

    return {
      eventBySlug: event
    }
  },

  components: {
    ViewEvent
  },

  computed: {
    event () {
      return this.eventBySlug
    },

    hasEvent () {
      return !isEmpty(this.event)
    },

    title () {
      if (!this.hasEvent) {
        return null
      }

      let value = `Atlanta Events - ${this.event.name} | `

      value += `${this.event.location.name} | ${this.event.category.name}`

      value += ` | FunInATL`

      return value
    },

    description () {
      if (!this.hasEvent) {
        return null
      }

      if (this.event.short_description) {
        return this.event.short_description
      }

      if (this.event.description) {
        return this.event.description
      }

      return `Atlanta event on ${moment(this.event.start_date).format('dddd, MMMM Do')} with ${this.event.name} at ${this.event.location.name}.`
    }
  },

  apollo: {
    eventBySlug: {
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return {
          slug: this.$route.params.slug
        }
      },
      query: eventBySlug
    }
  }
}
</script>
