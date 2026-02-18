<template>
  <div class="max-w-md mx-auto px-4 sm:px-6 py-16 text-center">
    <h1 class="text-4xl font-bold text-gray-900 mb-2">Stay in the Loop</h1>
    <p class="text-gray-500 mb-8">Get the latest Atlanta events delivered to your inbox.</p>

    <form @submit.prevent="submit">
      <div class="space-y-4">
        <input
          v-model="email"
          type="email"
          required
          class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
          placeholder="your@email.com"
        />
        <p v-if="successMsg" class="text-green-600 text-sm">{{ successMsg }}</p>
        <p v-if="errorMsg" class="text-red-500 text-sm">{{ errorMsg }}</p>
        <button
          type="submit"
          :disabled="submitting"
          class="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {{ submitting ? 'Subscribing...' : 'Subscribe' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Subscribe – FunInATL' })

const { post } = useApi()
const email = ref('')
const submitting = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

async function submit() {
  submitting.value = true
  successMsg.value = ''
  errorMsg.value = ''
  try {
    await post('/newsletter/subscribe', { email: email.value })
    successMsg.value = 'You\'re subscribed! Welcome to the list.'
    email.value = ''
  } catch {
    errorMsg.value = 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>
