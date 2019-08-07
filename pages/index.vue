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
        >All Events</a>
        <a
          class="no-underline outline-none text-grey-dark border-b-2 uppercase tracking-wide font-bold text-xs py-3 ml-8"
          @click.prevent="changeMode('recommended')"
          :class="{ 'border-gray-800': mode === 'recommended', 'border-transparent': mode !== 'recommended' }"
        >Recommended</a>
      </div>
    </nav>

    <filter-by-date @change="updateDate" />

    <section class="section pt-0">
      <div class="centered-container">
        <template v-show="mode === 'all' && isCustomDatesChoosen">
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
        </template>

        <template v-show="mode === 'all' && !isCustomDatesChoosen">

          <template v-show="hasWeekdayEvents">
            <h3 class="subtitle has-text-centered is-2">This Week's Events</h3>

            <div v-for="(rows, date) in weekdayEvents" :key="date">
              <h4 class="subtitle is-4 mt-5 mb-2">{{ date | dayOfWeek }}</h4>

              <events-list :events="rows" />
            </div>
          </template>

          <template v-show="hasWeekendEvents">
            <h3 class="subtitle has-text-centered is-2 mt-8">This Weekend's Events</h3>

            <div v-for="(rows, date) in weekendEvents" :key="date">
              <h4 class="subtitle is-4 mt-5 mb-2">{{ date | dayOfWeek }}</h4>

              <events-list :events="rows" />
            </div>
          </template>

          <template v-show="hasNextWeekdayEvents">
            <h3 class="subtitle has-text-centered is-2 mt-8">Next Week's Events</h3>

            <div v-for="(rows, date) in nextWeekdayEvents" :key="date">
              <h4 class="subtitle is-4 mt-6 mb-2">{{ date | dayOfWeek }}</h4>

              <events-list :events="rows" />
            </div>
          </template>

          <template v-show="hasNextWeekendEvents">
            <h3 class="subtitle has-text-centered is-2 mt-8">Next Weekend's Events</h3>

            <div v-for="(rows, date) in nextWeekendEvents" :key="date">
              <h4 class="subtitle is-4 mt-6 mb-2">{{ date | dayOfWeek }}</h4>

              <events-list :events="rows" />
            </div>
          </template>
        </template>
      </div>
    </section>

    <template v-show="mode === 'recommended'">
      <span>recommended yo</span>
    </template>
  </div>
</template>

<script>
import moment from 'moment'
import groupBy from 'lodash.groupby'
import isEmpty from 'lodash.isempty'
import orderBy from 'lodash.orderby'
import Events from '@/queries/events'
import Categories from '@/queries/categories'
import Locations from '@/queries/locations'
import EventsList from '@/components/Events/List'
import Search from '@/components/Events/Search'
import FilterByDate from '@/components/Events/FilterByDate'
import ResponsiveMixin from '@/mixins/ResponsiveMixin'

export default {
  name: 'index',

  scrollToTop: true,

  async asyncData (context) {
    let client = context.app.apolloProvider.defaultClient

    const response = {
      events: [],
      categories: [],
      locations: []
    }

    response.events = await client.query({
        query: Events,
        variables: context.params
      })
      .then(({ data }) => {
        return data.events
      })

    response.categories = await client.query({
        query: Categories,
        variables: context.params
      })
      .then(({ data }) => {
        return data.categories
      })

    response.locations = await client.query({
        query: Locations,
        variables: context.params
      })
      .then(({ data }) => {
        return data.locations
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
    events: {
      prefetch: true,
      query: Events
    },

    categories: {
      prefetch: true,
      query: Categories
    },

    locations: {
      prefetch: true,
      query: Locations
    }
  },

  data () {
    return {
      mode: 'all',
      today: moment().startOf('day'),
      start_date: moment().startOf('day').format('YYYY-MM-DD'),
      end_date: moment().add(7, 'day').format('YYYY-MM-DD'),
      start_date_original: moment().startOf('day').format('YYYY-MM-DD'),
      end_date_original: moment().add(7, 'day').format('YYYY-MM-DD')
    }
  },

  computed: {
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
      if (!this.events || !this.events.length) {
        return false
      } else {
        return true
      }
    },

    availableDates () {
      if (!this.hasEvents) {
        return []
      }

      let dates = []

      if (this.isCustomDatesChoosen) {
        dates.push(Object.keys(this.groupedEvents))
      } else {
        if (this.hasWeekdayEvents) {
          dates.push(Object.keys(this.weekdayEvents))
        }

        if (this.hasWeekendEvents) {
          dates.push(Object.keys(this.weekendEvents))
        }

        if (this.hasNextWeekdayEvents) {
          dates.push(Object.keys(this.nextWeekdayEvents))
        }

        if (this.hasNextWeekendEvents) {
          dates.push(Object.keys(this.nextWeekendEvents))
        }
      }

      if (dates.length) {
        dates = [].concat.apply([], dates)
      }

      return dates.slice(0, 10)
    },

    hasWeekdayEvents () {
      return !isEmpty(this.weekdayEvents)
    },

    weekdayEvents () {
      if (!this.hasEvents) {
        return []
      }

      let firstWeekendDate = null
      if (this.hasWeekendEvents) {
        firstWeekendDate = moment(Object.keys(this.weekendEvents)[0])
      }

      let filteredEvents = this.events.filter((event) => {
        let date = moment(event.start_date)

        let dayOfWeek = parseInt(date.format('d'))
        let ymd = date.format('YYYY-MM-DD')

        let validDate = (ymd >= this.start_date && ymd <= this.end_date)
        let isWeekday = (dayOfWeek !== 5 && dayOfWeek !== 6 && dayOfWeek !== 0)

        // no weekday events should show
        // if date > first weekend event
        let shouldShow = true
        if (firstWeekendDate) {
          let diff = date.diff(firstWeekendDate, 'days')

          if (diff > 0) {
            shouldShow = false
          }
        }

        if (isWeekday && validDate && shouldShow) {
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

    hasNextWeekdayEvents () {
      return !isEmpty(this.nextWeekdayEvents)
    },

    nextWeekdayEvents () {
      if (!this.events || !this.events.length) {
        return []
      }

      // current weekday dates
      // should be removed form here
      let dates = []
      if (this.hasWeekdayEvents) {
        dates.push(Object.keys(this.weekdayEvents))
      }

      if (dates.length) {
        dates = [].concat.apply([], dates)
      }

      // get first weekend date to restrict
      let firstWeekendDate = null
      if (this.hasNextWeekendEvents) {
        firstWeekendDate = moment(Object.keys(this.nextWeekendEvents)[0])
      }

      let filteredEvents = this.events.filter((event) => {
        let date = moment(event.start_date)

        let dayOfWeek = parseInt(date.format('d'))
        let ymd = date.format('YYYY-MM-DD')

        let validDate = (ymd >= this.start_date && ymd <= this.end_date)
        let isWeekday = (dayOfWeek !== 5 && dayOfWeek !== 6 && dayOfWeek !== 0)

        // no weekday events should show
        // if date > first weekend event
        let shouldShow = true
        if (firstWeekendDate) {
          let diff = date.diff(firstWeekendDate, 'days')

          if (diff > 0) {
            shouldShow = false
          }
        }

        // exlude any events with date
        // already in use
        if (shouldShow && dates.length) {
          shouldShow = (dates.indexOf(ymd) === -1)
        }

        if (isWeekday && validDate && shouldShow) {
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

    hasWeekendEvents () {
      return !isEmpty(this.weekendEvents)
    },

    weekendEvents () {
      if (!this.events || !this.events.length) {
        return []
      }

      let filteredEvents = this.events.filter((event) => {
        let date = moment(event.start_date)

        let dayOfWeek = parseInt(date.format('d'))
        let ymd = date.format('YYYY-MM-DD')

        let validDate = (ymd >= this.start_date && ymd <= this.end_date)
        let isWeekend = (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0)

        if (isWeekend && validDate) {
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

          item.start_at = item.start_time.replace(' PM', '')
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

    hasNextWeekendEvents () {
      return !isEmpty(this.nextWeekendEvents)
    },

    nextWeekendEvents () {
      if (!this.events || !this.events.length) {
        return []
      }

      // current weekend dates
      // should be removed form here
      let dates = []
      if (this.hasWeekendEvents) {
        dates.push(Object.keys(this.weekendEvents))
      }

      if (dates.length) {
        dates = [].concat.apply([], dates)
      }

      let filteredEvents = this.events.filter((event) => {
        let date = moment(event.start_date)

        let dayOfWeek = parseInt(date.format('d'))
        let ymd = date.format('YYYY-MM-DD')

        let validDate = (ymd >= this.start_date && ymd <= this.end_date)
        let isWeekend = (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0)

        // exlude any events with date
        // already in use
        let shouldShow = true
        if (dates.length) {
          shouldShow = (dates.indexOf(ymd) === -1)
        }

        if (isWeekend && validDate && shouldShow) {
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

          item.start_at = item.start_time.replace(' PM', '')
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
