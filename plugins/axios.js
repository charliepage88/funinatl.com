import Cookies from 'js-cookie'

export default function ({ $axios, redirect }) {
  $axios.onRequest(config => {
    console.log('Making request to ' + config.url)
  })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })

  let token = Cookies.get('token')

  if (typeof token !== 'undefined') {
    $axios.setToken(token, 'Bearer')
  }
}
