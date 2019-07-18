<template>
  <div v-if="location">
    <filter-by-date @change="updateDate" />

    <div class="columns is-centered pt-2">
      <div class="column" :class="{ 'is-full': isTablet, 'is-6': isDesktopOrWidescreen }">
        <div class="columns">
          <div class="column is-one-quarter" v-if="location.photo">
            <figure class="image" :class="{ 'is-96x96': isDesktopOrWidescreen }">
              <img :alt="location.name" :src="location.photo">
            </figure>
          </div>

          <div class="column is-half has-text-centered">
            <h1 class="title is-1 is-size-3-tablet">
              {{ location.name }}
            </h1>

            <a class="has-cursor-pointer" :href="addressUrl" target="_blank">
              {{ location.address }}<br />
              {{ location.city }}, {{ location.state }} {{ location.zip }}
            </a>
          </div>

          <div class="column is-one-quarter">
            <a
              :href="location.website"
              target="_blank"
              class="button is-indigo is-large is-fullwidth-mobile"
              :class="{ 'is-fullwidth': isDesktopOrWidescreen }"
            >
              <span class="icon is-large">
                <i class="fas fa-link fa-2x"></i>
              </span>
              <span>Website</span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <section class="section pt-0" v-if="hasEvents">
      <div class="centered-container">
        <div v-for="(rows, date) in groupedEvents" :key="`custom-${date}`" :id="`events-${date}`">
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <h4
                  class="subtitle is-4 mb-2"
                  :class="{ 'mt-2': isMobile, 'mt-5': !isMobile }"
                >
                  {{ date | dayOfWeek }}
                </h4>
              </div>
            </div>

            <div class="level-right">
              <div class="level-item">
                <b-dropdown hoverable aria-role="list">
                  <button class="button is-info" slot="trigger">
                    <span>Jump To Date</span>
                    <b-icon pack="fas" icon="caret-down"></b-icon>
                  </button>

                  <b-dropdown-item
                    aria-role="listitem"
                    v-for="value in availableDates"
                    :key="`date-${date}-${value}`"
                    @click="jumpToDate(value)"
                  >
                    {{ value }}
                  </b-dropdown-item>
                </b-dropdown>
              </div>
            </div>
          </nav>

          <events-list :events="rows" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
import groupBy from 'lodash.groupby'
import orderBy from 'lodash.orderby'
import isEmpty from 'lodash.isempty'
import locationBySlug from '@/queries/locationBySlug'
import eventsByLocation from '@/queries/eventsByLocation'
import FilterByDate from '@/components/Events/FilterByDate'
import EventsList from '@/components/Events/List'
import ResponsiveMixin from '@/mixins/ResponsiveMixin'

export default {
  name: 'location-show',

  scrollToTop: true,

  async asyncData (context) {
    let client = context.app.apolloProvider.defaultClient

    const response = {
      locationBySlug: {},
      eventsByLocation: []
    }

    response.locationBySlug = await client.query({
        query: locationBySlug,
        variables: context.params
      })
      .then(({ data }) => {
        return data.locationBySlug
      })

    response.eventsByLocation = await client.query({
        query: eventsByLocation,
        variables: context.params
      })
      .then(({ data }) => {
        return data.eventsByLocation
      })

    return response
  },

  mixins: [
    ResponsiveMixin
  ],

  components: {
    FilterByDate,
    EventsList
  },

  computed: {
    location () {
      return this.locationBySlug
    },

    events () {
      return this.eventsByLocation
    },

    groupedEvents () {
      if (!this.events || !this.events.length) {
        return []
      }

      let filteredEvents = this.events.filter((event) => {
        let ymd = moment(event.start_date).format('YYYY-MM-DD')
        let validDate = (ymd >= this.start_date && ymd <= this.end_date)

        if (validDate) {
          return event
        }
      })

      let orderedEvents = orderBy(filteredEvents, [ 'start_date' ], [ 'asc' ])
      let grouped = groupBy(orderedEvents, 'start_date')

      let events = {}
      for(let i in grouped) {
        let items = []

        for(let key in grouped[i]) {
          let item = grouped[i][key]

          item.start_at = item.start_time.replace(' PM', '').replace(' AM', '')
          item.start_at = item.start_at.replace(':', '')

          item.start_at = parseInt(item.start_at)

          if (item.start_time.match(' PM')) {
            item.start_at = item.start_at + 1200
          }

          items.push(item)
        }

        events[i] = orderBy(items, [ 'start_at' ], [ 'asc' ])
      }

      return events
    },

    hasEvents () {
      return !isEmpty(this.groupedEvents)
    },

    availableDates () {
      if (!this.hasEvents) {
        return []
      }

      let dates = []

      dates.push(Object.keys(this.groupedEvents))

      if (dates.length) {
        dates = [].concat.apply([], dates)
      }

      return dates.slice(0, 10)
    },

    addressUrl () {
      if (isEmpty(this.location)) {
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
    }
  },

  apollo: {
    locationBySlug: {
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return { slug: this.$route.params.slug }
      },
      query: locationBySlug
    },

    eventsByLocation: {
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return { slug: this.$route.params.slug }
      },
      query: eventsByLocation
    }
  },

  data () {
    return {
      start_date: moment().startOf('day').format('YYYY-MM-DD'),
      end_date: moment().add(7, 'day').format('YYYY-MM-DD')
    }
  },

  methods: {
    updateDate (key, val) {
      let date = moment(val).format('YYYY-MM-DD')

      console.log('updateDate')
      console.log(date)

      this.$set(this, key, date)
    },

    jumpToDate (date) {
      let id = `events-${date}`

      document.getElementById(id).scrollIntoView()
    }
  }
}
</script>
