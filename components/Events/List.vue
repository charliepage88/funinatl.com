<template>
  <div class="row columns is-multiline" v-if="events.length">
    <div
      class="column has-cursor-pointer is-half-tablet is-one-third-desktop is-one-third-widescreen is-one-third-fullhd"
      v-for="event in events"
      :key="`event-${event.slug}`"
    >
      <div class="card large">
        <template v-if="!event.thumb_mobile && event.photo">
          <div class="card-image" v-if="event.photo">
            <NuxtLink :to="`/event/${event.slug}`">
              <figure class="image">
                <clazy-load class="clazy-load-wrapper" :src="event.photo" :ratio="0.1">
                  <transition name="fade">
                    <img :alt="event.name" class="event-image" :src="event.photo">
                  </transition>
                </clazy-load>
              </figure>
            </NuxtLink>
          </div>
        </template>

        <template v-if="event.thumb_mobile">
          <div class="card-image is-hidden-tablet" v-if="event.thumb_mobile">
            <NuxtLink :to="`/event/${event.slug}`">
              <figure class="image">
                <clazy-load class="clazy-load-wrapper" :src="event.thumb_mobile" :ratio="0.1">
                  <transition name="fade">
                    <img :alt="event.name" class="event-image" :src="event.thumb_mobile">
                  </transition>
                </clazy-load>
              </figure>
            </NuxtLink>
          </div>

          <div class="card-image is-hidden-mobile is-hidden-desktop" v-if="event.thumb_tablet">
            <NuxtLink :to="`/event/${event.slug}`">
              <figure class="image">
                <clazy-load class="clazy-load-wrapper" :src="event.thumb_tablet" :ratio="0.1">
                  <transition name="fade">
                    <img :alt="event.name" class="event-image" :src="event.thumb_tablet">
                  </transition>
                </clazy-load>
              </figure>
            </NuxtLink>
          </div>

          <div class="card-image is-hidden-touch" v-if="event.thumb_desktop">
            <NuxtLink :to="`/event/${event.slug}`">
              <figure class="image">
                <clazy-load class="clazy-load-wrapper" :src="event.thumb_desktop" :ratio="0.1">
                  <transition name="fade">
                    <img :alt="event.name" class="event-image" :src="event.thumb_desktop">
                  </transition>
                </clazy-load>
              </figure>
            </NuxtLink>
          </div>
        </template>

        <div class="card-content">
          <div class="media">
            <div class="media-left" v-if="event.location.thumb_small">
              <NuxtLink :to="`/location/${event.location.slug}`">
                <figure class="image is-128x128">
                  <clazy-load class="clazy-load-wrapper" :src="event.location.thumb_small" :ratio="0.1">
                    <transition name="fade">
                      <img :alt="event.location.name" :src="event.location.thumb_small">
                    </transition>
                  </clazy-load>
                </figure>
              </NuxtLink>

              <span class="tag is-success is-medium is-w-128">
                <NuxtLink :to="`/category/${event.category.slug}`" class="has-text-white has-no-underline">
                  {{ event.category.name }}
                </NuxtLink>
              </span>
            </div>

            <div class="media-content">
              <h4 class="title is-3 is-size-4-mobile is-capitalized">
                <NuxtLink :to="`/event/${event.slug}`" class="has-text-black has-no-underline">
                  {{ event.name }}
                </NuxtLink>
              </h4>

              <h5 class="subtitle is-5 is-size-6-mobile is-capitalized">
                <NuxtLink :to="`/location/${event.location.slug}`" class="has-no-underline">
                  {{ event.location.name }}
                </NuxtLink>
              </h5>
            </div>
          </div>

          <div class="content">
            <!-- start/end date -->
            <h4 class="title is-5 is-size-5-mobile has-text-normal has-text-grey-dark has-text-centered" v-if="event.end_date">
              {{ event.start_date | fullDate }} - {{ event.end_date | fullDate }}
            </h4>

            <h4 class="title is-5 is-size-5-mobile has-text-normal has-text-grey-dark has-text-centered" v-else>
              {{ event.start_date | fullDate }}
            </h4>

            <!-- start time/end time -->
            <h4 class="subtitle is-5 is-size-5-mobile has-text-normal has-text-grey-light has-text-centered" v-if="event.end_time">
              {{ event.start_time }} - {{ event.end_time }}
            </h4>

            <h4 class="subtitle is-5 is-size-5-mobile has-text-normal has-text-grey-light has-text-centered" v-else>
              {{ event.start_time }}
            </h4>

            <!-- price -->
            <b-button
              type="is-light"
              class="is-centered"
              size="is-large"
            >
              {{ event.price }}
            </b-button>

            <!-- family friendly (if active) -->
            <div class="is-hidden-tablet" v-if="event.is_family_friendly">
              <b-button
                type="is-warning"
                icon-left="child"
                icon-pack="fas"
                size="is-large"
                class="mt-2 is-fullwidth"
              >
                Family Friendly
              </b-button>
            </div>

            <!-- descriptions -->
            <p class="has-text-grey-dark mt-2" v-if="event.short_description">
              {{ event.short_description | truncate(200) }}
            </p>

            <!-- family friendly (if active) -->
            <!-- <b-button
              type="is-warning"
              icon-left="child"
              icon-pack="fas"
              size="is-medium"
              v-if="event.is_family_friendly"
              class="is-centered"
              :class="{ 'mt-1': !event.short_description }"
            >
              Family Friendly
            </b-button> -->

            <!-- tags list (if any) -->
            <div class="tags absolute bottom-5 left-10 mb-0 mt-1" v-if="event.tags.length">
              <NuxtLink
                v-for="tag in event.tags"
                :key="tag.slug"
                :to="`/tag/${tag.slug}`"
                class="tag block is-info is-small has-text-white has-no-underline"
              >
                {{ tag.name }}
              </NuxtLink>
            </div>

            <!-- family friendly (if active) -->
            <div class="absolute bottom-10 right-10 is-hidden-mobile" v-if="event.is_family_friendly">
              <b-button
                type="is-warning"
                icon-left="child"
                icon-pack="fas"
                size="is-small"
              >
                Family Friendly
              </b-button>
            </div>
          </div>

          <footer class="card-footer" v-if="1 === 2">
            <p class="card-footer-item">

            </p>
          </footer>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ResponsiveMixin from '@/mixins/ResponsiveMixin'

export default {
  name: 'events-list',

  mixins: [
    ResponsiveMixin
  ],

  props: {
    events: {
      type: Array
    }
  }
}
</script>

<style lang="sass" scoped>
.event-image
  width: 100%!important
  height: 250px!important
</style>
