<template>
  <div :class="{ 'container is-fluid pl-4 pr-4': !isMobile, 'p-1 centered-container': isMobile }">
    <div class="centered-container" v-if="!isMobile">
      <div class="box shadow-md rounded">
        <LoginForm />
      </div>
    </div>

    <LoginForm v-if="isMobile" />
  </div>
</template>

<script>
import LoginForm from '@/components/Auth/LoginForm'
import ResponsiveMixin from '@/mixins/ResponsiveMixin'

export default {
  name: 'login',

  head () {
    return {
      title: 'Atlanta Events - Login | FunInATL',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Login to your account on FunInATL to get more access to events going on in Atlanta.'
        }
      ]
    }
  },

  components: {
    LoginForm
  },

  mixins: [
    ResponsiveMixin
  ]
}
</script>
