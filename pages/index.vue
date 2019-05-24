<template>
  <div class="container mx-auto">
    <section class="bg-indigo-800 h-50 p-4">
      <div class="container mx-auto py-4">
        <ais-instant-search-ssr>
          <!-- <input class="w-full h-16 px-3 rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg" type="search" placeholder="Search..."> -->
          <ais-search-box />
          <ais-stats />
          <ais-refinement-list attribute="name" />
          <ais-hits>
            <template
              slot="item"
              slot-scope="{ item }"
            >
              <p>
                <ais-highlight
                  attribute="name"
                  :hit="item"
                />
              </p>
              <p>
                <ais-highlight
                  attribute="location.name"
                  :hit="item"
                />
              </p>
            </template>
          </ais-hits>
          <ais-pagination />
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

        <div class="flex flex-wrap justify-center" v-if="events && events.length">
          <div class="sm:w-full md:w-full lg:w-1/3 xl:w-1/3 m-3 rounded shadow-lg overflow-hidden" v-for="event in events" :key="event.id">
            <div v-if="event.photo" class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden" :style="{ backgroundImage: `url(${event.photo})` }">
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

        <ul v-if="events && events.length && 1 === 2">
          <li v-for="event in events" :key="event.id">
            <NuxtLink :to="`event/${event.slug}`">
              {{ event.name }} - {{ event.start_date }} @ {{ event.start_time }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>
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

  asyncData() {
    return instantsearch
      .findResultsState({
        // find out which parameters to use here using ais-state-results
        query: '',
        hitsPerPage: 5,
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
  }
}
</script>
