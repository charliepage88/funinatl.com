<template>
  <div>
    <flat-pickr :class="config.altInputClass" v-model="date" :config="config"></flat-pickr>
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

      moreClasses: {
        type: String,
        required: false
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

    computed: {
      inputClass () {
        let classes = 'appearance-none block w-full bg-gray-300 text-gray-700 border border-gray-300 rounded py-3 px-4 mb-3'

        if (this.moreClasses && this.moreClasses.length) {
          classes = `${classes} ${this.moreClasses}`
        }

        return classes
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
