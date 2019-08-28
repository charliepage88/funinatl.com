<template>
  <div v-if="hasCategory">
    <filter-by-date @change="updateDate" />

    <h1 class="title is-1 is-size-1-desktop is-size-3-tablet has-text-centered pt-2">
      {{ category.name }}
    </h1>

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
            <div v-for="day in row.days" :key="day.date">
              <nav class="level">
                <div class="level-left">
                  <div class="level-item">
                    <h4 class="subtitle is-4 mb-2 mt-mobile-2 mt-tablet-3 mt-computer-3">
                      {{ day.date | dayOfWeek }}
                    </h4>
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
import eventsByCategory from '@/queries/eventsByCategory'
import FilterByDate from '@/components/Events/FilterByDate'
import EventsList from '@/components/Events/List'

export default {
  name: 'category-show',

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
      params.end_date = moment().add(2, 'week').format('YYYY-MM-DD')
    }

    // fetch data from apollo
    let client = app.apolloProvider.defaultClient

    const response = {
      eventsByCategory: {}
    }

    response.eventsByCategory = await client.query({
        query: eventsByCategory,
        variables: params
      })
      .then(({ data }) => {
        return data.eventsByCategory
      })

    return response
  },

  components: {
    FilterByDate,
    EventsList
  },

  computed: {
    category () {
      return get(this.eventsByCategory, 'category', {})
    },

    events () {
      return get(this.eventsByCategory, 'events', {})
    },

    hasEvents () {
      return !isEmpty(this.events)
    },

    hasCategory () {
      return !isEmpty(this.category)
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

    title () {
      if (!this.hasCategory) {
        return null
      }

      let value = `Atlanta Events - ${this.category.name} | FunInATL`

      return value
    },

    description () {
      if (!this.hasCategory) {
        return null
      }

      let value = `Atlanta events for category ${this.category.name}.`

      return value
    }
  },

  apollo: {
    eventsByCategory: {
      // prefetch: ({ route }) => ({
      //   slug: route.params.slug,
      //   start_date: route.params.start_date
      // }),
      prefetch: true,
      variables() {
        return {
          slug: this.$route.params.slug,
          start_date: this.start_date,
          end_date: this.end_date
        }
      },
      query: eventsByCategory
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
