<template>
  <div>
    <!-- Main Event Info -->
    <div class="columns relative" :class="{ 'is-multiline': !isDesktopOrWidescreen }">
      <div
        class="column is-full is-half-desktop is-half-widescreen has-text-centered-mobile"
      >
        <h1 class="title is-1 is-size-2-tablet is-size-3-mobile">
          {{ event.name }}
        </h1>

        <h3 class="subtitle is-3 is-size-4-tablet is-size-4-mobile mb-px-5">
          {{ event.start_date | friendlyDate }}
        </h3>

        <h3 class="subtitle is-6 is-size-6-tablet is-size-6-mobile mb-2 has-text-grey-light">
          <span>{{ event.start_time }}</span>

          <span v-if="event.end_time"> - {{ event.end_time }}</span>
        </h3>

        <nav class="level is-mobile mb-4">
          <div class="level-left">
            <h3 class="subtitle is-4 is-size-5-tablet is-size-5-mobile">
              Price: {{ event.price }}
            </h3>
          </div>

          <div class="level-right">
            <NuxtLink
              :to="`/category/${event.category.slug}`"
              class="tag is-success has-no-underline mr-computer-2 is-large"
            >
              {{ event.category.name }}
            </NuxtLink>
          </div>
        </nav>

        <div class="tags" v-if="event.tags.length">
          <NuxtLink
            v-for="(tag, tagIndex) in event.tags"
            :key="tag.slug"
            :to="`/tag/${tag.slug}`"
            class="tag is-info has-no-underline"
          >
            {{ tag.name }}
          </NuxtLink>
        </div>

        <div class="content mb-2" v-if="event.short_description">
          <p class="has-text-grey-darker">
            {{ event.short_description }}
          </p>
        </div>

        <div
          class="columns is-absolute-computer is-bottom-computer-0"
        >
          <div class="column is-narrow" v-if="event.location">
            <div class="columns" :class="{ 'is-mobile': isTablet }">
              <div class="column is-narrow pr-0" v-if="event.location.photo">
                <nuxt-link :to="`/location/${event.location.slug}`">
                  <figure class="image mr-mobile-1" :class="{ 'is-64x64': !isMobile }">
                    <img :alt="event.location.name" :src="event.location.photo">
                  </figure>
                </nuxt-link>
              </div>

              <div class="column pl-1">
                <nuxt-link :to="`/location/${event.location.slug}`">
                  <h4 class="subtitle is-6 is-size-4-mobile is-size-6-tablet is-capitalized mt-1">
                    {{ event.location.name }}
                  </h4>
                </nuxt-link>
              </div>
            </div>
          </div>

          <!-- family friendly (if active) -->
          <div class="column is-narrow" v-if="event.is_family_friendly">
            <div
              class="tag is-warning p-px-22 is-fullwidth-mobile"
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
              class="tag is-danger p-px-22 is-fullwidth-mobile"
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
            <a
              :href="event.website"
              target="_blank"
              class="button is-indigo is-medium is-fullwidth-mobile"
            >
              <b-icon icon="ticket-alt" pack="fas" size="is-medium" />
              <span class="ml-px-5">Venue Website</span>
            </a>
          </div>
        </div>
      </div>

      <div class="column is-full is-half-desktop is-half-widescreen">
        <figure class="image is-16by9" v-if="event.photo">
          <img :alt="event.name" :src="event.photo">
        </figure>

        <div :class="{ 'mt-2': event.photo }" v-if="event.description">
          <p class="block has-text-grey-darker mr-2">
            {{ event.description }}
          </p>
        </div>
      </div>
    </div>

    <!-- List of Bands (if applicable) -->
    <template v-if="bands.length">
      <hr class="mt-computer-3 mt-handheld-1" />

      <h3
        class="subtitle is-2 is-size-4-tablet ml-1 mt-computer-3 mb-computer-3 mt-handheld-1 mb-handheld-2"
      >
        Bands
      </h3>

      <div class="columns is-multiline ml-1 mb-2">
        <template v-for="(bandsChunk, index) in bands">
          <div
            class="column is-5 box rounded-lg shadow-lg has-background-info mb-2 mr-1"
            v-for="band in bandsChunk"
            :key="band.id"
          >
            <div class="columns">
              <div class="column is-narrow" v-if="band.photo">
                <figure class="image is-128x128 is-hidden-touch">
                  <img :alt="band.name" :src="band.photo" />
                </figure>
                <figure class="image is-64x64 is-hidden-desktop">
                  <img :alt="band.name" :src="band.photo" />
                </figure>
              </div>

              <div class="column has-text-left">
                <h3 class="title is-4 is-size-6-tablet has-text-white">
                  {{ band.name }}
                </h3>
              </div>
            </div>
          </div>
        </template>
      </div>
    </template>
  </div>
</template>

<script>
import chunk from 'lodash.chunk'
import get from 'lodash.get'
import eventBySlug from '@/queries/eventBySlug'
import ResponsiveMixin from '@/mixins/ResponsiveMixin'

export default {
  name: 'view-event',

  props: [
    'event'
  ],

  mixins: [
    ResponsiveMixin
  ],

  computed: {
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
  }
}
</script>
