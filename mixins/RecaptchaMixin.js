import { mapActions } from 'vuex'

var RecaptchaMixin = {
  data () {
    return {
      recaptcha_token: null
    }
  },

  methods: {
    ...mapActions('auth', [
      'startLoading',
      'stopLoading'
    ]),

    async submitRecaptcha() {
      let status
      let error

      try {
        this.startLoading()

        const token = await this.$recaptcha.execute('login')

        this.recaptcha_token = token

        status = true
      } catch (err) {
        error = err

        status = false
      } finally {
        this.stopLoading()
      }

      return {
        status: status,
        error: error
      }
    }
  },

  async mounted () {
    await this.$recaptcha.init()
  }
}

export default RecaptchaMixin