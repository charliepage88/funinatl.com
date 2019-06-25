<template>
  <span
    class="border rounded-full border-gray-300 flex items-center cursor-pointer w-12"
    :class="{ 'bg-green-600 justify-end': enabled }"
    @click.prevent="toggle"
  >
    <span class="rounded-full border w-6 h-6 border-gray-300 shadow-inner bg-white shadow">
    </span>
  </span>
</template>

<script>
export default {
	name: 'checkbox',

  props: [
    'value'
  ],

  watch: {
    value (newValue, oldValue) {
      this.enabled = newValue
    }
  },

  data () {
    return {
      enabled: false
    }
  },

  methods: {
    toggle () {
      this.enabled = !this.enabled

      this.$emit('change', this.enabled)
    }
  },

  mounted () {
    this.enabled = this.value
  }
}
</script>
