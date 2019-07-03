<template>
  <div class="container mx-auto px-64">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <form @submit.prevent="submit">
        <h1 class="text-xl mb-2">Subscribe</h1>

        <p class="text-gray-700 mb-8">
          Keep updated on events going on in Atlanta. Unsubscribe anytime you want!
        </p>

        <div class="-mx-3 md:flex">
          <div class="md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              for="email"
            >
              Email Address
              <span class="text-red-500 text-xs italic">*</span>
            </label>

            <input
              class="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3"
              id="email"
              type="email"
              placeholder="Your email address"
              v-model="form.email"
              :class="{ 'border-red-500': errors.email }"
            />
            <p class="text-red text-xs italic" v-if="errors.email">Please fill out this field.</p>
          </div>

          <div class="w-auto mt-6">
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-10 border border-blue-700 rounded"
            >
              Subscribe
            </button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import ToastMixin from '@/mixins/ToastMixin'

export default {
  name: 'subscribe',

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
