export function useApi() {
  const config = useRuntimeConfig()
  const auth = useAuthStore()

  const $api = $fetch.create({
    baseURL: config.public.apiBase,
    headers: computed(() =>
      auth.token ? { Authorization: `Bearer ${auth.token}` } : {}
    ).value,
    onResponseError({ response }) {
      if (response.status === 401) {
        auth.logout()
        navigateTo('/auth/login')
      }
    },
  })

  return { $api }
}
