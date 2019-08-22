export default function ({ app, error }) {
  const hasToken = !!app.$apolloHelpers.getToken()
  if (!hasToken) {
    error({ errorCode: 401, message: 'Access Denied' })
  }
}
