import Vue from 'vue'
import VueMq from 'vue-mq'

Vue.use(VueMq, {
  breakpoints: { // default breakpoints - customize this
    mobile: 450,
    tablet: 1250,
    desktop: 1440,
    widescreen: Infinity
  },
  defaultBreakpoint: 'desktop'
})
