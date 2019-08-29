<template>
  <div class="card-image" v-if="event">
    <NuxtLink :to="`/event/${event.slug}`" class="is-visible-mobile" :aria-label="event.name">
      <figure class="image">
        <clazy-load class="clazy-load-wrapper" :src="event.thumb_mobile" :ratio="0.1">
          <transition name="fade">
            <img :alt="event.name" class="event-image" :src="event.thumb_mobile">
          </transition>
        </clazy-load>
      </figure>
    </NuxtLink>

    <NuxtLink :to="`/event/${event.slug}`" class="is-visible-tablet" :aria-label="event.name">
      <figure class="image">
        <clazy-load class="clazy-load-wrapper" :src="event.thumb_tablet" :ratio="0.1">
          <transition name="fade">
            <img :alt="event.name" class="event-image" :src="event.thumb_tablet">
          </transition>
        </clazy-load>
      </figure>
    </NuxtLink>

    <NuxtLink :to="`/event/${event.slug}`" class="is-visible-computer" :aria-label="event.name">
      <figure class="image">
        <clazy-load class="clazy-load-wrapper" :src="event.thumb_desktop" :ratio="0.1">
          <transition name="fade">
            <img :alt="event.name" class="event-image" :src="event.thumb_desktop">
          </transition>
        </clazy-load>
      </figure>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  name: 'event-card-photo',

  props: [
    'event'
  ]
}
</script>
