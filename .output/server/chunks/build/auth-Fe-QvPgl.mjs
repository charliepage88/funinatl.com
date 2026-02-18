import { defineStore } from 'pinia';

const useAuthStore = defineStore("auth", {
  state: () => ({
    token: null,
    user: null
  }),
  getters: {
    isLoggedIn: (state) => !!state.token
  },
  actions: {
    init() {
    },
    setAuth(token, user) {
      this.token = token;
      this.user = user;
    },
    logout() {
      this.token = null;
      this.user = null;
    }
  }
});

export { useAuthStore as u };
//# sourceMappingURL=auth-Fe-QvPgl.mjs.map
