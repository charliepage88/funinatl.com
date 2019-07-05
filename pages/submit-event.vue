<template>
  <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
    <form @submit.prevent="submit">
      <h1 class="text-xl mb-2">Submit Event</h1>

      <p
        class="text-gray-700 mb-8"
      >See an event upcoming in Atlanta that's not listed here? Please feel free to use the form below. After a review period, we'll publish it to the site.</p>

      <div class="-mx-3 md:flex mb-6">
        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="name"
          >
            Event Name
            <span class="text-red-500 text-xs italic">*</span>
          </label>

          <input
            class="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3"
            id="name"
            type="text"
            v-model="form.name"
            :class="{ 'border-red-500': errors.name }"
          />

          <p class="text-red text-xs italic" v-if="errors.name">Please fill out this field.</p>
        </div>

        <div class="md:w-1/4 px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="location"
          >
            Location
          </label>

          <div class="relative">
            <select
              class="block appearance-none w-full bg-gray-300 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded"
              id="location"
              v-model="form.location_id"
            >
              <option value="null">Other Location</option>
              <option
                v-for="location in locations"
                :key="location.id"
                :value="location.id"
              >{{ location.name }}</option>
            </select>

            <div
              class="pointer-events-none absolute right-0 top-0 mt-4 flex items-center px-2 text-gray-700"
            >
              <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>
        </div>

        <div class="md:w-1/4 px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="category"
          >
            Category
            <span class="text-red-500 text-xs italic">*</span>
          </label>

          <div class="relative">
            <select
              class="block appearance-none w-full bg-gray-300 border border-gray-300 text-gray-700 py-3 px-4 pr-8 rounded"
              id="category"
              v-model="form.category_id"
              :class="{ 'border-red-500': errors.category_id }"
            >
              <option value="null"></option>
              <option
                v-for="category in categories"
                :key="category.id"
                :value="category.id"
              >{{ category.name }}</option>
            </select>

            <div
              class="pointer-events-none absolute right-0 top-0 mt-4 flex items-center px-2 text-gray-700"
            >
              <svg class="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path
                  d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                />
              </svg>
            </div>
          </div>

          <p class="text-red text-xs italic" v-if="errors.category_id">Please fill out this field.</p>
        </div>
      </div>

      <div class="-mx-3 md:flex mb-6">
        <div class="md:w-1/4 px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            Start Date
            <span class="text-red-500 text-xs italic">*</span>
          </label>

          <date-picker
            v-model="form.start_date"
            :has-error="errors.start_date"
            @change="updateForm('start_date', $event)"
          />

          <p class="text-red text-xs italic" v-if="errors.start_date">Please fill out this field.</p>
        </div>

        <div class="md:w-1/4 px-3">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
          >
            End Date
          </label>

          <date-picker
            v-model="form.end_date"
            @change="updateForm('end_date', $event)"
          />
        </div>

        <div class="md:w-1/4 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="start_time"
          >
            Start Time
            <span class="text-red-500 text-xs italic">*</span>
          </label>

          <input
            class="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3"
            id="start_time"
            type="text"
            v-model="form.start_time"
            :class="{ 'border-red-500': errors.start_time }"
          />

          <p class="text-red text-xs italic" v-if="errors.start_time">Please fill out this field.</p>
        </div>

        <div class="md:w-1/4 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="end_time"
          >
            End Time
          </label>

          <input
            class="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3"
            id="end_time"
            type="text"
            v-model="form.end_time"
          />
        </div>
      </div>

      <div class="-mx-3 md:flex mb-2">
        <div class="md:w-1/4 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="price"
          >
            Price
            <span class="text-red-500 text-xs italic">*</span>
          </label>

          <input
            class="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3"
            id="price"
            type="text"
            v-model="form.price"
            :class="{ 'border-red-500': errors.price }"
          />

          <p class="text-red text-xs italic" v-if="errors.price">Please fill out this field.</p>

          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="is_family_friendly"
          >
            Family Friendly
          </label>

          <div class="mb-2">
            <div class="form-switch inline-block align-middle">
              <input
                type="checkbox"
                name="is_family_friendly"
                id="is_family_friendly"
                class="form-switch-checkbox"
                value="1"
                v-model="form.is_family_friendly"
              />
              <label class="form-switch-label" for="is_family_friendly"></label>
            </div>
          </div>
        </div>

        <div class="md:w-1/4 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="website"
          >
            Website URL
            <span class="text-red-500 text-xs italic">*</span>
          </label>

          <input
            class="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3"
            id="website"
            type="text"
            v-model="form.website"
            :class="{ 'border-red-500': errors.website }"
          />

          <p class="text-red text-xs italic" v-if="errors.website">Please fill out this field.</p>
        </div>

        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="description"
          >
            Description
          </label>

          <textarea
            class="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3"
            id="description"
            v-model="form.description"
            rows="4"
          />
        </div>
      </div>

      <div class="-mx-3 md:flex mb-2">
        <div class="w-full px-3 mb-6 md:mb-0">
          <button
            type="submit"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
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
import DatePicker from '@/components/Common/DatePicker'
import Categories from '@/queries/Categories'
import Locations from '@/queries/Locations'
import ToastMixin from '@/mixins/ToastMixin'
import RecaptchaMixin from '@/mixins/RecaptchaMixin'

export default {
	name: 'submit-event',

	components: {
		DatePicker
  },

  mixins: [
    ToastMixin,
    RecaptchaMixin
  ],

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
			}
		}
	},

	methods: {
    ...mapActions('site', [
      'submitEvent'
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

		updateForm (key, value) {
			this.$set(this.form, key, value)
		}
	}
}
</script>
