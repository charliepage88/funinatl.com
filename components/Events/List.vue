<template>
  <div class="container my-12 mx-auto px-4 md:px-12">
    <div class="flex flex-wrap -mx-1 lg:-mx-4 xl:-mx-2">
      <!-- Column -->
      <div class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3 xl:w-1/3 xl:px-2" v-for="event in events" :key="event.id">
        <!-- Article -->
        <article class="overflow-hidden rounded-lg shadow-lg">
          <NuxtLink :to="`event/${event.slug}`">
            <img v-if="event.photo" :alt="event.name" class="block h-64 w-64" :src="event.photo">
          </NuxtLink>

          <header class="flex items-center justify-between leading-tight p-2 md:p-4">
            <h1 class="text-lg">
              <a class="no-underline hover:underline text-black" href="#">
                {{ event.name }}
              </a>
            </h1>

            <p class="text-grey-darker text-sm" v-if="event.short_description">
              {{ event.short_description }}
            </p>

            <p class="text-grey-darker text-sm" v-if="event.description">
              {{ event.description }}
            </p>

            <p class="text-grey-darker text-sm">
              <span v-if="!event.end_time">{{ event.start_time }}</span>
              <span v-else>{{ event.start_time }} - {{ event.end_time }}</span>
              <br />
              <strong class="font-bold">{{ event.price }}</strong>
            </p>
          </header>

          <footer class="flex items-center justify-between leading-none p-2 md:p-4">
            <NuxtLink :to="`location/${event.location.slug}`" class="flex items-center no-underline hover:underline text-black">
              <img v-if="event.location.photo" :alt="event.location.name" class="block rounded-full w-8 h-8" :src="event.location.photo">
              <p class="ml-2 text-sm">
                {{ event.location.name }}
              </p>
            </NuxtLink>

            <span class="font-bold">{{ event.category }}</span>

            <div class="tags" v-if="event.tags.length">
              <NuxtLink v-for="tag in event.tags" :to="`tags/${tag.slug}`" class="text-white font-bold py-1 px-3 rounded text-sm bg-blue-500 hover:bg-blue-800 no-underline">
                {{ tag.name }}
              </NuxtLink>
            </div>

            <a class="no-underline text-grey-darker hover:text-red-dark" href="#">
              <span class="hidden">Like</span>
              <i class="fa fa-heart"></i>
            </a>
          </footer>
        </article>
        <!-- END Article -->
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
