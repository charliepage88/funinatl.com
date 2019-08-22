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
                    <h4
                      class="subtitle is-4 mb-2"
                      :class="{ 'mt-2': isMobile, 'mt-3': !isMobile }"
                    >
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
import eventsByTag from '@/queries/eventsByTag'
import FilterByDate from '@/components/Events/FilterByDate'
import EventsList from '@/components/Events/List'
import ResponsiveMixin from '@/mixins/ResponsiveMixin'

export default {
  name: 'tag-show',

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
      eventsByTag: {}
    }

    response.eventsByTag = await client.query({
        query: eventsByTag,
        variables: params
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
      return get(this.eventsByTag, 'tag', {})
    },

    events () {
      return get(this.eventsByTag, 'events', {})
    },

    hasEvents () {
      return !isEmpty(this.events)
    },

    title () {
      let value = `Atlanta Events - ${this.tag.name} | FunInATL`

      return value
    },

    description () {
      let value = `Atlanta events with tag ${this.tag.name}.`

      return value
    }
  },

  apollo: {
    eventsByTag: {
      prefetch: true,
      // prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return {
          slug: this.$route.params.slug,
          start_date: this.start_date,
          end_date: this.end_date
        }
      },
      query: eventsByTag
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
