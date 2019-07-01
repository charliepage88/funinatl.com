import get from 'lodash.get'
import isEmpty from 'lodash.isempty'

const state = () => ({
  loading: false,
  errors: {}
})

const getters = {
  hasErrors: (state) => {
    return !isEmpty(state.errors)
  }
}

const mutations = {
  setLoading (state, value) {
    state.loading = value
  },

  setErrors (state, errors) {
    if (!isEmpty(errors)) {
      state.errors = errors
    }
  },

  unsetErrors (state) {
    state.errors = {}
  }
}

const actions = {
  async newsletterSubscribe({ commit, state }, form) {
    let result = false

    try {
      commit('setLoading', true)

      const resp = await this.$axios.post(`${process.env.API_ENDPOINT}/api/newsletter/subscribe`, form)

      result = true
    } catch (err) {
      commit('setErrors', get(err, 'response.data.errors', {}))
    } finally {
      commit('setLoading', false)
    }

    return result
  },

  async submitEvent({ commit, state }, form) {
    let result = false

    try {
      commit('setLoading', true)

      const resp = await this.$axios.post(`${process.env.API_ENDPOINT}/api/events/submit`, form)

      result = true
    } catch (err) {
      commit('setErrors', get(err, 'response.data.errors', {}))
    } finally {
      commit('setLoading', false)
    }

    return result
  },

  logout({ commit, state }) {
    commit('unsetToken')
    commit('setUser', null)
    commit('unsetErrors')

    return true
  },

  async register({ commit }, data) {
    let result = false

    try {
      commit('setLoading', true)

      const resp = await this.$axios.post(`${process.env.API_ENDPOINT}/api/register`, data)

      result = true
    } catch (err) {
      commit('setErrors', get(err, 'response.data.errors', {}))
    } finally {
      commit('setLoading', false)
    }

    return result
  },

  async confirmEmail({ commit }, data) {
    let result = false

    try {
      commit('setLoading', true)

      const resp = await this.$axios.post(`${process.env.API_ENDPOINT}/api/confirm-email`, data)

      result = true

      commit('setToken', resp.data.token)
      commit('setUser', resp.data.user)
      commit('unsetErrors')

      setTokenAndUser(resp.data.token, resp.data.user)
    } catch (err) {
      commit('setErrors', get(err, 'response.data.errors', {}))
    } finally {
      commit('setLoading', false)
    }

    return result
  },

  /*
  async loadUser({ commit, state }, loadToken = true) {
    if (loadToken) {
      commit('loadToken')
    }

    if (state.token && !state.user) {
      try {
        commit('setLoading', true)

        let resp = await this.$axios.$get(`${process.env.API_ENDPOINT}/api/user`)

        commit('setUser', resp)
      } catch (err) {
        commit('setErrors', get(err, 'response.data.errors', {}))
      } finally {
        commit('setLoading', false)
      }
    }

    return state.user
  },
  */

  async updateUser({ commit, state }, data) {
    let result = false

    try {
      commit('setLoading', true)

      let resp = await this.$axios.$put(`${process.env.API_ENDPOINT}/api/user`, data)

      result = true

      commit('setUser', resp)
      commit('unsetErrors')

      updateUserData(resp)
    } catch (err) {
      commit('setErrors', get(err, 'response.data.errors', {}))
    } finally {
      commit('setLoading', false)
    }

    return result
  },

  async forgotPassword({ commit }, data) {
    let result = false

    try {
      commit('setLoading', true)

      const resp = await this.$axios.post(`${process.env.API_ENDPOINT}/api/forgot-password`, data)

      result = true

      commit('unsetErrors')
    } catch (err) {
      commit('setErrors', get(err, 'response.data.errors', {}))
    } finally {
      commit('setLoading', false)
    }

    return result
  },

  async resetPassword({ commit }, data) {
    let result = false

    try {
      commit('setLoading', true)

      const resp = await this.$axios.post(`${process.env.API_ENDPOINT}/api/reset-password`, data)

      result = true

      commit('setToken', resp.data.token)
      commit('setUser', resp.data.user)
      commit('unsetErrors')

      setTokenAndUser(resp.data.token, resp.data.user)
    } catch (err) {
      commit('setErrors', get(err, 'response.data.errors', {}))
    } finally {
      commit('setLoading', false)
    }

    return result
  },

  startLoading ({ commit }) {
    commit('setLoading', true)
  },

  stopLoading ({ commit }) {
    commit('setLoading', false)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
