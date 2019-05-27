<template>
  <div>
    <section class="bg-indigo-800 h-50 p-4">
      <div class="container mx-auto py-4">
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
      <div class="container mx-auto">
        <h3 class="text-2xl text-center">Events</h3>

        <div class="flex flex-wrap justify-center" v-if="events && events.length && 1 === 2">
          <div class="sm:w-full md:w-full lg:w-1/3 xl:w-1/3 m-3 rounded shadow-lg overflow-hidden" v-for="event in events" :key="event.id">
            <div v-if="event.photo" class="h-48 lg:h-48 lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" :style="{ backgroundImage: `url(${event.photo})` }">
            </div>
            <div class="border-r border-b border-l border-grey-light lg:border-l-0 lg:border-t lg:border-grey-light bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div class="mb-8">
                <p class="text-sm text-grey-dark flex items-center">
                  Members only
                </p>
                <div class="text-black font-bold text-xl mb-2">{{ event.name }}</div>
                <p class="text-grey-darker text-base">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.</p>
              </div>
              <div class="flex items-center">
                <img v-if="event.location && event.location.photo" class="w-10 h-10 rounded-full mr-4" :src="event.location.photo" alt="Avatar of Jonathan Reinink">
                <div class="text-sm">
                  <p class="text-black leading-none">{{ event.location.name }}</p>
                  <p class="text-grey-dark">{{ event.start_date }} {{ event.start_time }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="container my-12 mx-auto px-4 md:px-12" v-if="groupedEvents && groupedEvents.length">
      <div class="flex flex-wrap -mx-1 lg:-mx-4 xl:-mx-2">
        <!-- Column -->
        <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 xl:w-1/3 xl:px-2" v-for="event in groupedEvents" :key="event.id">
          <!-- Article -->
          <article class="overflow-hidden rounded-lg shadow-lg">
            <NuxtLink :to="`event/${event.slug}`">
              <img v-if="event.photo" :alt="event.name" class="block h-64 w-64" :src="event.photo">
            </NuxtLink>

            <header class="flex items-center justify-between leading-tight p-2 md:p-4">
              <h1 class="text-lg">
                <a class="no-underline hover:underline text-black" href="#">
                  {{ event.name }}
                </a>
              </h1>
              <p class="text-grey-darker text-sm">
                {{ event.start_date | normalDate }} @ {{ event.start_time }}
                <br v-if="event.end_time">
                <span v-if="event.end_time">{{ event.end_time }}</span>
              </p>
            </header>

            <footer class="flex items-center justify-between leading-none p-2 md:p-4">
              <NuxtLink :to="`location/${event.location.slug}`" class="flex items-center no-underline hover:underline text-black">
                <img v-if="event.location.photo" :alt="event.location.name" class="block rounded-full w-8 h-8" :src="event.location.photo">
                <p class="ml-2 text-sm">
                  {{ event.location.name }}
                </p>
              </NuxtLink>

              <a class="no-underline text-grey-darker hover:text-red-dark" href="#">
                <span class="hidden">Like</span>
                <i class="fa fa-heart"></i>
              </a>
            </footer>
          </article>
          <!-- END Article -->
        </div>
        <!-- END Column -->
      </div>
    </div>
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

const searchClient = algoliasearch(
  process.env.ALGOLIA_APP_ID,
  process.env.ALGOLIA_KEY
)

const { instantsearch, rootMixin } = createInstantSearch({
  searchClient,
  indexName: process.env.ALGOLIA_SEARCH_INDEX
})

import Events from '@/queries/Events'

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

  filters: {
    normalDate: function (value) {
      let date = moment(value)

      return date.format('dddd, MMMM Do')
    }
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
    AisPagination
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

  computed: {
    groupedEvents () {
      if (!this.events || !this.events.length) {
        return []
      }

      return this.events.slice(0, 12)
    }
  }
}
</script>
