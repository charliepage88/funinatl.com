import Vue from 'vue'
import Vuex from 'vuex'
import site from './site'

Vue.use(Vuex)

export default () => {
  return new Vuex.Store({
    state: () => ({
      loading: false
    }),

    mutations: {
      setLoading (state, value) {
        state.loading = value
      }
    },

    modules: {
      site
    }
  })
}
