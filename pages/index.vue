<template>
  <div>
    <Search
      ref="search"
      @change="searchSetValue"
      :categories="categories"
      :locations="locations"
    />

    <nav class="bg-white px-8 pt-2 shadow-md" v-if="1 === 2">
      <div class="-mb-px flex justify-center">
        <a
          class="no-underline outline-none text-teal-dark border-b-2 uppercase tracking-wide font-bold text-xs py-3 mr-8"
          @click.prevent="changeMode('all')"
          :class="{ 'border-gray-800': mode === 'all', 'border-transparent': mode !== 'all' }"
        >
          All Events
        </a>
        <a
          class="no-underline outline-none text-grey-dark border-b-2 uppercase tracking-wide font-bold text-xs py-3 ml-8"
          @click.prevent="changeMode('recommended')"
          :class="{ 'border-gray-800': mode === 'recommended', 'border-transparent': mode !== 'recommended' }"
        >
          Recommended
        </a>
      </div>
    </nav>

    <filter-by-date @change="updateDate" />

    <template v-show="mode === 'all'">
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
    </template>

    <template v-show="mode === 'recommended'">
      <span>recommended yo</span>
    </template>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'
import get from 'lodash.get'
import isEmpty from 'lodash.isempty'
import eventsByPeriod from '@/queries/eventsByPeriod'
import EventsList from '@/components/Events/List'
import Search from '@/components/Events/Search'
import FilterByDate from '@/components/Events/FilterByDate'

export default {
  name: 'index',

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

    const response = {
      eventsByPeriod: {}
    }

    // init start/end date
    if (!params.start_date) {
      params.start_date = moment().startOf('day').format('YYYY-MM-DD')
    }

    if (!params.end_date) {
      params.end_date = moment().add(10, 'day').format('YYYY-MM-DD')
    }

    response.eventsByPeriod = await client.query({
        query: eventsByPeriod,
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
        return data.eventsByPeriod
      })

    return response
  },

  components: {
    EventsList,
    Search,
    FilterByDate
  },

  apollo: {
    eventsByPeriod: {
      prefetch: true,
      variables() {
        return {
          slug: this.$route.params.slug,
          start_date: this.start_date,
          end_date: this.end_date
        }
      },
      query: eventsByPeriod,
      watchLoading (isLoading) {
        if (isLoading) {
          this.startLoading()
        } else {
          this.stopLoading()
        }
      }
    }
  },

  data () {
    return {
      mode: 'all',
      today: moment().startOf('day'),
      start_date: moment().startOf('day').format('YYYY-MM-DD'),
      end_date: moment().add(10, 'day').format('YYYY-MM-DD'),
      start_date_original: moment().startOf('day').format('YYYY-MM-DD'),
      end_date_original: moment().add(10, 'day').format('YYYY-MM-DD')
    }
  },

  computed: {
    events() {
      return get(this.eventsByPeriod, 'events', {})
    },

    categories() {
      return get(this.eventsByPeriod, 'categories', {})
    },

    locations() {
      return get(this.eventsByPeriod, 'locations', {})
    },

    hasEvents () {
      return !isEmpty(this.events)
    },

    isCustomDatesChoosen () {
      let startDateChange = (this.start_date_original !== this.start_date)
      let endDateChange = (this.end_date_original !== this.end_date)

      return (startDateChange || endDateChange)
    }
  },

  methods: {
    ...mapActions('site', [
      'startLoading',
      'stopLoading'
    ]),

    changeMode (value) {
      this.mode = value
    },

    searchSetValue (key, val) {
      this.$set(this, key, val)
    },

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
