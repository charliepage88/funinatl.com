<template>
  <div :class="{ 'container is-fluid pl-4 pr-4': !isMobile, 'p-1 centered-container': isMobile }">
    <div class="centered-container" v-if="!isMobile">
      <div class="box shadow-md rounded">
        <SubmitEventForm :categories="categories" :locations="locations" />
      </div>
    </div>

    <SubmitEventForm v-if="isMobile" :categories="categories" :locations="locations" />
  </div>
</template>

<script>
import Categories from '@/queries/categories'
import Locations from '@/queries/locations'
import SubmitEventForm from '@/components/Static/SubmitEventForm'
import ResponsiveMixin from '@/mixins/ResponsiveMixin'

export default {
	name: 'submit-event',

  async asyncData (context) {
    let client = context.app.apolloProvider.defaultClient

    const response = {
      categories: [],
      locations: []
    }

    response.categories = await client.query({
        query: Categories,
        variables: context.params
      })
      .then(({ data }) => {
        return data.categories
      })

    response.locations = await client.query({
        query: Locations,
        variables: context.params
      })
      .then(({ data }) => {
        return data.locations
      })

    return response
  },

  components: {
    SubmitEventForm
  },

  mixins: [
    ResponsiveMixin
  ],

	apollo: {
    categories: {
      prefetch: true,
      query: Categories
    },

    locations: {
      prefetch: true,
      query: Locations
    }
  }
}
</script>
