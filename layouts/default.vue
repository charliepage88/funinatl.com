<template>
  <div>
    <div
      class="loading-overlay absolute w-screen h-scren p-12 bg-gray-100 rounded shadow z-10 text-center"
      v-if="loading"
    >
      <span class="text-xl text-gray-700">
        Loading...
      </span>
    </div>

    <div class="main-container" :class="{ 'is-loading': loading }">
      <nav class="flex items-center justify-between flex-wrap bg-black">
        <div class="flex items-center flex-shrink-0 text-white mr-6 is-brand-name-container has-cursor-pointer">
          <div class="bg-no-repeat bg-center w-full h-20 relative" style="background-image: url('/images/funinatl-bg.png');" @click.prevent="goHome">
            <span class="font-semibold text-xl absolute is-brand-name">FunInATL</span>
          </div>
        </div>

        <div class="block lg:hidden">
          <button class="flex items-center px-3 py-2 border rounded text-teal-200 border-teal-400 hover:text-white hover:border-white">
            <svg class="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/>
            </svg>
          </button>
        </div>

        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="text-sm lg:flex-grow">
            <nuxt-link to="/about" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 no-underline text-lg" active-class="border-b-2 border-gray-300 text-gray-200">
              About
            </nuxt-link>

            <nuxt-link to="/contact" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 no-underline text-lg" active-class="border-b-2 border-gray-300 text-gray-200">
              Contact
            </nuxt-link>

            <nuxt-link to="/submit-event" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white mr-4 no-underline text-lg" active-class="border-b-2 border-gray-300 text-gray-200">
              Submit Event
            </nuxt-link>

            <nuxt-link to="/subscribe" class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 hover:text-white no-underline text-lg" active-class="border-b-2 border-gray-300 text-gray-200">
              Subscribe
            </nuxt-link>
          </div>

          <div class="relative group text-white" v-if="1 === 2">
            <div
              class="flex items-center cursor-pointer text-sm hover:border-gray-300 rounded-t-lg py-1 px-2"
              @mouseover="hoverOnUserMenu"
            >
              <img src="https://placekitten.com/30/30" class="rounded-full mr-2">
              John Doe
              <i class="fas fa-angle-down fa-fw mr-3 text-white"></i>
            </div>

            <div
              class="items-center absolute border-1 border-gray-100 p-1 bg-white p-2 w-full"
              :class="{ 'invisible': !userMenuOpen }"
              @mouseleave="hoverOffUserMenu"
            >
              <a href="#" class="px-4 py-2 block text-black hover:bg-gray-300 no-underline">
                View Profile
              </a>

              <a href="#" class="px-4 py-2 block text-black hover:bg-gray-300 no-underline">
                Edit Profile
              </a>

              <hr class="border-t mx-2 border-gray-400">

              <a href="#" class="px-4 py-2 block text-black hover:bg-gray-300 no-underline">
                Logout
              </a>
            </div>
          </div>
        </div>
      </nav>

      <div class="container mx-auto">
        <nuxt />
      </div>

      <div class="container bg-indigo-700 p-6 text-gray-100 pb-4">
        <div class="sm:flex">
          <div class="w-1/6 md:w-1/6 sm:w-1/4">
            <span class="text-teal-400 text-lg">
              Categories
            </span>

            <div class="block mt-4">
              <nuxt-link to="/category/music" class="text-teal-200 hover:text-white no-underline text-lg" exact-active-class="border-b-2 border-gray-300 text-gray-200">
                Music
              </nuxt-link>
            </div>

            <div class="block mt-2">
              <nuxt-link to="/category/food-drinks" class="text-teal-200 hover:text-white no-underline text-lg" active-class="border-b-2 border-gray-300 text-gray-200">
                Food & Drinks
              </nuxt-link>
            </div>

            <div class="block mt-2">
              <nuxt-link to="/category/comedy" class="text-teal-200 hover:text-white no-underline text-lg" active-class="border-b-2 border-gray-300 text-gray-200">
                Comedy
              </nuxt-link>
            </div>

            <div class="block mt-2">
              <nuxt-link to="/category/arts-theatre" class="text-teal-200 hover:text-white no-underline text-lg" active-class="border-b-2 border-gray-300 text-gray-200">
                Arts & Theatre
              </nuxt-link>
            </div>

            <div class="block mt-2">
              <nuxt-link to="/category/other" class="text-teal-200 hover:text-white no-underline text-lg" active-class="border-b-2 border-gray-300 text-gray-200">
                Other
              </nuxt-link>
            </div>
          </div>

          <div class="w-1/6 md:w-1/6 sm:w-1/4 sm:mt-0 mt-8">
            <span class="text-teal-400 text-lg">
              Menu
            </span>

            <div class="block mt-4">
              <nuxt-link to="/" class="text-teal-200 hover:text-white no-underline text-lg" exact-active-class="border-b-2 border-gray-300 text-gray-200">
                Home
              </nuxt-link>
            </div>

            <div class="block mt-2">
              <nuxt-link to="/about" class="text-teal-200 hover:text-white no-underline text-lg" active-class="border-b-2 border-gray-300 text-gray-200">
                About
              </nuxt-link>
            </div>

            <div class="block mt-2">
              <nuxt-link to="/contact" class="text-teal-200 hover:text-white no-underline text-lg" active-class="border-b-2 border-gray-300 text-gray-200">
                Contact
              </nuxt-link>
            </div>

            <div class="block mt-2">
              <nuxt-link to="/submit-event" class="text-teal-200 hover:text-white no-underline text-lg" active-class="border-b-2 border-gray-300 text-gray-200">
                Submit Event
              </nuxt-link>
            </div>

            <div class="block mt-2">
              <nuxt-link to="/subscribe" class="text-teal-200 hover:text-white no-underline text-lg" active-class="border-b-2 border-gray-300 text-gray-200">
                Subscribe
              </nuxt-link>
            </div>
          </div>

          <div class="w-1/4 md:w-1/4 sm:w-1/4 sm:mt-0 mt-8">
            <div class="flex flex-wrap">
              <nuxt-link to="/get-listed" class="block w-2/3">
                <div class="flex rounded border-b-2 border-gray-700 overflow-hidden">
                  <button class="block text-white text-sm shadow-border bg-green-600 hover:bg-green-800 text-lg py-3 px-4 tracking-wide font-bold w-3/4">
                    Get Listed
                  </button>
                  <div class="bg-green-400 hover:bg-green-700 shadow-border p-3 w-1/4">
                    <div class="w-8 h-8 ml-3">
                      <i class="fas fa-map fa-2x"></i>
                    </div>
                  </div>
                </div>
              </nuxt-link>

              <nuxt-link to="/contact" class="block w-2/3 mt-8">
                <div class="flex rounded border-b-2 border-gray-700 overflow-hidden">
                  <button class="block text-white text-sm shadow-border bg-purple-600 hover:bg-purple-800 text-lg py-3 px-4 tracking-wide font-bold w-3/4">
                    Contact Us
                  </button>
                  <div class="bg-purple-400 hover:bg-purple-700 shadow-border p-3 w-1/4">
                    <div class="w-8 h-8 ml-3">
                      <i class="far fa-envelope fa-2x"></i>
                    </div>
                  </div>
                </div>
              </nuxt-link>
            </div>
          </div>

          <div class="w-1/4 md:w-1/4 sm:w-1/2 sm:mt-0 mt-8">
            <div class="text-white text-lg mb-2">Newsletter</div>

            <p class="text-gray-300 leading-normal">Keep updated on events going on in Atlanta.</p>

            <form @submit.prevent="subscribe">
              <div class="mt-4 flex">
                <input type="text" class="p-2 border-1 border-gray-200 round text-gray-700 text-sm h-auto" placeholder="Your email address" v-model="newsletter.email">

                <button type="submit" class="bg-black text-white rounded-sm h-auto py-3 px-4 no-underline">
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          <div class="w-1/6 md:w-1/6 sm:w-1/4 sm:mt-0 mt-8 table h-48">
            <p class="block text-gray-300 text-lg align-middle table-cell">
              Copyright &copy;2016-2019
              <a href="https://www.charliepage88.com" target="_blank" class="text-white">Charles Page</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'default',

  computed: {
    ...mapState('site', [
      'loading'
    ])
  },

  data () {
    return {
      newsletter: {
        email: null
      },
      userMenuOpen: false
    }
  },

  methods: {
    ...mapActions('site', [
      'newsletterSubscribe'
    ]),

    hoverOnUserMenu () {
      this.userMenuOpen = true
    },

    hoverOffUserMenu () {
      this.userMenuOpen = false
    },

    async subscribe () {
      if (!this.newsletter.email || !this.newsletter.email.length) {
        return false
      }

      await this.newsletterSubscribe({
        email: this.newsletter.email
      })
    },

    goHome () {
      this.$router.push('/')
    }
  }
}
</script>

<style lang="sass" scoped>
.is-brand-name-container
  width: 300px!important

.is-brand-name
  top: 40px
  left: 10px
  font-size: 2rem

.main-container
  &.is-loading
    opacity: 0.3
    cursor: not-allowed
    z-index: 0
    height: 100vh
</style>
