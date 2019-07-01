var ResponsiveMixin = {
  computed: {
    isMobile () {
      return this.$mq === 'mobile'
    },

    isDesktop () {
      return this.$mq === 'desktop'
    },

    isTablet () {
      return this.$mq === 'tablet'
    },

    isMobileOrTablet () {
      return this.$mq === 'mobile' || this.$mq === 'tablet'
    }
  }
}

export default ResponsiveMixin