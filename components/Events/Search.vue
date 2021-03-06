<template>
  <section class="hero is-info is-bold">
    <div class="hero-body" :class="{ 'pb-1 pt-1': isMobile }">
      <div class="columns" :class="{ 'is-multiline': !isDesktopOrWidescreen }">
        <div class="column" :class="{ 'is-half': isTablet, 'is-one-third': isDesktopOrWidescreen }">
          <b-field class="relative search-input-container">
            <input
              class="input is-large"
              type="search"
              v-model="query"
              placeholder="Search for an event"
              @input="update"
              v-on:blur="closeKeypad"
              @keydown.down="down"
              @keydown.up="up"
              @keydown="enter($event)"
              ref="searchInput"
              :loading="loading"
            >

            <div class="box absolute has-no-results p-2" v-if="hasNoResults">
              <span>
                No results found for <strong>{{ query }}</strong>
              </span>
            </div>

            <div class="absolute search-results-container" v-if="hasResults">
              <div
                class="has-background-white shadow-lg search-results"
              >
                <div
                  class="has-cursor-pointer p-px-5 result"
                  v-for="(event, index) in items"
                  :key="event.id"
                  :class="{ 'active': current === index, 'border-b-primary-1': !event.is_last }"
                  @mousedown="hit"
                  @mouseover="setActive(index)"
                  @click.prevent="goToUrl(`/event/${event.slug}`)"
                >
                  <div class="columns is-mobile">
                    <div
                      class="column is-3 mb-0 mt-px-5"
                      :class="{ 'pb-1': !event.is_last, 'pb-0': event.is_last }"
                      v-if="event.photo"
                    >
                      <figure class="image is-64x64">
                        <img :alt="event.name" :src="event.photo" />
                      </figure>
                    </div>

                    <div
                      class="column is-9 mb-0 mt-px-5"
                      :class="{ 'pb-1': !event.is_last, 'pb-0': event.is_last }"
                    >
                      <span class="has-text-black" v-html="event.highlight" />

                      <div class="columns is-mobile">
                        <div
                          class="column is-7"
                        >
                          <span class="has-text-grey-dark">
                            {{ event.start_date | friendlyDate }}
                          </span>
                        </div>

                        <div class="column is-5">
                          <span class="tag is-success">
                            {{ event.category.name }}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </b-field>
        </div>

        <div class="column" :class="{ 'is-half': isTablet, 'is-one-fifth': isDesktopOrWidescreen }">
          <b-field v-if="categories && categories.length">
            <b-select
              v-model="filters.category"
              placeholder="Category"
              icon="tasks"
              icon-pack="fas"
              size="is-large"
              @input="updateFilter"
              :loading="loading"
              class="is-fullwidth"
            >
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >
                {{ category.name }}
              </option>
            </b-select>
          </b-field>
        </div>

        <div class="column" :class="{ 'is-half': isTablet, 'is-one-fifth': isDesktopOrWidescreen }">
          <b-field v-if="locations && locations.length">
            <b-select
              v-model="filters.location"
              placeholder="Location"
              icon="map"
              icon-pack="fas"
              size="is-large"
              @input="updateFilter"
              :loading="loading"
              class="is-fullwidth"
            >
              <option
                v-for="location in locations"
                :key="location.id"
                :value="location.id"
              >
                {{ location.name }}
              </option>
            </b-select>
          </b-field>
        </div>

        <div
          class="column mt-1"
          :class="{ 'is-one-quarter': isTablet, 'is-2': isDesktop, 'is-one-fifth': isWidescreen }"
        >
          <b-field>
            <b-checkbox
              v-model="filters.is_family_friendly"
              @input="updateFilter"
              size="is-medium"
            >
              Family Friendly
            </b-checkbox>
          </b-field>
        </div>

        <div
          class="column has-text-right"
          :class="{ 'is-one-quarter': isTablet }"
        >
          <button class="button is-large is-danger is-fullwidth-mobile" @click.prevent="reset">
            Reset
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import moment from 'moment'
import SearchMixin from '@/mixins/SearchMixin'
import ResponsiveMixin from '@/mixins/ResponsiveMixin'

export default {
  name: 'search',

  props: {
    categories: {
      type: Array|Object,
      required: true
    },

    locations: {
      type: Array|Object,
      required: true
    }
  },

  mixins: [
    SearchMixin,
    ResponsiveMixin
  ],

  watch: {
    query (newVal, oldVal) {
      if (this.hasQuery) {
        this.$set(this.filters, 'query', newVal)
      }
    },

    items (newVal, oldVal) {
      if (newVal && newVal.length && this.loadAuto) {
        let items = this.items

        if (items.length) {
          let query = this.query

          let item = items.find((item) => {
            return item.slug === query
          })

          console.debug('watch -> items')
          console.debug(item)
          console.debug(item)

          this.items = []
        }

        this.loadAuto = false
      }
    },

    keyword (newVal, oldVal) {
      if (newVal !== oldVal) {
        this.query = newVal

        if (newVal) {
          this.loadAuto = true
          this.update()
        } else {
          this.reset()
        }
      }
    }
  },

  data () {
    return {
      start_date: moment().startOf('day').format('YYYY-MM-DD'),
      end_date: moment().add(7, 'day').format('YYYY-MM-DD'),
      loadAuto: false
    }
  },

  computed: {
    ...mapState('site', [
      'loading'
    ])
  },

  methods: {
    onHit (event) {
      this.$router.push(`/event/${event.slug}`)
    },

    closeKeypad () {
      document.activeElement.blur()

      Array.prototype.forEach.call(document.querySelectorAll('body, textarea'), function (it) {
        it.blur()
      })
    },

    reFocus () {
      if (!this.isMobile) {
        let self = this
        setTimeout(() => {
          if (self.$refs && typeof self.$refs.searchInput !== 'undefined') {
            self.$refs.searchInput.focus()
          }
        }, 100)
      }
    },

    prepareResponseData (results) {
      if (!results.events.length) {
        this.reFocus()

        return []
      }

      let eventsCount = (results.events.length - 1)

      let events = results.events.map((event, index) => {
        let src = event._source

        src.index = event._index

        if (event.highlight && event.highlight.name && event.highlight.name[0]) {
          src.highlight = event.highlight.name[0]
        } else {
          src.highlight = src.name
        }

        let isLast = (index === eventsCount)

        src.is_last = isLast

        return src
      })

      this.reFocus()

      return events
    },

    enter ($event, manualEnter = false) {
      if (($event && $event.keyCode !== 13) && !manualEnter) {
        return false
      }

      if (!this.hasItems) {
        this.loadAuto = true

        return true
      }

      if (this.hasItems) {
        let event = this.items[this.current]

        if (this.current >= 0 && event) {
          console.debug('enter')
          console.debug(event)

          this.$router.push(`/event/${event.slug}`)

          this.items = []
        }
      }
    },

    removeKeyWords () {
      this.query = ''
    },

    goToUrl (url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="sass" scoped>
.search-results
  width: 100%
  max-height: 252px!important
  overflow-y: scroll!important
  overflow-x: hidden

  .result
    width: 100%
    height: 84px

    &.active
      &:hover
        background-color: #209cee

.search-results-container
  min-width: 100%
  top: 55px!important
  left: 0
  border-radius: 2px
  box-shadow: 0 0 10px rgba(0,0,0, 0.25)
  z-index: 9
  max-height: 252px
  min-height: 84px

.has-no-results
  min-width: 100%
  top: 55px!important
  left: 0
  border-radius: 2px
  box-shadow: 0 0 10px rgba(0,0,0, 0.25)
  z-index: 9

.search-input-container
  width: 100%
</style>
