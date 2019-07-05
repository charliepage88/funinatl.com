<template>
	<div class="container mx-auto px-64">
	  <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
	    <form @submit.prevent="submit">
	      <h1 class="text-xl mb-2">Contact</h1>

	      <p
	        class="text-gray-700 mb-8"
	      >
	      	Have any feedback for us on the site? Feel free to fill out this form with any questions as well as any other sort of request, we will respond as soon as possible. Thank you!
	      </p>

	      <div class="-mx-3 md:flex mb-6">
	        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
	          <label
	            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
	            for="name"
	          >
	            Your Name
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
	            v-model="form.email"
	            :class="{ 'border-red-500': errors.email }"
	          />

	          <p class="text-red text-xs italic" v-if="errors.email">Please fill out this field.</p>
	        </div>
	      </div>

	      <div class="-mx-3 md:flex mb-2">
	        <div class="w-full px-3 mb-6 md:mb-0">
	          <label
	            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
	            for="body"
	          >
	        		Message 
	        		<span class="text-red-500 text-xs italic">*</span>
	        	</label>

	          <textarea
	            class="appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3"
	            id="body"
	            v-model="form.body"
	            rows="12"
	            :class="{ 'border-red-500': errors.body }"
	          />

	          <p class="text-red text-xs italic" v-if="errors.body">Please fill out this field.</p>
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
	</div>
</template>

<script>
import { mapActions } from 'vuex'
import ToastMixin from '@/mixins/ToastMixin'
import RecaptchaMixin from '@/mixins/RecaptchaMixin'

export default {
	name: 'contact',

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
