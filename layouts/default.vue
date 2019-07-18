<template>
  <div>
    <nav
      class="navbar is-fixed-top is-primary"
      role="navigation"
      aria-label="main navigation"
      :class="$mq"
    >
      <div class="navbar-brand">
        <nuxt-link to="/" class="navbar-item">
          <img src="/images/funinatl-bg.png" width="395" height="90">
          <span class="is-brand-name">FunInATL</span>
        </nuxt-link>

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

      <div class="navbar-menu" :class="{ 'is-active': showMobileMenu }">
        <div class="navbar-start">
          <nuxt-link to="/about" class="navbar-item" active-class="is-active">
            About
          </nuxt-link>

          <nuxt-link to="/contact" class="navbar-item" active-class="is-active">
            Contact
          </nuxt-link>

          <nuxt-link to="/submit-event" class="navbar-item" active-class="is-active">
            Submit Event
          </nuxt-link>

          <nuxt-link to="/subscribe" class="navbar-item" active-class="is-active">
            Subscribe
          </nuxt-link>
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
      <nuxt></nuxt>
    </section>

    <footer class="footer">
      <div class="container">
        <div class="columns" :class="{ 'is-multiline': !isDesktopOrWidescreen }">
          <div
            class="column"
            :class="{ 'is-2': isDesktopOrWidescreen, 'is-narrow': !isDesktopOrWidescreen }"
          >
            <h3 class="subtitle is-5 is-size-6-tablet">
              Categories
            </h3>
            
            <div class="block">
              <nuxt-link to="/category/music" class="has-text-primary" exact-active-class="is-active">
                Music
              </nuxt-link>
            </div>

            <div class="block">
              <nuxt-link to="/category/food-drinks" class="has-text-primary" active-class="is-active">
                Food & Drinks
              </nuxt-link>
            </div>

            <div class="block">
              <nuxt-link to="/category/comedy" class="has-text-primary" active-class="is-active">
                Comedy
              </nuxt-link>
            </div>

            <div class="block">
              <nuxt-link to="/category/arts-theatre" class="has-text-primary" active-class="is-active">
                Arts & Theatre
              </nuxt-link>
            </div>

            <div class="block">
              <nuxt-link to="/category/other" class="has-text-primary" active-class="is-active">
                Other
              </nuxt-link>
            </div>
          </div>

          <div class="column is-2">
            <h3 class="subtitle is-5 is-size-6-tablet">
              Menu
            </h3>

            <div class="block">
              <nuxt-link to="/" class="has-text-primary" exact-active-class="is-active">
                Home
              </nuxt-link>
            </div>

            <div class="block">
              <nuxt-link to="/about" class="has-text-primary" active-class="is-active">
                About
              </nuxt-link>
            </div>

            <div class="block">
              <nuxt-link to="/contact" class="has-text-primary" active-class="is-active">
                Contact
              </nuxt-link>
            </div>

            <div class="block">
              <nuxt-link to="/submit-event" class="has-text-primary" active-class="is-active">
                Submit Event
              </nuxt-link>
            </div>

            <div class="block">
              <nuxt-link to="/subscribe" class="has-text-primary" active-class="is-active">
                Subscribe
              </nuxt-link>
            </div>
          </div>

          <div class="column">
            <div class="is-centered">
              <div class="pt-2">
                <nuxt-link
                  to="/get-listed"
                  class="button is-info is-fullwidth"
                  :class="{ 'is-large': isDesktopOrWidescreen, 'is-medium': !isDesktopOrWidescreen }"
                >
                  <span class="icon is-large">
                    <i class="fas fa-map fa-2x"></i>
                  </span>
                  <span>Get Listed</span>
                </nuxt-link>
              </div>

              <div class="pt-1">
                <nuxt-link
                  to="/contact"
                  class="button is-indigo is-fullwidth"
                  :class="{ 'is-large': isDesktopOrWidescreen, 'is-medium': !isDesktopOrWidescreen }"
                >
                  <span class="icon is-large">
                    <i class="far fa-envelope fa-2x"></i>
                  </span>
                  <span>Contact Us</span>
                </nuxt-link>
              </div>
            </div>
          </div>

          <div class="column" :class="{ 'is-newsletter-column': !isMobile }">
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
                <button type="submit" class="button is-primary">
                  Subscribe
                </button>
              </div>
            </form>
          </div>

          <div class="column">
            <p class="is-footer-text">
              Copyright &copy;2016-2019
              <br />
              <a href="https://www.charliepage88.com" target="_blank">
                Charles Page
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>

    <b-loading :is-full-page="true" :active.sync="loading" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ResponsiveMixin from '@/mixins/ResponsiveMixin'

export default {
  name: 'default',

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
}
</script>

<style lang="sass" scoped>
nav.navbar
  height: 110px!important

  &.mobile
    height: 80px!important

    .is-brand-name
      font-size: 1.5rem

    .navbar-brand img
      width: 300px

  .is-brand-name-container
    width: 300px!important

  .is-brand-name
    top: 40px
    left: 30px
    position: absolute
    font-size: 2rem

  .navbar-brand
    img
      max-height: 90px!important

.main-container
  &.is-loading
    opacity: 0.3
    cursor: not-allowed
    z-index: 0
    height: 100vh

.is-newsletter-column
  margin-left: 5rem

.is-footer-text
  text-align: center
  margin-top: 3rem
</style>
