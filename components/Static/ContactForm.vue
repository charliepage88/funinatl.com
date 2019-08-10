<template>
  <form @submit.prevent="submit">
    <h1 class="title is-1 is-size-2-tablet">Contact</h1>

    <p
      class="has-text-grey-light mb-2"
    >
      Have any feedback for us on the site? Feel free to fill out this form with any questions as well as any other sort of request, we will respond as soon as possible. Thank you!
    </p>

    <div class="field">
      <label class="label">
        Your Name
        <span class="has-text-danger is-italic">*</span>
      </label>

      <div class="control">
        <input
          class="input is-large"
          type="text"
          v-model="form.name"
          :class="{ 'is-danger': errors.name }"
        />
      </div>

      <p class="help is-danger" v-if="errors.name">Please fill out this field.</p>
    </div>

    <div class="field">
      <label class="label">
        Email Address
        <span class="has-text-danger is-italic">*</span>
      </label>

      <div class="control">
        <input
          class="input is-large"
          type="email"
          v-model="form.email"
          :class="{ 'is-danger': errors.email }"
        />
      </div>

      <p class="help is-danger" v-if="errors.email">Please fill out this field.</p>
    </div>

    <div class="field">
      <label class="label">
        Message
        <span class="has-text-danger is-italic">*</span>
      </label>

      <div class="control">
        <textarea
          class="textarea is-large"
          v-model="form.body"
          rows="12"
          :class="{ 'is-danger': errors.body }"
        />
      </div>

      <p class="help is-danger" v-if="errors.body">Please fill out this field.</p>
    </div>

    <div class="field">
      <button
        type="submit"
        class="button is-large is-info is-fullwidth-mobile"
      >
        Submit
      </button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex'
import ToastMixin from '@/mixins/ToastMixin'
import RecaptchaMixin from '@/mixins/RecaptchaMixin'

export default {
  name: 'contact-form',

  mixins: [
    ToastMixin,
    RecaptchaMixin
  ],

  data () {
    return {
      form: {
        name: null,
        email: null,
        body: null
      },

      errors: {
        name: false,
        email: false,
        body: false
      }
    }
  },

  methods: {
    ...mapActions('site', [
      'submitContactForm'
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
      let resp = await this.submitContactForm(this.form)

      if (resp.status) {
        let msg = 'We have been notified of your contact form submission. Please allow for 24-48 hours for us to get back to you, thank you!'

        this.toastSuccess(msg)

        this.form = {
          name: null,
          email: null,
          body: null
        }
      } else {
        console.error(resp.errors)

        this.toastError('Could not submit contact form, please try again.')
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
