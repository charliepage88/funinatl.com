<template>
  <div class="container mx-auto px-32 sm:px-0 md:px-8 lg:px-16 xl:px-32" v-if="event">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <!-- Main Event Info -->
      <div class="flex flex-wrap mb-8">
        <div class="w-1/2 sm:w-full md:w-1/2">
          <h1 class="text-3xl mb-2">{{ event.name }}</h1>

          <h3 class="text-xl mb-2">{{ event.start_date | friendlyDate }}</h3>

          <h3 class="mb-2 text-gray-600">
            <span>{{ event.start_time }}</span>

            <span v-if="event.end_time"> - {{ event.end_time }}</span>
          </h3>

          <h3 class="mt-4 mb-2">Price: {{ event.price }}</h3>

          <h2 class="text-xl mb-2 mt-8">Additional Info</h2>

          <div v-if="event.is_family_friendly" class="block">
            <i class="fas fa-child mr-1"></i>
            <span class="text-gray-800 inline-block float-right">Family Friendly</span>
          </div>

          <div class="flex flex-wrap tags ml-2" v-if="event.tags.length">
            <NuxtLink
              v-for="(tag, tagIndex) in event.tags"
              :key="tag.slug"
              :to="`tags/${tag.slug}`"
              class="text-white font-bold py-1 px-2 rounded text-sm bg-blue-500 hover:bg-blue-800 no-underline"
              :class="{ 'mr-1': event.tags.length > 1 && tagIndex < (event.tags.length - 1) }"
            >
              {{ tag.name }}
            </NuxtLink>
          </div>

          <div class="w-1/4 mb-4">
            <div
              class="block text-white p-2 rounded bg-blue-500 hover:bg-blue-800 no-underline text-center"
            >
              {{ event.category.name }}
            </div>
          </div>

          <NuxtLink :to="`/location/${event.location.slug}`" class="flex items-center no-underline text-black hover:text-gray-800">
            <img v-if="event.location.photo" :alt="event.location.name" class="block rounded-full w-8 h-8" :src="event.location.photo">
            <p class="ml-2 text-lg">
              {{ event.location.name }}
            </p>
          </NuxtLink>

          <div class="flex">
            <nuxt-link :to="event.website" class="block mt-8 w-1/3" target="_blank">
              <div class="flex rounded border-b-2 border-gray-700 overflow-hidden">
                <button class="block text-white text-sm shadow-border bg-purple-600 hover:bg-purple-800 text-lg py-3 px-4 tracking-wide font-bold w-3/4">
                  Venue Website
                </button>
                <div class="bg-purple-400 hover:bg-purple-700 shadow-border p-3 w-1/4">
                  <div class="w-8 h-8 ml-1 text-white">
                    <i class="fas fa-ticket-alt fa-2x"></i>
                  </div>
                </div>
              </div>
            </nuxt-link>
          </div>
        </div>

        <div class="w-1/2 sm:w-full md:w-1/2">
          <img :alt="event.name" class="block h-auto w-auto" :src="event.photo" v-if="event.photo">

          <div class="flex flex-wrap mt-8">
            <p class="block text-grey-darker text-sm mr-2" v-if="event.short_description">
              {{ event.short_description }}
            </p>

            <p class="block text-grey-darker text-sm mr-2" v-if="event.description">
              {{ event.description }}
            </p>
          </div>
        </div>
      </div>

      <!-- List of Bands (if applicable) -->
      <template v-if="bands.length">
        <h3 class="block text-xl mt-16 mb-4">Bands</h3>

        <div class="flex flex-wrap">
          <template v-for="bandsChunk in bands">
            <div
              class="block group rounded-lg w-2/5 shadow-lg bg-blue-300 p-2"
              v-for="(band, index) in bandsChunk"
              :key="band.id"
              :class="{ 'ml-2': index === 1 }"
            >
              <div class="flex">
                <div class="w-1/3" v-if="band.photo">
                  <img :alt="band.name" class="block h-48 w-48" :src="band.photo" />
                </div>

                <div class="w-2/3 text-center">
                  <span class="text-gray-700 text-xl">
                    {{ band.name }}
                  </span>
                </div>
              </div>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import chunk from 'lodash.chunk'
import get from 'lodash.get'
import eventBySlug from '@/queries/eventBySlug'

export default {
  name: 'event-show',

  asyncData({ params }) {
    console.log('asyncData')
    console.log(params)

    return {}
  },

  filters: {
    friendlyDate: function (date) {
      return moment(date).format('dddd, MMM Do')
    }
  },

  computed: {
    event () {
      return this.eventBySlug
    },

    bands () {
      if (!this.event) {
        return []
      }

      let bands = get(this.event, 'bands', [])

      if (!bands.length) {
        return []
      }

      return chunk(this.event.bands, 2)
    }
  },

  data () {
    return {
      mode: 'event'
    }
  },

  methods: {
    changeMode (value) {
      this.mode = value
    }
  },

  apollo: {
    eventBySlug: {
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return { slug: this.$route.params.slug }
      },
      query: eventBySlug
    }
  }
}
</script>
