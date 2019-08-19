<template>
  <div :class="{ 'container is-fluid pl-4 pr-4': !isMobile, 'p-1 centered-container': isMobile }">
  	<div class="centered-container" v-if="!isMobile">
  	  <div class="box shadow-md rounded">
  	    <ContactForm />
  	  </div>
  	</div>

    <ContactForm v-if="isMobile" />
  </div>
</template>

<script>
import ContactForm from '@/components/Static/ContactForm'
import ResponsiveMixin from '@/mixins/ResponsiveMixin'

export default {
	name: 'contact',

  head () {
    return {
      title: 'Atlanta Events - Contact | FunInATL',
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: 'Get in contact with FunInATL.'
        }
      ]
    }
  },

  components: {
    ContactForm
  },

  mixins: [
    ResponsiveMixin
  ]
}
</script>
