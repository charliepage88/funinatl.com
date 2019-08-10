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

  components: {
    SubscribeForm
  },

  mixins: [
    ResponsiveMixin
  ]
}
</script>
