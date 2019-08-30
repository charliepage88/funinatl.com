export default function ({ app, error, redirect }) {
  const hasToken = !!app.$apolloHelpers.getToken('funinatl')
  if (!hasToken) {
    redirect('/auth/login')
  }
}
