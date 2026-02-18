<template>
  <div class="max-w-xl mx-auto px-4 sm:px-6 py-16">
    <h1 class="text-4xl font-bold text-gray-900 mb-2">Get Your Venue Listed</h1>
    <p class="text-gray-500 mb-8">Submit your venue so Atlanta can find you.</p>

    <form @submit.prevent="submit">
      <div class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Venue Name</label>
          <input v-model="form.name" type="text" required class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" placeholder="The Masquerade" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select v-model="form.category" required class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500">
            <option value="">Select a category</option>
            <option v-for="c in categories" :key="c.slug" :value="c.slug">{{ c.name }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Website</label>
          <input v-model="form.website" type="url" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" placeholder="https://example.com" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <input v-model="form.address" type="text" required class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" placeholder="123 Main St" />
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">City</label>
            <input v-model="form.city" type="text" required class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" placeholder="Atlanta" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">ZIP</label>
            <input v-model="form.zip" type="text" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" placeholder="30301" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
          <textarea v-model="form.description" rows="4" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 resize-none" placeholder="Tell us about your venue..." />
        </div>
        <div class="flex items-center gap-2">
          <input v-model="form.is_family_friendly" id="family" type="checkbox" class="rounded border-gray-300 text-orange-500" />
          <label for="family" class="text-sm text-gray-700">Family-friendly venue</label>
        </div>

        <p v-if="successMsg" class="text-green-600 text-sm">{{ successMsg }}</p>
        <p v-if="errorMsg" class="text-red-500 text-sm">{{ errorMsg }}</p>

        <button
          type="submit"
          :disabled="submitting"
          class="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {{ submitting ? 'Submitting...' : 'Submit Venue' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Get Listed – FunInATL' })

const { get, post } = useApi()
const form = reactive({
  name: '', category: '', website: '', address: '', city: 'Atlanta', zip: '',
  description: '', is_family_friendly: false,
})
const submitting = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

const { data } = await useAsyncData('categories', () => get<{ categories: any[] }>('/categories'))
const categories = computed(() => data.value?.categories || [])

async function submit() {
  submitting.value = true
  successMsg.value = ''
  errorMsg.value = ''
  try {
    await post('/locations/submit', { ...form })
    successMsg.value = 'Submitted! We\'ll review and add your venue shortly.'
    Object.assign(form, { name: '', category: '', website: '', address: '', city: 'Atlanta', zip: '', description: '', is_family_friendly: false })
  } catch {
    errorMsg.value = 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

