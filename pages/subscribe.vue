<template>
	<div>
		<h1 class="text-xl">Subscribe</h1>

		<p class="text-gray-300 leading-normal">
			Keep updated on events going on in Atlanta.
		</p>

		<form @submit.prevent="subscribe">
      <div class="mt-4 flex">
        <input type="text" class="p-2 border-1 border-gray-200 round text-gray-700 text-sm h-auto" placeholder="Your email address" v-model="newsletter.email">

        <button type="submit" class="bg-black text-white rounded-sm h-auto py-3 px-4 no-underline">
          Subscribe
        </button>
      </div>
    </form>
	</div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
	name: 'subscribe',

	data () {
		return {
			email: null
		}
	},

	methods: {
		...mapActions('site', [
      'newsletterSubscribe'
    ]),

		async subscribe () {
      if (!this.email || !this.email.length) {
        return false
      }

      await this.newsletterSubscribe({
        email: this.email
      })
    }
	}
}
</script>
