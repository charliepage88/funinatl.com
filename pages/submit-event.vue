<template>
  <div class="container is-fluid is-content" v-if="hasCategories && hasLocations">
    <form @submit.prevent="submit">
      <h1 class="title is-1 is-size-2-tablet">Submit Event</h1>

      <p class="has-text-grey-light mb-2">
        See an event upcoming in Atlanta that's not listed here? Please feel free to use the form below. After a review period, we'll publish it to the site.
      </p>

      <div class="columns is-multiline">
        <div class="column is-half">
          <div class="field">
            <label class="label">
              Event Name
              <span class="has-text-danger is-italic">*</span>
            </label>

            <input
              class="input is-medium"
              id="name"
              type="text"
              v-model="form.name"
              :class="{ 'is-danger': errors.name }"
            />

            <p class="help is-danger" v-if="errors.name">Please fill out this field.</p>
          </div>
        </div>

        <div class="column is-one-quarter">
          <div class="field">
            <label class="label">
              Location
            </label>

            <div class="control">
              <div
                class="select is-medium is-fullwidth"
                :class="{ 'is-danger': errors.location_id }"
              >
                <select v-model="form.location_id">
                  <option value="null">Choose Location</option>
                  <option
                    v-for="location in locations"
                    :key="location.id"
                    :value="location.id"
                  >
                    {{ location.name }}
                  </option>
                </select>
              </div>
            </div>

            <p class="help is-danger" v-if="errors.location_id">Please fill out this field.</p>
          </div>
        </div>

        <div class="column is-one-quarter">
          <div class="field">
            <label class="label">
              Category
              <span class="has-text-danger is-italic">*</span>
            </label>

            <div class="control">
              <div
                class="select is-medium is-fullwidth"
                :class="{ 'is-danger': errors.category_id }"
              >
                <select v-model="form.category_id">
                  <option value="null">Choose Category</option>
                  <option
                    v-for="category in categories"
                    :key="category.id"
                    :value="category.id"
                  >
                    {{ category.name }}
                  </option>
                </select>
              </div>
            </div>

            <p class="help is-danger" v-if="errors.category_id">Please fill out this field.</p>
          </div>
        </div>

        <div class="column is-one-quarter">
          <div class="field">
            <label class="label">
              Start Date
              <span class="has-text-danger is-italic">*</span>
            </label>

            <b-datepicker
              v-model="form.start_date"
              :min-date="minDate"
              :max-date="maxDate"
              :first-day-of-week="1"
              size="is-medium"
              :class="{ 'is-danger': errors.start_date }"
              :date-formatter="formatDate"
            />

            <p class="help is-danger" v-if="errors.start_date">Please fill out this field.</p>
          </div>
        </div>

        <div class="column is-one-quarter">
          <div class="field">
            <label class="label">
              End Date
            </label>

            <b-datepicker
              v-model="form.end_date"
              :min-date="minDate"
              :max-date="maxDate"
              :first-day-of-week="1"
              size="is-medium"
              :class="{ 'is-danger': errors.end_date }"
              :date-formatter="formatDate"
            />
          </div>
        </div>

        <div class="column is-one-quarter">
          <div class="field">
            <label class="label">
              Start Time
              <span class="has-text-danger is-italic">*</span>
            </label>

            <b-timepicker
              v-model="form.start_time"
              :class="{ 'is-danger': errors.start_time }"
              :time-formatter="formatTime"
              size="is-small"
              hour-format="12"
              inline
            />

            <p class="help is-danger" v-if="errors.start_time">Please fill out this field.</p>
          </div>
        </div>

        <div class="column is-one-quarter">
          <div class="field">
            <label class="label">
              End Time
            </label>

            <b-timepicker
              v-model="form.end_time"
              :class="{ 'is-danger': errors.end_time }"
              :time-formatter="formatTime"
              size="is-small"
              hour-format="12"
              inline
            />
          </div>
        </div>

        <div class="column is-one-quarter">
          <div class="field">
            <label class="label">
              Price
              <span class="has-text-danger is-italic">*</span>
            </label>

            <input
              class="input is-medium"
              type="text"
              v-model="form.price"
              :class="{ 'is-danger': errors.price }"
            />

            <p class="help is-danger" v-if="errors.price">Please fill out this field.</p>
          </div>
        </div>

        <div class="column is-one-quarter">
          <b-field class="mt-2">
            <b-checkbox
              v-model="form.is_family_friendly"
              size="is-medium"
            >
              Family Friendly
            </b-checkbox>
          </b-field>
        </div>

        <div class="column is-half">
          <div class="field">
            <label class="label">
              Website URL
              <span class="has-text-danger is-italic">*</span>
            </label>

            <input
              class="input is-medium"
              type="text"
              v-model="form.website"
              :class="{ 'is-danger': errors.website }"
            />

            <p class="help is-danger" v-if="errors.website">Please fill out this field.</p>
          </div>
        </div>

        <div class="column is-half">
          <div class="field">
            <label class="label">
              Description
            </label>

            <textarea
              class="textarea is-medium"
              id="description"
              v-model="form.description"
              rows="6"
            />
          </div>
        </div>

        <div class="column is-12">
          <button
            type="submit"
            class="button is-large is-info is-fullwidth"
          >
            Submit
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'
import ToastMixin from '@/mixins/ToastMixin'
import RecaptchaMixin from '@/mixins/RecaptchaMixin'
import Categories from '@/queries/categories'
import Locations from '@/queries/locations'

export default {
	name: 'submit-event',

  head () {
    return {
      title: 'Atlanta Events - Submit Event | FunInATL',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Let FunInATL know about an upcoming event not already listed.'
        }
      ]
    }
  },

  async asyncData ({ $axios, $payloadURL, route, app, params, payload }) {
    // get payload locally if available
    if (process.static && process.client) {
      return await $axios.$get($payloadURL(route))
    }

    // return payload if available
    if (payload) {
      return payload
    }

    // fetch data from apollo
    let client = app.apolloProvider.defaultClient

    const response = {
      categories: [],
      locations: []
    }

    response.categories = await client.query({
        query: Categories,
        variables: params,
        watchLoading (isLoading) {
          if (isLoading) {
            this.startLoading()
          } else {
            this.stopLoading()
          }
        }
      })
      .then(({ data }) => {
        return data.categories
      })

    response.locations = await client.query({
        query: Locations,
        variables: params,
        watchLoading (isLoading) {
          if (isLoading) {
            this.startLoading()
          } else {
            this.stopLoading()
          }
        }
      })
      .then(({ data }) => {
        return data.locations
      })

    return response
  },

  computed: {
    hasCategories () {
      return (this.categories && this.categories.length)
    },

    hasLocations () {
      return (this.locations && this.locations.length)
    }
  },

	apollo: {
    categories: {
      query: Categories,
      watchLoading (isLoading) {
        if (isLoading) {
          this.startLoading()
        } else {
          this.stopLoading()
        }
      },
      skip () {
        return this.hasCategories
      }
    },

    locations: {
      query: Locations,
      watchLoading (isLoading) {
        if (isLoading) {
          this.startLoading()
        } else {
          this.stopLoading()
        }
      },
      skip () {
        return this.hasLocations
      }
    }
  },

  mixins: [
    ToastMixin,
    RecaptchaMixin
  ],

  data () {
    return {
      form: {
        name: null,
        location_id: null,
        category_id: null,
        start_date: null,
        end_date: null,
        start_time: null,
        end_time: null,
        price: null,
        description: null,
        is_family_friendly: false,
        website: null
      },

      errors: {
        name: false,
        category_id: false,
        start_date: false,
        start_time: false,
        price: false,
        website: false
      },

      minDate: moment().toDate(),
      maxDate: moment().add(4, 'month').toDate()
    }
  },

  methods: {
    ...mapActions('site', [
      'submitEvent',
      'startLoading',
      'stopLoading'
    ]),

    async submit () {
      // tmp override for checkboxes
      if (typeof this.form.is_family_friendly === 'undefined') {
        this.$set(this.form, 'is_family_friendly', false)
      }

      // validate form & return errors if any
      let validate = this.validate()

      if (!validate) {
        this.toastError('Errors found, please correct the form and try again.')

        return false
      }

      // check recaptcha & add to form
      let recaptcha = await this.submitRecaptcha()

      if (!recaptcha.status) {
        this.toastError(recaptcha.error)

        return false
      } else {
        this.$set(this.form, 'recaptcha_token', this.recaptcha_token)
      }

      // hit API with form data
      let resp = await this.submitEvent(this.form)

      if (resp.status) {
        let msg = 'Event has been submitted, thank you! Please allow for 24-48 hours for us to review, before going on the site.'

        this.toastSuccess(msg)

        this.form = {
          name: null,
          location_id: null,
          category_id: null,
          start_date: null,
          end_date: null,
          start_time: null,
          end_time: null,
          price: null,
          description: null,
          is_family_friendly: false,
          website: null
        }
      } else {
        console.error(resp.errors)

        this.toastError('Could not submit event, please try again.')
      }
    },

    validate () {
      let errorsCount = 0

      for (let i in this.form) {
        let value = this.form[i]

        if (typeof this.errors[i] !== 'undefined') {
          let hasError = (value ? false : true)

          if (hasError) {
            errorsCount++
          }

          this.$set(this.errors, i, hasError)
        }
      }

      return errorsCount === 0
    },

    formatDate (date) {
      return moment(date).format('YYYY-MM-DD')
    },

    formatTime (time) {
      return moment(time).format('h:m A')
    }
  }
}
</script>
