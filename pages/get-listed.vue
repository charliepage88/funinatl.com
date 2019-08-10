<template>
  <div :class="{ 'container is-fluid pl-4 pr-4': !isMobile, 'p-1 centered-container': isMobile }">
    <div class="centered-container" v-if="!isMobile">
      <div class="box shadow-md rounded">
        <GetListedForm :categories="categories" />
      </div>
    </div>

    <GetListedForm v-if="isMobile" :categories="categories" />
  </div>
</template>

<script>
import Categories from '@/queries/categories'
import GetListedForm from '@/components/Static/GetListedForm'
import ResponsiveMixin from '@/mixins/ResponsiveMixin'

export default {
	name: 'get-listed',

  async asyncData (context) {
    let client = context.app.apolloProvider.defaultClient

    const response = {
      categories: []
    }

    response.categories = await client.query({
        query: Categories,
        variables: context.params
      })
      .then(({ data }) => {
        return data.categories
      })

    return response
  },

  components: {
    GetListedForm
  },

  mixins: [
    ResponsiveMixin
  ],

	apollo: {
    categories: {
      prefetch: true,
      query: Categories
    }
  }
}
</script>
