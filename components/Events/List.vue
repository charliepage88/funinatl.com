<template>
  <div class="row columns">
    <div
      class="column is-one-third has-cursor-pointer"
      v-for="event in events"
      :key="event.id"
    >
      <div class="card large">
        <div class="card-image" v-if="event.photo">
          <NuxtLink :to="`event/${event.slug}`">
            <figure class="image">
              <img :alt="event.name" class="event-image" :src="event.photo">
            </figure>
          </NuxtLink>
        </div>

        <div class="card-content">
          <div class="media">
            <div class="media-left">
              <NuxtLink :to="`/location/${event.location.slug}`">
                <figure class="image is-96x96">
                  <img v-if="event.location.photo" :alt="event.location.name" :src="event.location.photo">
                </figure>
              </NuxtLink>
            </div>

            <div class="media-content">
              <p class="title is-4 mb-0">
                {{ event.name }}
              </p>

              <p>
                <span class="title is-6">
                  <NuxtLink :to="`/location/${event.location.slug}`">
                    {{ event.location.name }}
                  </NuxtLink>
                </span>
              </p>

              <span class="tag is-success">
                {{ event.category.name }}
              </span>
            </div>
          </div>

          <div class="content">
            <!-- start/end date -->
            <h4 class="title is-6 has-text-normal has-text-grey-dark has-text-centered" v-if="event.end_date">
              {{ event.start_date | fullDate }} - {{ event.end_date | fullDate }}
            </h4>

            <h4 class="title is-6 has-text-normal has-text-grey-dark has-text-centered" v-else>
              {{ event.start_date | fullDate }}
            </h4>

            <!-- start time/end time -->
            <h4 class="subtitle is-6 has-text-normal has-text-grey-light has-text-centered" v-if="event.end_time">
              {{ event.start_time }} - {{ event.end_time }}
            </h4>

            <h4 class="subtitle is-6 has-text-normal has-text-grey-light has-text-centered" v-else>
              {{ event.start_time }}
            </h4>

            <!-- price -->
            <b-button
              type="is-light"
              class="is-centered"
              size="is-medium"
            >
              {{ event.price }}
            </b-button>

            <!-- descriptions -->
            <p class="has-text-grey-dark mt-1" v-if="event.short_description">
              {{ event.short_description }}
            </p>

            <p class="has-text-grey-dark mt-1" v-if="event.description">
              {{ event.description }}
            </p>

            <!-- family friendly (if active) -->
            <b-button
              type="is-warning"
              icon-left="child"
              icon-pack="fas"
              v-if="event.is_family_friendly"
              class="is-centered mb-2"
            >
              Family Friendly
            </b-button>

            <!-- tags list -->
            <div class="tags mt-1" v-if="event.tags.length">
              <NuxtLink
                v-for="tag in event.tags"
                :key="tag.slug"
                :to="`/tags/${tag.slug}`"
                class="tag is-info"
              >
                {{ tag.name }}
              </NuxtLink>
            </div>
          </div>

          <footer class="card-footer" v-if="1 === 2">
            <p class="card-footer-item">

            </p>
          </footer>
        </div>
      </div>
    </div>
  </div>

  <!-- <div class="container mx-auto">
    <div class="flex flex-wrap events-container overflow-hidden">
      <div
        class="event-card overflow-hidden rounded-lg w-full sm:w-full shadow-lg bg-blue-300"
        v-for="event in events"
        :key="event.id"
      >
        <div class="flex flex-wrap mx-auto p-3">
          <div class="w-1/2">
            <NuxtLink :to="`event/${event.slug}`" v-if="event.photo">
              <img :alt="event.name" class="block h-64 w-64 pr-2" :src="event.photo">
            </NuxtLink>
          </div>

          <div class="w-1/2">
            <div class="text-grey-darker text-sm ml-2">
              <div v-if="event.start_time" class="block">
                <strong class="font-bold inline-block mr-1">Start Time:</strong>

                <span class="inline-block float-right">
                  {{ event.start_time }}
                </span>
              </div>

              <div v-if="event.end_time" class="block">
                <strong class="font-bold inline-block mr-1">End Time:</strong>

                <span class="inline-block float-right">
                  {{ event.end_time }}
                </span>
              </div>

              <div v-if="event.price" class="block">
                <strong class="font-bold inline-block mr-1">Price:</strong>

                <span class="inline-block float-right">
                  {{ event.price }}
                </span>
              </div>

              <div v-if="event.is_family_friendly" class="block">
                <i class="fas fa-child mr-1"></i>
                <span class="text-gray-800 inline-block float-right">Family Friendly</span>
              </div>
            </div>

            <br />

            <div class="flex flex-wrap tags ml-2" v-if="event.tags.length">
              <NuxtLink
                v-for="(tag, tagIndex) in event.tags"
                :key="tag.slug"
                :to="`tags/${tag.slug}`"
                class="text-white font-bold py-1 px-2 rounded text-sm bg-blue-500 hover:bg-blue-800 no-underline"
                :class="{ 'mr-1': event.tags.length > 1 && tagIndex < (event.tags.length - 1) }"
              >
                {{ tag.name }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <header class="flex items-center justify-between leading-tight p-2 md:p-4">
          <h1 class="text-lg">
            <NuxtLink :to="`event/${event.slug}`" class="no-underline text-black">
              {{ event.name }}
            </NuxtLink>
          </h1>
        </header>

        <div class="ml-4">
          <p class="block text-grey-darker text-sm mr-2" v-if="event.short_description">
            {{ event.short_description }}
          </p>

          <p class="block text-grey-darker text-sm mr-2" v-if="event.description">
            {{ event.description }}
          </p>
        </div>

        <footer class="flex items-center justify-between leading-none p-2 md:p-4 w-full">
          <NuxtLink :to="`/location/${event.location.slug}`" class="flex items-center no-underline text-black hover:text-gray-800">
            <img v-if="event.location.photo" :alt="event.location.name" class="block rounded-full w-8 h-8" :src="event.location.photo">
            <p class="ml-2 text-lg">
              {{ event.location.name }}
            </p>
          </NuxtLink>

          <NuxtLink :to="`category/${event.category.slug}`" class="flex items-center no-underline text-black hover:text-gray-800">
            <span class="font-bold">
              {{ event.category.name }}
            </span>
          </NuxtLink>

          <a class="no-underline text-grey-darker hover:text-red-dark" href="#" v-if="1 === 2">
            <span class="hidden">Like</span>
            <i class="fa fa-heart"></i>
          </a>
        </footer>
      </div>
    </div>
  </div> -->
</template>

<script>
export default {
  name: 'events-list',

  props: {
    events: {
      type: Array
    }
  }
}
</script>

<style lang="sass" scoped>
.event-image
  width: 100%!important
  height: 250px!important
</style>
