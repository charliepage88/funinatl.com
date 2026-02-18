<template>
  <div class="max-w-xl mx-auto px-4 sm:px-6 py-16">
    <h1 class="text-4xl font-bold text-gray-900 mb-2">Contact Us</h1>
    <p class="text-gray-500 mb-8">Have a question or feedback? We'd love to hear from you.</p>

    <form @submit.prevent="submit">
      <div class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            v-model="form.name"
            type="text"
            required
            class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
            placeholder="Your name"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="form.email"
            type="email"
            required
            class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
            placeholder="your@email.com"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            v-model="form.body"
            required
            rows="6"
            class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 resize-none"
            placeholder="What's on your mind?"
          />
        </div>

        <p v-if="successMsg" class="text-green-600 text-sm">{{ successMsg }}</p>
        <p v-if="errorMsg" class="text-red-500 text-sm">{{ errorMsg }}</p>

        <button
          type="submit"
          :disabled="submitting"
          class="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {{ submitting ? 'Sending...' : 'Send Message' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Contact – FunInATL' })

const { post } = useApi()
const form = reactive({ name: '', email: '', body: '' })
const submitting = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

async function submit() {
  submitting.value = true
  successMsg.value = ''
  errorMsg.value = ''
  try {
    await post('/contact/submit', { ...form })
    successMsg.value = 'Message sent! We\'ll be in touch soon.'
    form.name = ''
    form.email = ''
    form.body = ''
  } catch {
    errorMsg.value = 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>
