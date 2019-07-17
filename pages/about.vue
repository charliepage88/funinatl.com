<template>
  <div class="container is-fluid pl-4 pr-4">
    <div class="centered-container">
      <div class="box shadow-md rounded">
        <h1 class="title is-1 is-size-2-tablet">About</h1>

        <p class="has-text-grey-light mb-1">
          Hello and welcome to FunInATL! Our purpose is very simple, provide an intuitive and easy way to find events that are going on in Atlanta, Georgia. One of the ways we try to differentiate ourselves from other websites for Atlanta events is to not focus on "big" events, since those are so well covered, and instead try to focus on things that aren't listed anywhere else or very few places.
        </p>

        <p class="has-text-grey-light mb-1">
          When a big name band comes into town, everyone sees the commercial or an ad on the radio, or many other places. By focusing on smaller venues, we're better able to focus what kind of events people are interested in and in the future, be able to quickly recommend upcoming events for users.
        </p>

        <p class="has-text-grey-light mb-1">
          The current website is in the earlier stages, so please feel free to contact us with any feedback!
        </p>

        <div class="columns is-centered">
          <div class="column">
            <nuxt-link to="/contact" class="button is-indigo is-large is-fullwidth">
              <span class="icon is-large">
                <i class="far fa-envelope fa-2x"></i>
              </span>
              <span>Contact Us</span>
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about'
}
</script>
