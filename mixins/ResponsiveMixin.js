var ResponsiveMixin = {
  computed: {
    isMobile () {
      return this.$mq === 'mobile'
    },

    isDesktop () {
      return this.$mq === 'desktop'
    },

    isDesktopOrWidescreen () {
      return this.$mq === 'desktop' || this.$mq === 'widescreen'
    },

    isWidescreen () {
      return this.$mq === 'widescreen'
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
