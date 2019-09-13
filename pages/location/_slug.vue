<template>
  <div v-if="hasLocation">
    <filter-by-date @change="updateDate" />

    <div class="columns is-centered pt-2">
      <div class="column is-full-tablet is-half-desktop">
        <div class="columns">
          <div class="column is-one-quarter is-visible-computer">
            <figure class="image is-128x128">
              <img :alt="location.name" :src="location.thumb_medium">
            </figure>
          </div>

          <div class="column is-one-quarter is-visible-touch">
            <figure class="image">
              <img :alt="location.name" :src="location.photo">
            </figure>
          </div>

          <div class="column is-half has-text-centered">
            <h1 class="title is-1 is-size-1-desktop is-size-3-tablet">
              {{ location.name }}
            </h1>

            <a class="has-cursor-pointer" :href="addressUrl" target="_blank" rel="noopener">
              {{ location.address }}<br />
              {{ location.city }}, {{ location.state }} {{ location.zip }}
            </a>
          </div>

          <div class="column is-one-quarter">
            <a
              :href="location.website"
              target="_blank"
              rel="noopener"
              class="button is-indigo is-large is-fullwidth"
            >
              <span class="icon is-large">
                <i class="fas fa-link fa-lg"></i>
              </span>
              <span>Website</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="centered-container pl-computer-4 pr-computer-4 pl-handheld-1 pr-handheld-1 pt-0" v-if="hasEvents">
      <div v-for="(row, index) in events" :key="row.label">
        <h3
          class="subtitle has-text-centered is-2 mt-4"
        >
          {{ row.label }}
        </h3>

        <template v-if="row.days && row.days.length">
          <div v-for="day in row.days" :key="day.date" :id="`events-${day.date}`">
            <nav class="level">
              <div class="level-left">
                <h4 class="subtitle is-4 mb-2 mt-mobile-2 mt-tablet-3 mt-computer-3">
                  {{ day.date | dayOfWeek }}
                </h4>
              </div>
            </nav>

            <events-list :events="day.events" />
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'
import get from 'lodash.get'
import isEmpty from 'lodash.isempty'
import eventsByLocation from '@/queries/eventsByLocation'
import FilterByDate from '@/components/Events/FilterByDate'
import EventsList from '@/components/Events/List'

export default {
  name: 'location-show',

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

    // init start/end date
    if (!params.start_date) {
      params.start_date = moment().startOf('day').format('YYYY-MM-DD')
    }

    if (!params.end_date) {
      params.end_date = moment().add(10, 'day').format('YYYY-MM-DD')
    }

    // fetch data from apollo
    let client = app.apolloProvider.defaultClient

    const response = {
      eventsByLocation: {}
    }

    response.eventsByLocation = await client.query({
        query: eventsByLocation,
        variables: params,
        watchLoading (isLoading) {
          if (isLoading) {
            this.startLoading()
          } else {
            this.stopLoading()
          }
        }
      })
      .then(({ data }) => {
        return data.eventsByLocation
      })

    return response
  },

  components: {
    FilterByDate,
    EventsList
  },

  computed: {
    location () {
      return get(this.eventsByLocation, 'location', {})
    },

    events () {
      return get(this.eventsByLocation, 'events', {})
    },

    hasEvents () {
      return !isEmpty(this.events)
    },

    hasLocation () {
      return !isEmpty(this.location)
    },

    addressUrl () {
      if (!this.hasLocation) {
        return null
      }

      // 529+Flat+Shoals+Ave+SE,+Atlanta,+GA+30316
      let url = 'https://www.google.com/maps/place'
      let params

      params = this.location.address
      params += `, ${this.location.city}`
      params += `, ${this.location.state}`
      params += ` ${this.location.zip}`

      params = params.replace(/ /g, '+')

      return `${url}/${params}`
    },

    replaceAll (str, find, replace) {
      return str.replace(new RegExp(find, 'g'), replace);
    },

    title () {
      if (!this.hasLocation) {
        return null
      }

      let value = `Atlanta Events - ${this.location.name} | FunInATL`

      return value
    },

    description () {
      if (!this.hasLocation) {
        return null
      }

      let value = `Atlanta events for ${this.location.name}.`

      return value
    },

    isCustomDatesChoosen () {
      let startDateChange = (this.start_date_original !== this.start_date)
      let endDateChange = (this.end_date_original !== this.end_date)

      return (startDateChange || endDateChange)
    }
  },

  apollo: {
    eventsByLocation: {
      prefetch: ({ route }) => ({
        slug: route.params.slug,
        start_date: get(route.params, 'start_date', null),
        end_date: get(route.params, 'end_date', null)
      }),
      variables() {
        return {
          slug: this.$route.params.slug,
          start_date: this.start_date,
          end_date: this.end_date
        }
      },
      query: eventsByLocation,
      watchLoading (isLoading) {
        if (isLoading) {
          this.startLoading()
        } else {
          this.stopLoading()
        }
      },
      skip () {
        return (this.hasEvents && this.hasLocation && !this.isCustomDatesChoosen)
      }
    }
  },

  data () {
    return {
      start_date: moment().startOf('day').format('YYYY-MM-DD'),
      end_date: moment().add(10, 'day').format('YYYY-MM-DD'),
      start_date_original: moment().startOf('day').format('YYYY-MM-DD'),
      end_date_original: moment().add(10, 'day').format('YYYY-MM-DD')
    }
  },

  methods: {
    ...mapActions('site', [
      'startLoading',
      'stopLoading'
    ]),

    updateDate (key, val) {
      let date = moment(val).format('YYYY-MM-DD')

      this.$set(this, key, date)
    },

    jumpToDate (date) {
      let id = `events-${date}`

      document.getElementById(id).scrollIntoView()
    }
  }
}
</script>
