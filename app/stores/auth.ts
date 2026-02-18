import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  const config = useRuntimeConfig()
  const token = useCookie<string | null>('auth_token', {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  })
  const user = ref<User | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(email: string, password: string) {
    const data = await $fetch<{ token: string; user: User }>('/auth/login', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: { email, password },
    })
    token.value = data.token
    user.value = data.user
  }

  async function register(name: string, email: string, password: string, password_confirmation: string) {
    const data = await $fetch<{ token: string; user: User }>('/auth/register', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: { name, email, password, password_confirmation },
    })
    token.value = data.token
    user.value = data.user
  }

  async function fetchUser() {
    if (!token.value) return
    try {
      user.value = await $fetch<User>('/user', {
        baseURL: config.public.apiBase,
        headers: { Authorization: `Bearer ${token.value}` },
      })
    } catch {
      logout()
    }
  }

  function logout() {
    token.value = null
    user.value = null
  }

  return { token, user, isAuthenticated, login, register, logout, fetchUser }
})
