<template>
  <div v-if="category">
    <filter-by-date @change="updateDate" />

    <h1 class="title is-1 is-size-3-tablet has-text-centered pt-2">
      {{ category.name }}
    </h1>

    <section class="section pt-0" v-if="hasEvents">
      <div class="centered-container">
        <div v-for="row in events" :key="row.label">
          <h3 class="subtitle has-text-centered is-2 mt-4">
            {{ row.label }}
          </h3>

          <div v-for="day in row.days" :key="day.date">
            <template v-if="day.events && day.events.length">
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
                    <b-dropdown hoverable aria-role="list">
                      <button class="button is-info" slot="trigger">
                        <span>Jump To Date</span>
                        <b-icon pack="fas" icon="caret-down"></b-icon>
                      </button>

                      <b-dropdown-item
                        aria-role="listitem"
                        v-for="val in availableDates"
                        :key="`date-${val.value}-${day.date}`"
                        @click.prevent="jumpToDate(value)"
                      >
                        {{ val.formatted }}
                      </b-dropdown-item>
                    </b-dropdown>
                  </div>
                </div>
              </nav>

              <events-list :events="day.events" />
            </template>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
import get from 'lodash.get'
import isEmpty from 'lodash.isempty'
// import categoryBySlug from '@/queries/categoryBySlug'
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
      // categoryBySlug: {},
      eventsByCategory: {}
    }

    if (!context.params.start_date) {
      context.params.start_date = moment().startOf('day').format('YYYY-MM-DD')
    }

    if (!context.params.end_date) {
      context.params.end_date = moment().add(2, 'week').format('YYYY-MM-DD')
    }

    // response.categoryBySlug = await client.query({
    //     query: categoryBySlug,
    //     variables: context.params
    //   })
    //   .then(({ data }) => {
    //     return data.categoryBySlug
    //   })

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
      return get(this.eventsByCategory, 'category', {})
    },

    events () {
      return get(this.eventsByCategory, 'events', {})
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
    // categoryBySlug: {
    //   prefetch: ({ route }) => ({ slug: route.params.slug }),
    //   variables() {
    //     return { slug: this.$route.params.slug }
    //   },
    //   query: categoryBySlug
    // },

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
