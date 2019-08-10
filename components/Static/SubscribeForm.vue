<template>
  <form @submit.prevent="submit">
    <h1 class="title is-1 is-size-2-tablet">Subscribe</h1>

    <p class="has-text-grey-light mb-2">
      Keep updated on events going on in Atlanta. Unsubscribe anytime you want!
    </p>

    <div class="columns is-multiline">
      <div class="column is-12">
        <div class="field">
          <label class="label">
            Email Address
            <span class="has-text-danger is-italic">*</span>
          </label>

          <div class="control">
            <input
              class="input is-large"
              type="email"
              placeholder="Your email address"
              v-model="form.email"
              :class="{ 'is-danger': errors.email }"
            />
          </div>

          <p class="help is-danger" v-if="errors.email">Please fill out this field.</p>
        </div>
      </div>

      <div class="column is-12">
        <button
          type="submit"
          class="button is-large is-info is-fullwidth"
        >
          Subscribe
        </button>
      </div>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import ToastMixin from '@/mixins/ToastMixin'

export default {
  name: 'subscribe-form',

  mixins: [
    ToastMixin
  ],

  data () {
    return {
      form: {
        email: null
      },

      errors: {
        email: false
      }
    }
  },

  methods: {
    ...mapActions('site', [
      'newsletterSubscribe'
    ]),

    async submit () {
      // validate form & return errors if any
      let validate = this.validate()

      if (!validate) {
        this.toastError('Errors found, please correct the form and try again.')

        return false
      }

      const resp = await this.newsletterSubscribe({
        email: this.form.email
      })

      if (resp) {
        this.form = {
          email: null
        }

        this.toastSuccess('You have subscribed to our newsletter! Enjoy!')
      } else {
        this.toastError('Could not subscribe, please try again in a moment.')
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
    }
  }
}
</script>
