<template>
  <div class="container is-fluid pl-4 pr-4" v-if="event">
    <div class="centered-container">
      <div class="box shadow-md rounded">
        <!-- Main Event Info -->
        <div class="columns relative">
          <div
            class="column"
            :class="{ 'is-half': isDesktopOrWidescreen, 'is-two-thirds': !isDesktopOrWidescreen }"
          >
            <h1 class="title is-1 is-size-2-tablet">
              {{ event.name }}
            </h1>

            <h3 class="subtitle is-3 is-size-4-tablet mb-px-5">
              {{ event.start_date | friendlyDate }}
            </h3>

            <h3 class="subtitle is-6 is-size-6-tablet mb-2 text-grey-light">
              <span>{{ event.start_time }}</span>

              <span v-if="event.end_time"> - {{ event.end_time }}</span>
            </h3>

            <nav class="level mb-4">
              <div class="level-left">
                <h3 class="subtitle is-4 is-size-5-tablet">Price: {{ event.price }}</h3>
              </div>

              <div class="level-right">
                <span
                  class="tag is-success mr-2"
                  :class="{ 'is-medium': !isDesktopOrWidescreen, 'is-large': isDesktopOrWidescreen }"
                >
                  {{ event.category.name }}
                </span>
              </div>
            </nav>

            <div class="tags" v-if="event.tags.length">
              <NuxtLink
                v-for="(tag, tagIndex) in event.tags"
                :key="tag.slug"
                :to="`/tag/${tag.slug}`"
                class="tag is-info"
              >
                {{ tag.name }}
              </NuxtLink>
            </div>

            <div class="content mb-2" v-if="event.short_description">
              <p class="text-grey-darker">
                {{ event.short_description }}
              </p>
            </div>

            <div
              class="columns"
              :class="{ 'absolute bottom-0': isDesktopOrWidescreen }"
            >
              <div class="column is-narrow">
                <div class="columns">
                  <div class="column is-narrow pr-0" v-if="event.location.photo">
                    <NuxtLink :to="`/location/${event.location.slug}`">
                      <figure class="image is-64x64">
                        <img :alt="event.location.name" :src="event.location.photo">
                      </figure>
                    </NuxtLink>
                  </div>

                  <div class="column pl-1">
                    <h4 class="subtitle is-6 is-capitalized mt-1">
                      {{ event.location.name }}
                    </h4>
                  </div>
                </div>
              </div>

              <!-- family friendly (if active) -->
              <div class="column is-narrow" v-if="event.is_family_friendly">
                <div
                  class="tag is-warning p-px-22"
                  :class="{ 'is-medium': !isDesktopOrWidescreen, 'is-large': isDesktopOrWidescreen }"
                >
                  <b-icon
                    icon="child"
                    pack="fas"
                    :size="isDesktopOrWidescreen ? 'is-large' : 'is-medium'"
                  />
                  <span>Family Friendly</span>
                </div>
              </div>

              <!-- sold out (if active) -->
              <div class="column is-narrow" v-if="event.is_sold_out">
                <div
                  class="tag is-danger p-px-22"
                  :class="{ 'is-medium': !isDesktopOrWidescreen, 'is-large': isDesktopOrWidescreen }"
                >
                  <b-icon
                    icon="times-circle"
                    pack="fas"
                    :size="isDesktopOrWidescreen ? 'is-large' : 'is-medium'"
                  />
                  <span>Sold Out</span>
                </div>
              </div>

              <div class="column is-narrow" v-if="event.website">
                <nuxt-link :to="event.website" class="button is-indigo is-medium is-fullwidths">
                  <b-icon icon="ticket-alt" pack="fas" size="is-medium" />
                  <span class="ml-px-5">Venue Website</span>
                </nuxt-link>
              </div>
            </div>
          </div>

          <div
            class="column"
            :class="{ 'is-half': isDesktopOrWidescreen, 'is-one-third': !isDesktopOrWidescreen }"
          >
            <figure class="image is-16by9" v-if="event.photo">
              <img :alt="event.name" :src="event.photo">
            </figure>

            <div :class="{ 'mt-2': event.photo }" v-if="event.description">
              <p class="block text-grey-darker text-sm mr-2">
                {{ event.description }}
              </p>
            </div>
          </div>
        </div>

        <!-- List of Bands (if applicable) -->
        <template v-if="bands.length">
          <hr :class="{ 'mt-4': isDesktopOrWidescreen, 'mt-1': !isDesktopOrWidescreen }" />

          <h3
            class="subtitle is-2 is-size-4-tablet ml-1"
            :class="{ 'mt-4 mb-4': isDesktopOrWidescreen, 'mt-1 mb-2': !isDesktopOrWidescreen }"
          >
            Bands
          </h3>

          <div class="columns is-multiline ml-1 mb-2">
            <template v-for="(bandsChunk, index) in bands">
              <div
                class="column is-5 box rounded-lg shadow-lg has-background-info mb-0 mr-1"
                v-for="band in bandsChunk"
                :key="band.id"
              >
                <div class="columns">
                  <div class="column is-narrow" v-if="band.photo">
                    <figure
                      class="image"
                      :class="{ 'is-128x128': isDesktopOrWidescreen, 'is-64x64': !isDesktopOrWidescreen }"
                    >
                      <img :alt="band.name" :src="band.photo" />
                    </figure>
                  </div>

                  <div class="column has-text-left">
                    <h3 class="subtitle is-4 is-size-6-tablet has-text-white">
                      {{ band.name }}
                    </h3>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import chunk from 'lodash.chunk'
import get from 'lodash.get'
import eventBySlug from '@/queries/eventBySlug'
import ResponsiveMixin from '@/mixins/ResponsiveMixin'

export default {
  name: 'event-show',

  asyncData (context) {
    let client = context.app.apolloProvider.defaultClient

    return client.query({
        query: eventBySlug,
        params: context.params
      })
      .then(({ data }) => {
        return data
      })
  },

  mixins: [
    ResponsiveMixin
  ],

  computed: {
    event () {
      return this.eventBySlug
    },

    bands () {
      if (!this.event) {
        return []
      }

      let bands = get(this.event, 'bands', [])

      if (!bands || !bands.length) {
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
