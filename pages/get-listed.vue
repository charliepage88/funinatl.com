<template>
  <div class="container is-fluid is-content">
    <form @submit.prevent="submit">
      <h1 class="title is-1 is-size-2-tablet">Get Listed</h1>

      <p class="has-text-grey-light mb-2">
        Don't see any events from a vendor on our site? Or do you work with a venue that would like to get events listed on FunInATL? You've come to the right page!
      </p>

      <div class="columns is-multiline">
        <div class="column is-half">
          <div class="field">
            <label class="label">
              Location Name
              <span class="has-text-danger is-italic">*</span>
            </label>

            <div class="control">
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
        </div>

        <div class="column is-one-fourth">
          <div class="field">
            <label class="label">
              Category
              <span class="has-text-danger is-italic">*</span>
            </label>

            <div class="control" v-if="categories.length">
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

        <div class="column is-one-fourth">
          <div class="field">
            <label class="label">
              Website URL
              <span class="has-text-danger is-italic">*</span>
            </label>

            <div class="control">
              <input
                class="input is-medium"
                type="text"
                v-model="form.website"
                :class="{ 'is-danger': errors.website }"
              />
            </div>

            <p class="help is-danger" v-if="errors.website">Please fill out this field.</p>
          </div>
        </div>

        <div class="column is-half">
          <div class="field">
            <label class="label">
              Address
              <span class="has-text-danger is-italic">*</span>
            </label>

            <div class="control">
              <input
                class="input is-medium"
                type="text"
                v-model="form.address"
                :class="{ 'is-danger': errors.address }"
              />
            </div>

            <p class="help is-danger" v-if="errors.address">Please fill out this field.</p>
          </div>
        </div>

        <div class="column is-one-fourth">
          <div class="field">
            <label class="label">
              City
              <span class="has-text-danger is-italic">*</span>
            </label>

            <div class="control">
              <input
                class="input is-medium"
                type="text"
                v-model="form.city"
                :class="{ 'is-danger': errors.city }"
              />
            </div>

            <p class="help is-danger" v-if="errors.city">Please fill out this field.</p>
          </div>
        </div>

        <div class="column is-one-fourth">
          <div class="field">
            <label class="label">
              ZIP
              <span class="has-text-danger is-italic">*</span>
            </label>

            <div class="control">
              <input
                class="input is-medium"
                type="text"
                maxlength="5"
                minlength="5"
                v-model="form.zip"
                :class="{ 'is-danger': errors.zip }"
              />
            </div>

            <p class="help is-danger" v-if="errors.zip">Please fill out this field.</p>
          </div>
        </div>

        <div class="column is-12">
          <div class="field">
            <label class="label">
              Description
            </label>

            <div class="control">
              <textarea
                class="textarea is-medium"
                v-model="form.description"
                rows="6"
              />
            </div>
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
import ToastMixin from '@/mixins/ToastMixin'
import RecaptchaMixin from '@/mixins/RecaptchaMixin'
import Categories from '@/queries/categories'

export default {
	name: 'get-listed',

  head () {
    return {
      title: 'Atlanta Events - Get Listed | FunInATL',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Let FunInATL know about any music venues or businesses that host events in Atlanta.'
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
      categories: []
    }

    response.categories = await client.query({
        query: Categories,
        variables: params
      })
      .then(({ data }) => {
        return data.categories
      })

    return response
  },

  mixins: [
    ToastMixin,
    RecaptchaMixin
  ],

	apollo: {
    categories: {
      prefetch: true,
      query: Categories
    }
  },

  data () {
    return {
      form: {
        name: null,
        category_id: null,
        address: null,
        city: null,
        zip: null,
        description: null,
        is_family_friendly: false,
        website: null
      },

      errors: {
        name: false,
        category_id: false,
        address: false,
        city: false,
        zip: false,
        website: false
      }
    }
  },

  methods: {
    ...mapActions('site', [
      'submitLocation'
    ]),

    async submit () {
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
      let resp = await this.submitLocation(this.form)

      if (resp.status) {
        let msg = 'Location has been submitted, thank you! Please allow for 24-48 hours for us to review, before going on the site.'

        this.toastSuccess(msg)

        this.form = {
          name: null,
          category_id: null,
          address: null,
          city: null,
          zip: null,
          description: null,
          is_family_friendly: false,
          website: null
        }
      } else {
        console.error(resp.errors)

        this.toastError('Could not submit location, please try again.')
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
