import Vue from 'vue'
import moment from 'moment'

Vue.filter('date', (val) => {
  return moment(val).format('MMMM Do YYYY, h:mm a')
})

Vue.filter('timeAgo', (val) => {
  return moment(val).fromNow()
})

Vue.filter('truncate', function (text, stop, clamp) {
  return text.slice(0, stop) + (stop < text.length ? clamp || '...' : '')
})

Vue.filter('normalDate', (value) => {
  let date = moment(value)

  return date.format('dddd, MMMM Do')
})

Vue.filter('dayOfWeek', (value) => {
  let date = moment(value)

  return date.format('dddd, MMM Do')
})

Vue.filter('friendlyDate', (value) => {
  return moment(value).format('dddd, MMM Do')
})
