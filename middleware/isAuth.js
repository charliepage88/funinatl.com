export default function ({ app, error, redirect }) {
  const hasToken = !!app.$apolloHelpers.getToken('funinatl')
  if (!hasToken) {
    // console.log(route)
    // console.log(app.$storage.getUniversal('funinatl'))
    // error({ errorCode: 401, message: 'Access Denied' })

    redirect('/auth/login')
  }
}
