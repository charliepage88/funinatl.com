<template>
  <div class="container mx-auto px-64">
    <div class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col my-2">
      <h1 class="text-3xl mb-4">About</h1>

      <p
        class="text-gray-700 mb-4 text-lg"
      >
        Hello and welcome to FunInATL! Our purpose is very simple, provide an intuitive and easy way to find events that are going on in Atlanta, Georgia. One of the ways we try to differentiate ourselves from other websites for Atlanta events is to not focus on "big" events, since those are so well covered, and instead try to focus on things that aren't listed anywhere else or very few places.
      </p>

      <p
        class="text-gray-700 mb-4 text-lg"
      >
        When a big name band comes into town, everyone sees the commercial or an ad on the radio, or many other places. By focusing on smaller venues, we're better able to focus what kind of events people are interested in and in the future, be able to quickly recommend upcoming events for users.
      </p>

      <p
        class="text-gray-700 mb-4 text-lg"
      >
        The current website is in the earlier stages, so please feel free to contact us with any feedback!
      </p>

      <div class="flex">
        <nuxt-link to="/contact" class="block w-1/5 md:w-1/5 sm:w-full">
          <div class="flex rounded border-b-2 border-gray-700 overflow-hidden">
            <button class="block text-white text-sm shadow-border bg-purple-600 hover:bg-purple-800 text-lg py-3 px-4 tracking-wide font-bold w-3/4">
              Contact Us
            </button>
            <div class="bg-purple-400 text-white hover:bg-purple-700 shadow-border p-3 w-1/4">
              <div class="w-8 h-8 ml-1">
                <i class="far fa-envelope fa-2x"></i>
              </div>
            </div>
          </div>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'about'
}
</script>
