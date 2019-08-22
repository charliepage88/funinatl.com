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

  computed: {
    user () {
      let value = null
      let user = this.$storage.getCookie('funinatl_user')

      if (user) {
        value = JSON.parse(user)
      }

      return value
    }
  }
}
</script>
