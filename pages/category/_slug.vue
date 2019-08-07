<template>
  <div v-if="category">
    <filter-by-date @change="updateDate" />

    <h1 class="title is-1 is-size-3-tablet has-text-centered pt-2">
      {{ category.name }}
    </h1>

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
import categoryBySlug from '@/queries/categoryBySlug'
import eventsByCategory from '@/queries/eventsByCategory'
import FilterByDate from '@/components/Events/FilterByDate'
import EventsList from '@/components/Events/List'
import ResponsiveMixin from '@/mixins/ResponsiveMixin'

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

  async asyncData (context) {
    let client = context.app.apolloProvider.defaultClient

    const response = {
      categoryBySlug: {},
      eventsByCategory: []
    }

    response.categoryBySlug = await client.query({
        query: categoryBySlug,
        variables: context.params
      })
      .then(({ data }) => {
        return data.categoryBySlug
      })

    response.eventsByCategory = await client.query({
        query: eventsByCategory,
        variables: context.params
      })
      .then(({ data }) => {
        return data.eventsByCategory
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
    category () {
      return this.categoryBySlug
    },

    events () {
      return this.eventsByCategory
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

    title () {
      let value = `Atlanta Events - ${this.category.name} | FunInATL`

      return value
    },

    description () {
      let value = `Atlanta events for category ${this.category.name}.`

      return value
    }
  },

  apollo: {
    categoryBySlug: {
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return { slug: this.$route.params.slug }
      },
      query: categoryBySlug
    },

    eventsByCategory: {
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return { slug: this.$route.params.slug }
      },
      query: eventsByCategory
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
