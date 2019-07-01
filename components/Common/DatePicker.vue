<template>
  <div>
    <flat-pickr
      class="appearance-none block w-full bg-gray-300 text-gray-700 border rounded py-3 px-4 mb-3"
      v-model="date"
      :config="config"
      :class="{ 'border-gray-300': !hasError, 'border-red-500': hasError }"
    ></flat-pickr>
  </div>
</template>

<script>
  import flatPickr from 'vue-flatpickr-component'
  import 'flatpickr/dist/flatpickr.css'
  
  export default {
    name: 'date-picker',

    props: {
      value: {
        type: String,
        required: false
      },

      hasError: {
        type: Boolean,
        required: false,
        defaut: false
      }
    },

    watch: {
      value (newVal, oldVal) {
        this.updatedValue(newVal)

        this.date = newVal
      },

      date (newVal, oldVal) {
        this.updatedValue(newVal)

        this.$emit('change', newVal)
      }
    },

    data () {
      return {
        date: null,
        config: {
          altInputClass: this.inputClass,
          dateFormat: 'Y-m-d'
        }
      }
    },

    components: {
      flatPickr
    },

    methods: {
      updatedValue (value) {
        this.$emit('change', value)
      }
    },

    mounted () {
      this.date = this.value
    }
  }
</script>
