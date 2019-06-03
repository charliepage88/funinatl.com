<template>
  <div class="container mx-auto">
    <section class="bg-indigo-800 h-50 p-4">
      <div class="py-4">
        <ais-instant-search-ssr>
          <ais-autocomplete :indices="[{ label: 'Events', value: 'funinatl_events' }]">
            <div slot-scope="{ currentRefinement, indices, refine }">
              <input
                class="w-full h-16 px-3 rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg"
                type="search"
                :value="currentRefinement"
                placeholder="Search for an event"
                @input="refine($event.currentTarget.value)"
              >
              <template v-if="currentRefinement">
                <ul v-for="index in indices" :key="index.label">
                  <template v-if="index.label === 'Events'">
                    <li v-for="hit in index.hits" :key="hit.objectID">
                      <ais-highlight attribute="name" :hit="hit"/>
                    </li>
                  </template>
                </ul>
              </template>
            </div>
          </ais-autocomplete>
        </ais-instant-search-ssr>

        <nav class="flex">
          <a class="no-underline text-white py-3 px-4 font-medium mr-3 bg-indigo-500 hover:bg-indigo-600" href="#">Cardamom</a>
          <a class="no-underline text-white py-3 px-4 font-medium mx-3 bg-indigo-600 hover:bg-indigo" href="#">Cinnamon</a>
          <a class="no-underline text-white py-3 px-4 font-medium mx-3 bg-indigo-500 hover:bg-indigo-600" href="#">Chamomille</a>
          <a class="no-underline text-white py-3 px-4 font-medium mx-3 bg-indigo-600 hover:bg-indigo" href="#">Apple</a>
          <a class="no-underline text-white py-3 px-4 font-medium mx-3 bg-indigo-500 hover:bg-indigo-600" href="#">Mint</a>
          <a class="no-underline text-white py-3 px-4 font-medium mx-3 bg-indigo-600 hover:bg-indigo"  href="#">Curry</a>
          <a class="no-underline text-white py-3 px-4 font-medium mx-3 bg-indigo-500 hover:bg-indigo-600" href="#">Fragrance</a>
          <a class="no-underline text-white py-3 px-4 font-medium ml-auto bg-indigo-600 hover:bg-indigo" href="#">Amchoor</a>
        </nav>
      </div>
    </section>

    <nav class="bg-white px-8 pt-2 shadow-md">
     <div class="-mb-px flex justify-center">
      <a
        class="no-underline text-teal-dark border-b-2 uppercase tracking-wide font-bold text-xs py-3 mr-8"
        href=""
        @click.prevent="changeMode('all')"
        :class="{ 'border-gray-800': mode === 'all', 'border-transparent': mode !== 'all' }"
      >
        All Events
      </a>
      <a
        class="no-underline text-grey-dark border-b-2 uppercase tracking-wide font-bold text-xs py-3 ml-8"
        href=""
        @click.prevent="changeMode('recommended')"
        :class="{ 'border-gray-800': mode === 'recommended', 'border-transparent': mode !== 'recommended' }"
      >
        Recommended
      </a>
     </div>
    </nav>

    <section class="section mb-6 mt-6">
      <div class="container mx-auto px-12">
        <template v-if="!mode || mode === 'all'">
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
        </template>
      </div>
    </section>

    <template v-if="mode === 'recommended'">
      <span>recommended</span>
    </template>
  </div>
</template>

<script>
import {
  AisInstantSearchSsr,
  AisRefinementList,
  AisHits,
  AisHighlight,
  AisSearchBox,
  AisStats,
  AisPagination,
  createInstantSearch
} from 'vue-instantsearch'
import algoliasearch from 'algoliasearch/lite'
import moment from 'moment'
import groupBy from 'lodash.groupby'
import isEmpty from 'lodash.isempty'
import orderBy from 'lodash.orderby'

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_KEY
)

const { instantsearch, rootMixin } = createInstantSearch({
  searchClient,
  indexName: process.env.ALGOLIA_SEARCH_INDEX
})

import Events from '@/queries/Events'
import EventsList from '@/components/Events/List'

export default {
  name: 'index',

  asyncData({ params }) {
    console.log(params)
    return instantsearch
      .findResultsState({
        // find out which parameters to use here using ais-state-results
        query: '',
        hitsPerPage: 5,
        facets: ['*'],
        // disjunctiveFacets: [ 'events' ],
        // disjunctiveFacetsRefinements: { brand: ['Apple'] }
      })
      .then(() => ({
        instantSearchState: instantsearch.getState()
      }))
  },

  beforeMount() {
    instantsearch.hydrate(this.instantSearchState)
  },

  mixins: [
    rootMixin
  ],

  components: {
    AisInstantSearchSsr,
    AisRefinementList,
    AisHits,
    AisHighlight,
    AisSearchBox,
    AisStats,
    AisPagination,
    EventsList
  },

  head() {
    return {
      link: [
        {
          rel: 'stylesheet',
          href:
            'https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/algolia-min.css'
        }
      ]
    }
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
      end_date: moment().endOf('week').add(1, 'day').format('YYYY-MM-DD')
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

  methods: {
    changeMode (value) {
      this.mode = value
    }
  }
}
</script>
