import debounce from 'lodash.debounce'
import cloneDeep from 'lodash.clonedeep'
import { mapMutations } from 'vuex'

export default {
  name: 'search-mixin',

  data () {
    return {
      items: [],
      query: '',
      current: -1,
      params: {},
      visibleItems: 3,
      minChars: 2,
      src: `${process.env.API_ENDPOINT}/api/events/search/`,
      filters: {
        category: null,
        location: null,
        is_family_friendly: false,
        query: '',
        start_date: null,
        end_date: null
      },
      hasDoneSearch: false
    }
  },

  computed: {
    hasQuery () {
      return this.query && this.query.length
    },

    hasItems () {
      return this.items.length > 0
    },

    itemsCount () {
      return this.hasItems ? this.items.length : 0
    },

    isEmpty () {
      return !this.query
    },

    isDirty () {
      return !!this.query
    },

    hasNoResults () {
      return this.hasQuery && !this.hasItems && this.hasDoneSearch
    },

    hasResults () {
      return this.hasQuery && this.hasItems
    }
  },

  methods: {
    ...mapMutations('site', [
      'startLoading',
      'stopLoading'
    ]),

    update: debounce(
      function () {
        if (!this.hasQuery) {
          return this.reset()
        }

        if (this.minChars && this.query.length < this.minChars) {
          return
        }

        this.startLoading()

        this.fetch()
          .then((response) => {
            if (response && this.query) {
              // set search results
              let data = response.data

              data = this.prepareResponseData ? this.prepareResponseData(data) : data

              this.items = this.limit ? data.slice(0, this.limit) : data
              this.current = -1
              this.hasDoneSearch = true
            }
          })
          .finally(() => {
            this.stopLoading()
          })
      }, 300),

    updateFilter () {
      if (this.hasQuery) {
        this.update()
      }
    },

    fetch () {
      if (!this.$axios) {
        console.error(`You need to provide a HTTP client`)

        return
      }

      if (!this.src) {
        console.error('You need to set the `src` property')

        return
      }

      let src = cloneDeep(this.src)

      if (this.query && this.query.length) {
        src += `?query=${this.query}`
      }

      if (this.filters.location) {
        src += `&location=${this.filters.location}`
      }

      if (this.filters.category) {
        src += `&category=${this.filters.category}`
      }

      if (this.filters.is_family_friendly) {
        src += `&is_family_friendly=${this.filters.is_family_friendly}`
      }

      if (this.filters.start_date) {
        src += `&start_date=${this.filters.start_date}`
      }

      if (this.filters.end_date) {
        src += `&end_date=${this.filters.end_date}`
      }

      let params = this.data

      params = Object.assign(this.params, params)

      let cancel = new Promise((resolve) => this.cancel = resolve)
      let request = this.$axios.get(src, { params })

      return Promise.race([ cancel, request ])
    },

    cancel () {
      // used to 'cancel' previous searches
      // this.stopLoading()
    },

    reset () {
      console.log('reset')

      this.items = []
      this.query = ''
      this.current = -1
      this.hasDoneSearch = false

      this.filters = {
        category: null,
        location: null,
        is_family_friendly: false,
        query: '',
        start_date: null,
        end_date: null
      }
    },

    setActive (index) {
      this.current = index
    },

    hit () {
      if (this.current !== -1) {
        let item = this.items[this.current]

        if (!item) {
          return false
        }

        this.onHit(item)

        this.items = []
      }
    },

    up () {
      let searchResults = this.$el.querySelector('.search-results')

      if (!searchResults) {
        return false
      }

      if (this.current === 0) {
        return false
      }

      if ((this.current - 1) >= 0) {
        this.current--
      } else {
        this.current = 0
      }

      if (this.current < this.visibleItems) {
        searchResults.scrollTop = 0
      }

      if (this.current && this.current % (this.visibleItems) === 0 && searchResults.scrollTop !== 0) {
        searchResults.scrollTop = ((this.current + 1) - this.visibleItems) * 84
      }
    },

    down () {
      let searchResults = this.$el.querySelector('.search-results')

      if (!searchResults) {
        return false
      }

      let itemsCount = this.itemsCount

      if ((this.current + 1) === itemsCount) {
        return false
      }

      if (this.current < (itemsCount - 1)) {
        this.current++
      } else {
        this.current = (itemsCount - 1)
      }

      if (this.current && this.current % this.visibleItems === 0) {
        searchResults.scrollTop = (this.current) * 84
      } else {
        if ((searchResults.scrollTop - ((this.current) * 84)) <= -342) {
          searchResults.scrollTop = (this.current) * 84
        }
      }
    },

    checkVisible (elm) {
      var rect = elm.getBoundingClientRect()
      var viewHeight = Math.max(document.documentElement.clientHeight, window.innerHeight)

      return !(rect.bottom < 0 || rect.top - viewHeight >= 0)
    }
  }
}
