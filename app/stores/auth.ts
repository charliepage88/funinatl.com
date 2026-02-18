import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  email: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null as string | null,
    user: null as User | null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    init() {
      if (import.meta.client) {
        this.token = localStorage.getItem('auth_token')
        const u = localStorage.getItem('auth_user')
        this.user = u ? JSON.parse(u) : null
      }
    },

    setAuth(token: string, user: User) {
      this.token = token
      this.user = user
      if (import.meta.client) {
        localStorage.setItem('auth_token', token)
        localStorage.setItem('auth_user', JSON.stringify(user))
      }
    },

    logout() {
      this.token = null
      this.user = null
      if (import.meta.client) {
        localStorage.removeItem('auth_token')
        localStorage.removeItem('auth_user')
      }
    },
  },
})
