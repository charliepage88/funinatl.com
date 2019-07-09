<template>
  <div class="container mx-auto">
    <section class="bg-indigo-800 h-50 p-4">
      <div class="py-4">
        <div class="relative">
          <input
            class="w-2/5 h-16 px-3 rounded mb-8 focus:outline-none focus:shadow-outline text-xl px-8 shadow-lg"
            type="search"
            v-model="query"
            placeholder="Search for an event"
            @input="update"
            v-on:blur="closeKeypad"
            @keydown.down="down"
            @keydown.up="up"
            @keydown="enter($event)"
            @keyup.escape="reset"
            ref="searchInput"
          />

          <select
            v-model="filters.category"
            class="w-1/6 h-16 px-3 rounded mb-8 shadow-lg focus:outline-none focus:shadow-outline text-xl"
          >
            <option value="null">Category</option>
            <option
              v-for="category in categories"
              :key="category.id"
              :value="category.id"
            >{{ category.name }}</option>
          </select>

          <select
            v-model="filters.location"
            class="w-1/6 h-16 px-3 rounded mb-8 shadow-lg focus:outline-none focus:shadow-outline text-xl"
          >
            <option value="null">Location</option>
            <option
              v-for="location in locations"
              :key="location.id"
              :value="location.id"
            >{{ location.name }}</option>
          </select>

          <div class="w-1/5 h-16 inline-block align-middle px-3 mt-0">
            <div class="flex flex-wrap">
              <div class="w-1/2 pt-3">
                <label class="font-bold text-white text-sm">Family Friendly</label>
              </div>

              <div class="w-1/2 pt-3">
                <Checkbox
                  v-model="filters.is_family_friendly"
                />
              </div>
            </div>
          </div>

          <div class="has-no-results absolute left-0 font-sans flex w-full py-8" style="top: 35px;" v-if="query && query.length && emptyItems">
            <p class="text-gray-700">
              No results found for <strong>{{ query }}</strong>
            </p>
          </div>

          <div class="absolute left-0 font-sans flex w-full py-8" style="top: 35px;" v-if="hasItems && query && query.length">
            <div
              class="overflow-hidden text-sm bg-white rounded max-w-xs w-full shadow-lg leading-normal search-results"
            >
              <div
                class="block group hover:bg-blue-300 p-2 border border-blue-300"
                v-for="(event, index) in items"
                :key="event.id"
                :class="{ 'active': current === index }"
                @mousedown="hit"
                @mouseover="setActive(index)"
              >
                <div class="flex flex-wrap">
                  <div class="w-1/4" v-if="event.photo">
                    <img :alt="event.name" class="block h-16 w-16" :src="event.photo" />
                  </div>

                  <div class="w-3/4">
                    <div
                      class="w-full font-bold text-sm mb-1 text-black group-hover:text-white"
                    >
                      {{ event.name }}
                    </div>

                    <div class="flex w-full">
                      <div
                        class="w-2/3 text-grey-darker mb-2 group-hover:text-white"
                      >
                        {{ event.start_date | friendlyDate }}
                      </div>

                      <div
                        class="w-1/3 m-0 text-white mb-2 pr-1 pl-1 rounded text-xs bg-blue-500 hover:bg-blue-800 no-underline text-center"
                      >
                        {{ event.category.name }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <nav class="flex">
          <a
            class="no-underline text-white py-3 px-4 font-medium mr-3 bg-indigo-500 hover:bg-indigo-600"
            href="#"
          >Cardamom</a>
          <a
            class="no-underline text-white py-3 px-4 font-medium mx-3 bg-indigo-600 hover:bg-indigo"
            href="#"
          >Cinnamon</a>
          <a
            class="no-underline text-white py-3 px-4 font-medium mx-3 bg-indigo-500 hover:bg-indigo-600"
            href="#"
          >Chamomille</a>
          <a
            class="no-underline text-white py-3 px-4 font-medium mx-3 bg-indigo-600 hover:bg-indigo"
            href="#"
          >Apple</a>
          <a
            class="no-underline text-white py-3 px-4 font-medium mx-3 bg-indigo-500 hover:bg-indigo-600"
            href="#"
          >Mint</a>
          <a
            class="no-underline text-white py-3 px-4 font-medium mx-3 bg-indigo-600 hover:bg-indigo"
            href="#"
          >Curry</a>
          <a
            class="no-underline text-white py-3 px-4 font-medium mx-3 bg-indigo-500 hover:bg-indigo-600"
            href="#"
          >Fragrance</a>
          <a
            class="no-underline text-white py-3 px-4 font-medium ml-auto bg-indigo-600 hover:bg-indigo"
            href="#"
          >Amchoor</a>
        </nav>
      </div>
    </section>

    <nav class="bg-white px-8 pt-2 shadow-md" v-if="1 === 2">
      <div class="-mb-px flex justify-center">
        <a
          class="no-underline outline-none text-teal-dark border-b-2 uppercase tracking-wide font-bold text-xs py-3 mr-8"
          @click.prevent="changeMode('all')"
          :class="{ 'border-gray-800': mode === 'all', 'border-transparent': mode !== 'all' }"
        >All Events</a>
        <a
          class="no-underline outline-none text-grey-dark border-b-2 uppercase tracking-wide font-bold text-xs py-3 ml-8"
          @click.prevent="changeMode('recommended')"
          :class="{ 'border-gray-800': mode === 'recommended', 'border-transparent': mode !== 'recommended' }"
        >Recommended</a>
      </div>
    </nav>

    <section class="section mb-6 mt-6">
      <div class="container mx-auto px-12 md:px-4">
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
      <span>recommended yo</span>
    </template>
  </div>
</template>

<script>
import moment from 'moment'
import groupBy from 'lodash.groupby'
import isEmpty from 'lodash.isempty'
import orderBy from 'lodash.orderby'
import Events from '@/queries/Events'
import Categories from '@/queries/Categories'
import Locations from '@/queries/Locations'
import EventsList from '@/components/Events/List'
import Checkbox from '@/components/Common/Checkbox'
import SearchMixin from '@/mixins/SearchMixin'
import ResponsiveMixin from '@/mixins/ResponsiveMixin'

export default {
  name: 'index',

  asyncData({ params }) {
    console.log('asyncData')
    console.log(params)

    return {}
  },

  mixins: [
    SearchMixin,
    ResponsiveMixin
  ],

  components: {
    EventsList,
    Checkbox
  },

  apollo: {
    events: {
      prefetch: true,
      query: Events
    },

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
      if (this.query && this.query.length) {
        this.$set(this.filters, 'query', newVal)
      }

      if (this.query && this.query.length && this.emptyItems) {
        this.emptyItems = false
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
      mode: 'all',
      start_date: moment().startOf('day').format('YYYY-MM-DD'),
      end_date: moment().add(7, 'day').format('YYYY-MM-DD'),
      loadAuto: false,
      emptyItems: false
    }
  },

  filters: {
    friendlyDate: function (date) {
      return moment(date).format('dddd, MMM Do')
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
    },

    onHit (event) {
      console.log('onHit -> item')
      console.log(event)

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
      if (!results.data.length) {
        if (!this.hasItems) {
          this.emptyItems = true
        }

        this.reFocus()

        return []
      }

      return results.data
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
