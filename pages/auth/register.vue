<template>
  <div class="container is-fluid is-auth">
    <form @submit.prevent="submit">
      <h1 class="title is-1 is-size-2-tablet">Register</h1>

      <p class="has-text-grey-light mb-2">
        Sign up for a FunInATL account!
      </p>

      <div class="columns is-multiline">
        <div class="column is-full">
          <div class="field">
            <label class="label">
              Name 
              <span class="has-text-danger is-italic">*</span>
            </label>

            <div class="control">
              <input
                class="input is-medium"
                type="text"
                v-model="form.name"
                :class="{ 'is-danger': errors.name }"
              />

              <p class="help is-danger" v-if="errors.name">Please fill out this field.</p>
            </div>
          </div>
        </div>

        <div class="column is-full">
          <div class="field">
            <label class="label">
              Email Address 
              <span class="has-text-danger is-italic">*</span>
            </label>

            <div class="control">
              <input
                class="input is-medium"
                type="email"
                v-model="form.email"
                :class="{ 'is-danger': errors.email }"
              />

              <p class="help is-danger" v-if="errors.email">Please fill out this field.</p>
            </div>
          </div>
        </div>

        <div class="column is-full">
          <div class="field">
            <label class="label">
              Password 
              <span class="has-text-danger is-italic">*</span>
            </label>

            <div class="control">
              <input
                class="input is-medium"
                type="password"
                v-model="form.password"
                :class="{ 'is-danger': errors.password }"
              />

              <p class="help is-danger" v-if="errors.password">Please fill out this field.</p>
            </div>
          </div>
        </div>

        <div class="column is-full">
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
import register from '@/queries/register'
import ToastMixin from '@/mixins/ToastMixin'
import RecaptchaMixin from '@/mixins/RecaptchaMixin'

export default {
  name: 'register',

  head () {
    return {
      title: 'Atlanta Events - Register | FunInATL',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Sign up for an account on FunInATL to get more access to events going on in Atlanta.'
        }
      ]
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
        email: null,
        password: null
      },

      errors: {
        name: false,
        email: false,
        password: false
      }
    }
  },

  methods: {
    ...mapActions('site', [
      'startLoading',
      'stopLoading'
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

      // send register request to graphql
      try {
        this.startLoading()

        let credentials = this.form

        const response = await this.$apollo.mutate({
          mutation: register,
          variables: credentials
        }).then(({ data }) => data && data.register)

        await this.$apolloHelpers.onLogin(response.token, undefined, { expires: 7 })
        // this.$storage.setCookie('funinatl_user', JSON.stringify(response.user))

        this.toastSuccess('You have signed up! Redirecting you to your dashboard now.')

        setTimeout(() => this.$router.push('/user/dashboard'), 1000)
      } catch (e) {
        console.error(e)

        this.toastError('Could not sign up with provided credentials, please try again.')
      } finally {
        this.stopLoading()
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
