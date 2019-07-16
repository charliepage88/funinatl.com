<template>
  <section class="hero is-info">
    <div class="hero-body">
      <div class="columns">
        <div class="column">
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
                >
                  <div class="columns">
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
                      <span class="has-text-black" v-html="item.highlight" />

                      <div class="columns">
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

        <div class="column is-3">
          <b-field>
            <b-select
              v-model="filters.category"
              placeholder="Category"
              icon="tasks"
              icon-pack="fas"
              size="is-large"
              @input="updateFilter"
              :loading="loading"
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

        <div class="column is-3">
          <b-field>
            <b-select
              v-model="filters.location"
              placeholder="Location"
              icon="map"
              icon-pack="fas"
              size="is-large"
              @input="updateFilter"
              :loading="loading"
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

        <div class="column is-narrow mt-1">
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

        <div class="column is-narrow">
          <button class="button is-large is-danger" @click.prevent="reset">
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
import Categories from '@/queries/Categories'
import Locations from '@/queries/Locations'

export default {
  name: 'search',

  mixins: [
    SearchMixin
  ],

  components: {

  },

  apollo: {
    categories: {
      prefetch: true,
      query: Categories
    },

    locations: {
      prefetch: true,
      query: Locations
    }
  },

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

          console.log('watch -> items')
          console.log(item)
          console.log(item)

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
        let src = item._source

        src.index = item._index

        if (item.highlight && item.highlight.name && item.highlight.name[0]) {
          src.highlight = item.highlight.name[0]
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
          console.log('enter')
          console.log(event)

          this.$router.push(`/event/${event.slug}`)

          this.items = []
        }
      }
    },

    removeKeyWords () {
      this.query = ''
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
  z-index: 2
  max-height: 252px
  min-height: 84px

.has-no-results
  min-width: 100%
  top: 55px!important
  left: 0
  border-radius: 2px
  box-shadow: 0 0 10px rgba(0,0,0, 0.25)
  z-index: 2

.search-input-container
  width: 100%
</style>
