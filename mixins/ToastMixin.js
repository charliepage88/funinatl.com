var ToastMixin = {
  methods: {
    toastSuccess (message) {
      this.$toasted.show(message, {
        type: 'success',
        iconPack: 'fontawesome',
        duration: 1500
      })
    },

    toastError (message) {
      this.$toasted.show(message, {
        type: 'error',
        iconPack: 'fontawesome',
        duration: 5000
      })
    }
  }
}

export default ToastMixin