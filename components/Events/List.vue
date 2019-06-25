<template>
  <div class="container mx-auto">
    <div class="flex flex-wrap events-container overflow-hidden">
      <!-- Column -->
      <div class="event-card w-full overflow-hidden md:w-full lg:w-1/2 xl:w-1/3 rounded-lg shadow-lg bg-blue-300" v-for="(event, index) in events" :key="event.id">
        <div class="flex flex-wrap mx-auto p-3">
          <div class="w-1/2">
            <NuxtLink :to="`event/${event.slug}`" v-if="event.photo">
              <img :alt="event.name" class="block h-64 w-64 pr-2" :src="event.photo">
            </NuxtLink>
          </div>

          <div class="w-1/2">
            <p class="text-grey-darker text-sm ml-6">
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
            </p>

            <br />

            <div class="tags" v-if="event.tags.length">
              <NuxtLink
                v-for="(tag, tagIndex) in event.tags"
                :key="tag.slug"
                :to="`tags/${tag.slug}`"
                class="text-white font-bold py-1 px-3 rounded text-sm bg-blue-500 hover:bg-blue-800 no-underline"
                :class="{ 'mr-1': event.tags.length > 1 && tagIndex < (event.tags.length - 1) }"
              >
                {{ tag.name }}
              </NuxtLink>
            </div>
          </div>
        </div>

        <header class="flex items-center justify-between leading-tight p-2 md:p-4">
          <h1 class="text-lg">
            <a class="no-underline text-black" href="#">
              {{ event.name }}
            </a>
          </h1>
        </header>

        <div class="ml-4">
          <p class="block text-grey-darker text-sm" v-if="event.short_description">
            {{ event.short_description }}
          </p>

          <p class="block text-grey-darker text-sm" v-if="event.description">
            {{ event.description }}
          </p>
        </div>

        <footer class="flex items-center justify-between leading-none p-2 md:p-4">
          <NuxtLink :to="`location/${event.location.slug}`" class="flex items-center no-underline text-black hover:text-gray-800">
            <img v-if="event.location.photo" :alt="event.location.name" class="block rounded-full w-8 h-8" :src="event.location.photo">
            <p class="ml-2 text-sm">
              {{ event.location.name }}
            </p>
          </NuxtLink>

          <NuxtLink :to="`category/${event.category.slug}`" class="flex items-center no-underline text-black hover:text-gray-800">
            <span class="font-bold">
              {{ event.category.name }}
            </span>
          </NuxtLink>

          <a class="no-underline text-grey-darker hover:text-red-dark" href="#">
            <span class="hidden">Like</span>
            <i class="fa fa-heart"></i>
          </a>
        </footer>
      </div>
      <!-- END Column -->
    </div>
  </div>
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
