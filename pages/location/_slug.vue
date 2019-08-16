<template>
  <div v-if="location">
    <filter-by-date @change="updateDate" />

    <div class="columns is-centered pt-2">
      <div class="column" :class="{ 'is-full': isTablet, 'is-6': isDesktopOrWidescreen }">
        <div class="columns">
          <div class="column is-one-quarter" v-if="location.thumb_medium && isDesktopOrWidescreen">
            <figure class="image is-128x128">
              <img :alt="location.name" :src="location.thumb_medium">
            </figure>
          </div>

          <div class="column is-one-quarter" v-if="location.photo && !isDesktopOrWidescreen">
            <figure class="image">
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
        <div v-for="(row, index) in events" :key="row.label">
          <h3
            class="subtitle has-text-centered is-2"
            :class="{ 'mt-4': index > 0, 'mt-2': index === 0 }"
          >
            {{ row.label }}
          </h3>

          <template v-if="row.days && row.days.length">
            <div v-for="day in row.days" :key="day.date" :id="`events-${day.date}`">
              <nav class="level">
                <div class="level-left">
                  <div class="level-item">
                    <h4
                      class="subtitle is-4 mb-2"
                      :class="{ 'mt-2': isMobile, 'mt-3': !isMobile }"
                    >
                      {{ day.date | dayOfWeek }}
                    </h4>
                  </div>
                </div>

                <div class="level-right" v-if="1 === 2">
                  <div class="level-item">
                    <b-dropdown hoverable aria-role="list" :mobile-modal="true">
                      <button class="button is-info" slot="trigger">
                        <span>Jump To Date</span>
                        <b-icon pack="fas" icon="caret-down"></b-icon>
                      </button>

                      <b-dropdown-item
                        aria-role="listitem"
                        v-for="val in availableDates"
                        :key="`date-${val.value}-${day.date}`"
                        @click.prevent="jumpToDate(val.value)"
                      >
                        {{ val.formatted }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </div>
                </div>
              </nav>

              <events-list :events="day.events" />
            </div>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
import get from 'lodash.get'
import isEmpty from 'lodash.isempty'
import eventsByLocation from '@/queries/eventsByLocation'
import FilterByDate from '@/components/Events/FilterByDate'
import EventsList from '@/components/Events/List'
import ResponsiveMixin from '@/mixins/ResponsiveMixin'

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

  async asyncData (context) {
    // init start/end date
    if (!context.params.start_date) {
      context.params.start_date = moment().startOf('day').format('YYYY-MM-DD')
    }

    if (!context.params.end_date) {
      context.params.end_date = moment().add(2, 'week').format('YYYY-MM-DD')
    }

    // return payload if available
    let payload = get(context, 'payload', false)
    if (payload) {
      return payload
    }

    // fetch data from apollo
    let client = context.app.apolloProvider.defaultClient

    const response = {
      eventsByLocation: {}
    }

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
      return get(this.eventsByLocation, 'location', {})
    },

    events () {
      return get(this.eventsByLocation, 'events', {})
    },

    hasEvents () {
      return !isEmpty(this.events)
    },

    availableDates () {
      if (!this.hasEvents) {
        return []
      }

      let dates = []
      for (let i in this.events) {
        let days = this.events[i].days

        for (let k in days) {
          let date = this.events[i].days[k].date

          dates.push({
            formatted: moment(date).format('dddd, MMMM Do'),
            value: date
          })
        }
      }

      // return dates.slice(0, 10)
      return dates
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
    },

    title () {
      let value = `Atlanta Events - ${this.location.name} | FunInATL`

      return value
    },

    description () {
      let value = `Atlanta events for ${this.location.name}.`

      return value
    }
  },

  apollo: {
    // locationBySlug: {
    //   prefetch: ({ route }) => ({ slug: route.params.slug }),
    //   variables() {
    //     return { slug: this.$route.params.slug }
    //   },
    //   query: locationBySlug
    // },

    eventsByLocation: {
      prefetch: true,
      // prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return {
          slug: this.$route.params.slug,
          start_date: this.start_date,
          end_date: this.end_date
        }
      },
      query: eventsByLocation
    }
  },

  data () {
    return {
      start_date: moment().startOf('day').format('YYYY-MM-DD'),
      end_date: moment().add(2, 'week').format('YYYY-MM-DD')
    }
  },

  methods: {
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
