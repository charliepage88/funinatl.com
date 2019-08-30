export default function ({ $axios, redirect, app }) {
  // $axios.onRequest(config => {
    // console.log('Making request to ' + config.url)
  // })

  $axios.onError(error => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })

  let token = app.$apolloHelpers.getToken('funinatl')

  if (typeof token !== 'undefined') {
    $axios.setToken(token, 'Bearer')
  }
}
