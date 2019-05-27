<template>
  <section class="section" v-if="category">
    <h3>{{ category.name }}</h3>
    
    <pre>{{ category }}</pre>
  </section>
</template>

<script>
import categoryBySlug from '@/queries/categoryBySlug'

export default {
  name: 'category-show',

  computed: {
    category () {
      return this.categoryBySlug
    }
  },

  apollo: {
    categoryBySlug: {
      prefetch: ({ route }) => ({ slug: route.params.slug }),
      variables() {
        return { slug: this.$route.params.slug }
      },
      query: categoryBySlug
    }
  }
}
</script>
