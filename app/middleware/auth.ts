export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore()
  if (!auth.token) {
    return navigateTo('/auth/login')
  }
})
