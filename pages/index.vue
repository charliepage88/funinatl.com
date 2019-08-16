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
      <section class="section pt-0" v-if="hasEvents">
        <div class="centered-container">
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
                    <div class="level-item">
                      <h4
                        class="subtitle is-4 mb-2"
                        :class="{ 'mt-2': isMobile, 'mt-3': !isMobile }"
                      >
                        {{ day.date | dayOfWeek }}
                      </h4>
                    </div>
                  </div>

                  <div class="level-right" v-if="isCustomDatesChoosen && 1 === 2">
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
                          :v-scroll-to="`#events-${day.date}`"
                          :has-link="true"
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
    </template>

    <template v-show="mode === 'recommended'">
      <span>recommended yo</span>
    </template>
  </div>
</template>

<script>
import moment from 'moment'
import get from 'lodash.get'
import isEmpty from 'lodash.isempty'
import eventsByPeriod from '@/queries/eventsByPeriod'
import EventsList from '@/components/Events/List'
import Search from '@/components/Events/Search'
import FilterByDate from '@/components/Events/FilterByDate'
import ResponsiveMixin from '@/mixins/ResponsiveMixin'

export default {
  name: 'index',

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
      eventsByPeriod: {}
    }

    response.eventsByPeriod = await client.query({
        query: eventsByPeriod,
        variables: context.params
      })
      .then(({ data }) => {
        return data.eventsByPeriod
      })

    return response
  },

  mixins: [
    ResponsiveMixin
  ],

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
      query: eventsByPeriod
    }
  },

  data () {
    return {
      mode: 'all',
      today: moment().startOf('day'),
      start_date: moment().startOf('day').format('YYYY-MM-DD'),
      end_date: moment().add(2, 'week').format('YYYY-MM-DD'),
      start_date_original: moment().startOf('day').format('YYYY-MM-DD'),
      end_date_original: moment().add(2, 'week').format('YYYY-MM-DD')
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

    isCustomDatesChoosen () {
      let startDateChange = (this.start_date_original !== this.start_date)
      let endDateChange = (this.end_date_original !== this.end_date)

      return (startDateChange || endDateChange)
    }
  },

  methods: {
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
