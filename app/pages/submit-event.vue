<template>
  <div class="max-w-xl mx-auto px-4 sm:px-6 py-16">
    <h1 class="text-4xl font-bold text-gray-900 mb-2">Submit an Event</h1>
    <p class="text-gray-500 mb-8">Share your event with Atlanta.</p>

    <form @submit.prevent="submit">
      <div class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Event Name</label>
          <input v-model="form.name" type="text" required class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" placeholder="Jazz Night at the Fox" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select v-model="form.category_id" required class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500">
            <option value="">Select a category</option>
            <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Venue</label>
          <select v-model="form.location_id" required class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500">
            <option value="">Select a venue</option>
            <option v-for="l in locations" :key="l.id" :value="l.id">{{ l.name }}</option>
          </select>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input v-model="form.start_date" type="date" required :min="minDate" :max="maxDate" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input v-model="form.end_date" type="date" :min="form.start_date || minDate" :max="maxDate" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" />
          </div>
        </div>
        <div class="grid grid-cols-2 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
            <input v-model="form.start_time" type="time" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">End Time</label>
            <input v-model="form.end_time" type="time" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" />
          </div>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input v-model="form.price" type="text" required class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" placeholder="Free / $10 / $10–$20" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Website (optional)</label>
          <input v-model="form.website" type="url" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500" placeholder="https://example.com/tickets" />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Description (optional)</label>
          <textarea v-model="form.short_description" rows="4" class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500 resize-none" placeholder="Brief description of the event..." />
        </div>
        <div class="flex items-center gap-2">
          <input v-model="form.is_family_friendly" id="family" type="checkbox" class="rounded border-gray-300 text-orange-500" />
          <label for="family" class="text-sm text-gray-700">Family-friendly event</label>
        </div>

        <p v-if="successMsg" class="text-green-600 text-sm">{{ successMsg }}</p>
        <p v-if="errorMsg" class="text-red-500 text-sm">{{ errorMsg }}</p>

        <button
          type="submit"
          :disabled="submitting"
          class="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
        >
          {{ submitting ? 'Submitting...' : 'Submit Event' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Submit Event – FunInATL' })

const { get, post } = useApi()

const today = new Date()
const maxD = new Date(today)
maxD.setMonth(maxD.getMonth() + 4)
const fmt = (d: Date) => d.toISOString().split('T')[0]
const minDate = fmt(today)
const maxDate = fmt(maxD)

const form = reactive({
  name: '', category_id: '', location_id: '',
  start_date: '', end_date: '', start_time: '', end_time: '',
  price: '', website: '', short_description: '', is_family_friendly: false,
})
const submitting = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

const [catData, locData] = await Promise.all([
  useAsyncData('submit-cats', () => get<{ categories: any[] }>('/categories')),
  useAsyncData('submit-locs', () => get<{ locations: any[] }>('/locations')),
])
const categories = computed(() => catData.data.value?.categories || [])
const locations = computed(() => locData.data.value?.locations || [])

async function submit() {
  submitting.value = true
  successMsg.value = ''
  errorMsg.value = ''
  try {
    await post('/events/submit', { ...form })
    successMsg.value = 'Event submitted! We\'ll review it shortly.'
    Object.assign(form, { name: '', category_id: '', location_id: '', start_date: '', end_date: '', start_time: '', end_time: '', price: '', website: '', short_description: '', is_family_friendly: false })
  } catch {
    errorMsg.value = 'Something went wrong. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>

