<script setup>
import { Link } from '@inertiajs/inertia-vue3';
import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { SearchIcon } from '@heroicons/vue/solid'
import { BellIcon, MenuIcon, XIcon, MailIcon, NewspaperIcon } from '@heroicons/vue/outline'
import BreezeResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';

// import { mapState, mapActions } from 'vuex'
// import ResponsiveMixin from '@/mixins/ResponsiveMixin'


/*
mixins: [
ResponsiveMixin
],

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
    userMenuOpen: false,
    showMobileMenu: false
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
},

toggleMobileMenu () {
    this.showMobileMenu = !this.showMobileMenu
}
}
*/
</script>

<template>
    <!-- Navigation -->
    <Disclosure as="nav" class="bg-gray-800" v-slot="{ open }">
        <div class="max-w-7xl mx-auto px-2 sm:px-2 lg:px-8">
            <div class="relative flex items-center justify-between h-16">
                <div class="flex items-center">
                <Link href="/" class="flex-shrink-0 relative">
                    <img src="/img/funinatl-bg.png" width="395" height="90" class="h-12 lg:h-16 w-auto" alt="Fun In Atlanta" />
                    <span class="text-white absolute top-1 lg:top-4 left-2 lg:left-6 lg:text-2xl">Fun In ATL</span>
                </Link>
                <div class="hidden lg:block lg:ml-6">
                    <div class="flex space-x-4">
                        <Link
                            href="/about"
                            :class="{
                                'bg-gray-900 text-white': $page.url === '/about',
                                'text-gray-300 hover:bg-gray-700 hover:text-white': $page.url !== '/about' 
                            }"
                            class="px-3 py-2 rounded-md text-sm font-medium"
                        >About</Link>
                        <Link
                            href="/contact"
                            class="px-3 py-2 rounded-md text-sm font-medium"
                            :class="{
                                'bg-gray-900 text-white': $page.url === '/contact',
                                'text-gray-300 hover:bg-gray-700 hover:text-white': $page.url !== '/contact' 
                            }"
                        >Contact</Link>
                        <Link
                            href="/submit-event"
                            class="px-3 py-2 rounded-md text-sm font-medium"
                            :class="{
                                'bg-gray-900 text-white': $page.url === '/submit-event',
                                'text-gray-300 hover:bg-gray-700 hover:text-white': $page.url !== '/submit-event' 
                            }"
                        >Submit Event</Link>
                        <Link
                            href="/subscribe"
                            class="px-3 py-2 rounded-md text-sm font-medium"
                            :class="{
                                'bg-gray-900 text-white': $page.url === '/subscribe',
                                'text-gray-300 hover:bg-gray-700 hover:text-white': $page.url !== '/subscribe' 
                            }"
                        >Subscribe</Link>
                    </div>
                </div>
                </div>
                <div class="flex-1 justify-center px-2 lg:ml-6 lg:justify-end hidden lg:flex">
                    <div class="max-w-lg w-full lg:max-w-xs">
                        <label for="search" class="sr-only">Search</label>
                        <div class="relative">
                        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SearchIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                          <input id="search" name="search" class="block w-full pl-10 pr-3 py-2 border border-transparent rounded-md leading-5 bg-gray-700 text-gray-300 placeholder-gray-400 focus:outline-none focus:bg-white focus:border-white focus:ring-white focus:text-gray-900 sm:text-sm" placeholder="Search" type="search" />
                        </div>
                    </div>
                </div>
                <div class="flex lg:hidden">
                <!-- Mobile menu button -->
                <DisclosureButton class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span class="sr-only">Open main menu</span>
                    <MenuIcon v-if="!open" class="block h-6 w-6" aria-hidden="true" />
                    <XIcon v-else class="block h-6 w-6" aria-hidden="true" />
                </DisclosureButton>
                </div>
                <div class="hidden lg:block lg:ml-4">
                <div class="flex items-center">
                    <button type="button" class="flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span class="sr-only">View notifications</span>
                      <BellIcon class="h-6 w-6" aria-hidden="true" />
                    </button>

                    <!-- Profile dropdown -->
                    <Menu as="div" class="ml-4 relative flex-shrink-0">
                      <div>
                          <MenuButton class="bg-gray-800 rounded-full flex text-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                            <span class="sr-only">Open user menu</span>
                            <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                          </MenuButton>
                      </div>
                      <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
                          <MenuItems class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <MenuItem v-slot="{ active }">
                                <Link href="/" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Your Profile</Link>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                                <Link href="/" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">Settings</Link>
                            </MenuItem>
                            <MenuItem v-slot="{ active }">
                                <Link :href="route('logout')" :class="[active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700']">
                                    Log Out
                                </Link>
                            </MenuItem>
                          </MenuItems>
                      </transition>
                    </Menu>
                </div>
                </div>
            </div>
        </div>

        <DisclosurePanel class="lg:hidden">
            <div class="px-2 pt-2 pb-3 space-y-1">
                <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" -->
                <DisclosureButton
                  as="a"
                  href="/about"
                  :class="{
                      'bg-gray-900 text-white': $page.url === '/about',
                      'text-gray-300 hover:bg-gray-700 hover:text-white': $page.url !== '/about' 
                  }"
                  class="px-3 py-2 rounded-md text-sm font-medium"
                >About</DisclosureButton>
                <DisclosureButton
                  as="a"
                  href="/contact"
                  class="px-3 py-2 rounded-md text-sm font-medium"
                  :class="{
                      'bg-gray-900 text-white': $page.url === '/contact',
                      'text-gray-300 hover:bg-gray-700 hover:text-white': $page.url !== '/contact' 
                  }"
                >Contact</DisclosureButton>
                <DisclosureButton
                  as="a"
                  href="/submit-event"
                  class="px-3 py-2 rounded-md text-sm font-medium"
                  :class="{
                      'bg-gray-900 text-white': $page.url === '/submit-event',
                      'text-gray-300 hover:bg-gray-700 hover:text-white': $page.url !== '/submit-event' 
                  }"
                >Submit Event</DisclosureButton>
                <DisclosureButton
                  as="a"
                  href="/subscribe"
                  class="px-3 py-2 rounded-md text-sm font-medium"
                  :class="{
                      'bg-gray-900 text-white': $page.url === '/subscribe',
                      'text-gray-300 hover:bg-gray-700 hover:text-white': $page.url !== '/subscribe' 
                  }"
                >Subscribe</DisclosureButton>
            </div>
            <div class="pt-4 pb-3 border-t border-gray-700">
                <div class="flex items-center px-5">
                <div class="flex-shrink-0">
                    <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                </div>
                <div class="ml-3">
                    <div class="text-base font-medium text-white">Tom Cook</div>
                    <div class="text-sm font-medium text-gray-400">tom@example.com</div>
                </div>
                <button type="button" class="ml-auto flex-shrink-0 bg-gray-800 p-1 rounded-full text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                    <span class="sr-only">View notifications</span>
                    <BellIcon class="h-6 w-6" aria-hidden="true" />
                </button>
                </div>
                <div class="mt-3 px-2 space-y-1">
                    <DisclosureButton as="a" href="/" class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Your Profile</DisclosureButton>
                    <DisclosureButton as="a" href="/" class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">Settings</DisclosureButton>
                    <DisclosureButton as="a" :href="route('logout')" class="block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                        Sign Out
                    </DisclosureButton>
                </div>
            </div>
        </DisclosurePanel>
    </Disclosure>

    <!-- Body -->
    <div class="container mx-auto sm:px-6 lg:px-6 py-6">
        <slot />
    </div>

    <!-- Footer -->
    <footer class="text-center bg-gray-900 text-white">
      <div class="container mx-auto px-6 pt-6">
        <div class="flex justify-center mb-6">
          <a href="#!" type="button" class="rounded-full border-2 border-white text-white leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1">
            <svg aria-hidden="true"
            focusable="false"
            data-prefix="fab"
              data-icon="twitter"
              class="w-3 h-full mx-auto"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"
              ></path>
            </svg>
          </a>

          <a href="#!" type="button" class="rounded-full border-2 border-white text-white leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1">
            <svg aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="instagram"
              class="w-3 h-full mx-auto"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
              ></path>
            </svg>
          </a>

          <a href="#!" type="button" class="rounded-full border-2 border-white text-white leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1">
            <MailIcon class="w-4 h-full mx-auto" />
          </a>

          <a href="#!" type="button" class="rounded-full border-2 border-white text-white leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1">
            <NewspaperIcon class="w-4 h-full mx-auto" />
          </a>
        </div>
      </div>

      <div class="text-center p-4" style="background-color: rgba(0, 0, 0, 0.2);">
        &copy; 2016-2022 
        <a class="text-whitehite" href="https://www.charlespage.me" target="_blank">Charles Page</a>
      </div>
    </footer>

    <!-- <div class="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
        <div class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            <slot />
        </div>
    </div>

  <div>
    <nav
      class="navbar is-fixed-top is-primary"
      role="navigation"
      aria-label="main navigation"
    >
      <div class="navbar-brand">
        <Link to="/" class="navbar-item">
          <img src="/images/funinatl-bg.png" width="395" height="90">
          <span class="is-brand-name">FunInATL</span>
        </Link>

        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          @click.prevent="toggleMobileMenu"
          :class="{ 'is-active': showMobileMenu }"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div class="navbar-menu" :class="{ 'is-active': showMobileMenu }" @click.prevent="toggleMobileMenu">
        <div class="navbar-start">
          <Link to="/about" class="navbar-item" active-class="is-active">
            About
          </Link>

          <Link to="/contact" class="navbar-item" active-class="is-active">
            Contact
          </Link>

          <Link to="/submit-event" class="navbar-item" active-class="is-active">
            Submit Event
          </Link>

          <Link to="/subscribe" class="navbar-item" active-class="is-active">
            Subscribe
          </Link>
        </div>

        <div class="navbar-end" v-if="1 === 2">
          <div class="navbar-item">
            <div class="buttons">
              <a class="button is-primary">
                <strong>Sign up</strong>
              </a>
              <a class="button is-light">
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <section class="section is-content has-background-white-bis pr-0 pl-0">
      <slot />
    </section>

    <footer class="footer">
      <div class="container">
        <div class="columns" :class="{ 'is-multiline': !isDesktopOrWidescreen }">
          <div
            class="column is-half-mobile"
            :class="{ 'is-2': isDesktopOrWidescreen, 'is-narrow': !isDesktopOrWidescreen }"
          >
            <h3 class="subtitle is-5 is-size-6-tablet">
              Categories
            </h3>
            
            <div class="block">
              <Link to="/category/music" class="has-text-primary" exact-active-class="is-active">
                Music
              </Link>
            </div>

            <div class="block">
              <Link to="/category/food-drinks" class="has-text-primary" active-class="is-active">
                Food & Drinks
              </Link>
            </div>

            <div class="block">
              <Link to="/category/comedy" class="has-text-primary" active-class="is-active">
                Comedy
              </Link>
            </div>

            <div class="block">
              <Link to="/category/arts-theatre" class="has-text-primary" active-class="is-active">
                Arts & Theatre
              </Link>
            </div>

            <div class="block">
              <Link to="/category/other" class="has-text-primary" active-class="is-active">
                Other
              </Link>
            </div>
          </div>

          <div class="column is-half-mobile" :class="{ 'is-2': isDesktopOrWidescreen }">
            <h3 class="subtitle is-5 is-size-6-tablet">
              Menu
            </h3>

            <div class="block">
              <Link to="/" class="has-text-primary" exact-active-class="is-active">
                Home
              </Link>
            </div>

            <div class="block">
              <Link to="/about" class="has-text-primary" active-class="is-active">
                About
              </Link>
            </div>

            <div class="block">
              <Link to="/contact" class="has-text-primary" active-class="is-active">
                Contact
              </Link>
            </div>

            <div class="block">
              <Link to="/submit-event" class="has-text-primary" active-class="is-active">
                Submit Event
              </Link>
            </div>

            <div class="block">
              <Link to="/subscribe" class="has-text-primary" active-class="is-active">
                Subscribe
              </Link>
            </div>
          </div>

          <div class="column is-full-mobile">
            <div class="is-centered">
              <div class="pt-2">
                <Link
                  to="/get-listed"
                  class="button is-info is-fullwidth"
                  :class="{ 'is-large': isDesktopOrWidescreen, 'is-medium': !isDesktopOrWidescreen }"
                >
                  <span class="icon is-large">
                    <i class="fas fa-map fa-2x"></i>
                  </span>
                  <span>Get Listed</span>
                </Link>
              </div>

              <div class="pt-1">
                <Link
                  to="/contact"
                  class="button is-indigo is-fullwidth"
                  :class="{ 'is-large': isDesktopOrWidescreen, 'is-medium': !isDesktopOrWidescreen }"
                >
                  <span class="icon is-large">
                    <i class="far fa-envelope fa-2x"></i>
                  </span>
                  <span>Contact Us</span>
                </Link>
              </div>
            </div>
          </div>

          <div class="column is-full-mobile" :class="{ 'is-newsletter-column': !isMobile }">
            <h3 class="subtitle is-5 is-size-6-tablet">
              Newsletter
            </h3>

            <p class="mb-2">Keep updated on events going on in Atlanta.</p>

            <form class="form" @submit.prevent="subscribe">
              <div class="field">
                <div class="control">
                  <input type="text" class="input" placeholder="Your email address" v-model="newsletter.email">
                </div>
              </div>

              <div class="control">
                <button type="submit" class="button is-primary is-fullwidth-mobile">
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          <div class="column">
            <p class="is-footer-text">
              Copyright &copy;2016-2022
              <br />
              <a href="https://www.charlespage.me" target="_blank">
                Charles Page
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>

    <b-loading :is-full-page="true" :active.sync="loading" />
    <b-loading :is-full-page="true" :active="$apollo.loading" />
  </div> -->

</template>
