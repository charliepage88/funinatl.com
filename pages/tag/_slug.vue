<template>
  <div v-if="tag">
    <filter-by-date @change="updateDate" />

    <div class="columns is-centered p-2">
      <div class="column has-text-centered">
        <span class="tag is-info is-large title is-1 is-size-3-tablet">
          {{ tag.name }}
        </span>
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
import tagBySlug from '@/queries/tagBySlug'
import eventsByTag from '@/queries/eventsByTag'
import FilterByDate from '@/components/Events/FilterByDate'
import EventsList from '@/components/Events/List'
import ResponsiveMixin from '@/mixins/ResponsiveMixin'

export default {
  name: 'tag-show',

  scrollToTop: true,

  async asyncData (context) {
    let client = context.app.apolloProvider.defaultClient

    const response = {
      tagBySlug: {},
      eventsByTag: []
    }

    response.tagBySlug = await client.query({
        query: tagBySlug,
        variables: context.params
      })
      .then(({ data }) => {
        return data.tagBySlug
      })

    response.eventsByTag = await client.query({
        query: eventsByTag,
        variables: context.params
      })
      .then(({ data }) => {
        return data.eventsByTag
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
    tag () {
      return this.tagBySlug
    },

    events () {
      return this.eventsByTag
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
    }
  },

  apollo: {
    tagBySlug: {
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return { slug: this.$route.params.slug }
      },
      query: tagBySlug
    },

    eventsByTag: {
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return { slug: this.$route.params.slug }
      },
      query: eventsByTag
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
