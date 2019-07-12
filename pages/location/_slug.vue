<template>
  <div class="container mx-auto" v-if="location">
    <section class="section mb-6 mt-6">
      <div class="container mx-auto px-12 md:px-4">
        <template v-if="hasWeekdayEvents">
          <h3 class="font-bold text-center text-3xl">This Week</h3>

          <div v-for="(rows, date) in weekdayEvents" :key="date">
            <h4 class="font-bold text-left text-xl mt-12 mb-2">{{ date | dayOfWeek }}</h4>

            <events-list :events="rows" />
          </div>
        </template>

        <template v-if="hasWeekendEvents">
          <h3 class="font-bold text-center text-3xl mt-20">This Weekend</h3>

          <div v-for="(rows, date) in weekendEvents" :key="date">
            <h4 class="font-bold text-left text-xl mt-12 mb-2">{{ date | dayOfWeek }}</h4>

            <events-list :events="rows" />
          </div>
        </template>
      </div>
    </section>
  </div>
</template>

<script>
import locationBySlug from '@/queries/locationBySlug'

export default {
  name: 'location-show',

  asyncData({ params }) {
    console.log('asyncData')
    console.log(params)

    return {}
  },

  computed: {
    location () {
      return this.locationBySlug
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

        if (isWeekday && validDate) {
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

        if (isWeekend && validDate) {
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

  apollo: {
    locationBySlug: {
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return { slug: this.$route.params.slug }
      },
      query: locationBySlug
    }
  }
}
</script>
