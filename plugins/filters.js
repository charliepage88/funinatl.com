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