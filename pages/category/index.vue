<template>
  <div v-if="categories.length">
    <ul v-for="category in categories">
      <li>
        <pre>{{ category }}</pre>
      </li>
    </ul>
  </div>
</template>

<script>
import Categories from '@/queries/Categories'

export default {
  name: 'categories-index',

  apollo: {
    categories: {
      prefetch: true,
      query: Categories
    }
  }
}
</script>
