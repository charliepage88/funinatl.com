<template>
  <div :class="{ 'container is-fluid pl-4 pr-4': !isMobile, 'p-1 centered-container': isMobile }">
    <div class="centered-container" v-if="!isMobile">
      <div class="box shadow-md rounded">
        <AboutContent />
      </div>
    </div>

    <AboutContent v-if="isMobile" />
  </div>
</template>

<script>
import AboutContent from '@/components/Static/AboutContent'
import ResponsiveMixin from '@/mixins/ResponsiveMixin'

export default {
  name: 'about',

  components: {
    AboutContent
  },

  mixins: [
    ResponsiveMixin
  ]
}
</script>
