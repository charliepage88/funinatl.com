<template>
  <div>
    <h1>Dashboard</h1>

    <pre v-if="user">{{ user }}</pre>
  </div>
</template>

<script>
export default {
  name: 'dashboard',

  middleware: [
    'isAuth'
  ],

  data () {
    return {
      user: null
    }
  },

  mounted () {
    let user = this.$storage.getUniversal('funinatl_user')

    this.user = user
  }
}
</script>
