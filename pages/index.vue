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

    <section class="section">
      <div class="container mx-auto px-12">
        <template v-if="!mode || mode === 'all'">
          <template v-if="hasWeekdayEvents">
            <h3 class="font-bold text-center text-3xl -ml-4">This Week</h3>

            <div v-for="(rows, date) in weekdayEvents" :key="date">
              <h4 class="font-bold text-left text-xl ml-12">{{ date | dayOfWeek }}</h4>

              <events-list :events="rows" />
            </div>
          </template>

          <template v-if="hasWeekendEvents">
            <h3 class="font-bold text-center text-3xl">This Weekend</h3>

            <div v-for="(rows, date) in weekendEvents" :key="date">
              <h4 class="font-bold text-left text-xl ml-12">{{ date | dayOfWeek }}</h4>

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

        if (dayOfWeek !== 0 && dayOfWeek !== 6 && validDate) {
          return event
        }
      })

      let grouped = groupBy(filteredEvents, 'start_date')

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

      let events = this.events.filter((event) => {
        let date = moment(event.start_date)

        let dayOfWeek = parseInt(date.format('d'))
        let ymd = date.format('YYYY-MM-DD')

        let validDate = (ymd >= this.start_date && ymd <= this.end_date)

        if ((dayOfWeek === 0 || dayOfWeek === 6) && validDate) {
          return event
        }
      })

      return groupBy(events, 'start_date')
    }
  }
}
</script>
