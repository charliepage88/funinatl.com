<template>
  <div :class="{ 'container is-fluid pl-4 pr-4': !isMobile, 'p-1 centered-container': isMobile }">
    <div class="centered-container" v-if="!isMobile">
      <div class="box shadow-md rounded">
        <SubscribeForm />
      </div>
    </div>

    <SubscribeForm v-if="isMobile" />
  </div>
</template>

<script>
import SubscribeForm from '@/components/Static/SubscribeForm'
import ResponsiveMixin from '@/mixins/ResponsiveMixin'

export default {
  name: 'subscribe',

  head () {
    return {
      title: 'Atlanta Events - Subscribe | FunInATL',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Subscribe to the FunInATL newsletter to get updates on the best upcoming events in Atlanta.'
        }
      ]
    }
  },

  components: {
    SubscribeForm
  },

  mixins: [
    ResponsiveMixin
  ]
}
</script>
