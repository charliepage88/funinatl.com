<template>
  <div class="centered-container">
    <Search @change="searchSetValue" />

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

    <section class="section mb-6 mt-6">
      <div class="centered-container">
        <template v-if="!mode || mode === 'all'">
          <template v-if="hasWeekdayEvents">
            <h3 class="subtitle has-text-centered is-4">This Week</h3>

            <div v-for="(rows, date) in weekdayEvents" :key="date">
              <h4 class="subtitle is-6 mt-12 mb-2">{{ date | dayOfWeek }}</h4>

              <events-list :events="rows" />
            </div>
          </template>

          <template v-if="hasWeekendEvents">
            <h3 class="subtitle has-text-centered is-4 mt-20">This Weekend</h3>

            <div v-for="(rows, date) in weekendEvents" :key="date">
              <h4 class="subtitle is-6 mt-12 mb-2">{{ date | dayOfWeek }}</h4>

              <events-list :events="rows" />
            </div>
          </template>
        </template>
      </div>
    </section>

    <template v-if="mode === 'recommended'">
      <span>recommended yo</span>
    </template>
  </div>
</template>

<script>
import moment from 'moment'
import groupBy from 'lodash.groupby'
import isEmpty from 'lodash.isempty'
import orderBy from 'lodash.orderby'
import Events from '@/queries/Events'
import EventsList from '@/components/Events/List'
import Search from '@/components/Events/Search'
import ResponsiveMixin from '@/mixins/ResponsiveMixin'

export default {
  name: 'index',

  asyncData({ params }) {
    console.log('asyncData')
    console.log(params)

    return {}
  },

  mixins: [
    ResponsiveMixin
  ],

  components: {
    EventsList,
    Search
  },

  apollo: {
    events: {
      prefetch: true,
      query: Events
    }
  },

  data () {
    return {
      mode: 'all',
      start_date: moment().startOf('day').format('YYYY-MM-DD'),
      end_date: moment().add(7, 'day').format('YYYY-MM-DD')
    }
  },

  computed: {
    groupedEvents () {
      if (!this.events || !this.events.length) {
        return []
      }

      return groupBy(this.events, 'start_date')
    },

    hasWeekdayEvents () {
      return !isEmpty(this.weekdayEvents)
    },

    weekdayEvents () {
      if (!this.events || !this.events.length) {
        return []
      }

      let filteredEvents = this.events.filter((event) => {
        let date = moment(event.start_date)

        let dayOfWeek = parseInt(date.format('d'))
        let ymd = date.format('YYYY-MM-DD')

        let validDate = (ymd >= this.start_date && ymd <= this.end_date)
        let isWeekday = (dayOfWeek !== 5 && dayOfWeek !== 6 && dayOfWeek !== 0)
        let areDatesEmpty = (!this.start_date || !this.end_date)

        if (isWeekday && (areDatesEmpty || validDate)) {
          return event
        }
      })

      let orderedEvents = orderBy(filteredEvents, [ 'start_date' ], [ 'asc'])

      let grouped = groupBy(orderedEvents, 'start_date')

      let events = {}

      for(let i in grouped) {
        let items = []

        for(let key in grouped[i]) {
          let item = grouped[i][key]

          item.start_at = item.start_time.replace(' PM', '').replace(':')

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
        let areDatesEmpty = (!this.start_date || !this.end_date)

        if (isWeekend && (areDatesEmpty || validDate)) {
          return event
        }
      })

      let orderedEvents = orderBy(filteredEvents, [ 'start_date' ], [ 'asc'])

      let grouped = groupBy(orderedEvents, 'start_date')

      let events = {}

      for(let i in grouped) {
        let items = []

        for(let key in grouped[i]) {
          let item = grouped[i][key]

          item.start_at = item.start_time.replace(' PM', '').replace(':')

          items.push(item)
        }

        events[i] = orderBy(items, [ 'start_at' ], [ 'asc' ])
      }

      return events
    }
  },

  methods: {
    changeMode (value) {
      this.mode = value
    },

    searchSetValue (key, val) {
      this.$set(this, key, val)
    }
  }
}
</script>
