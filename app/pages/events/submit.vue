<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

useSeoMeta({ title: 'Submit an Event – FunInATL' })

const config = useRuntimeConfig()
const auth = useAuthStore()

const { data: categories } = await useAsyncData(
  'submit-categories',
  () => $fetch<any[]>('/categories', { baseURL: config.public.apiBase }),
)
const { data: locations } = await useAsyncData(
  'submit-locations',
  () => $fetch<any[]>('/locations', { baseURL: config.public.apiBase }),
)

const form = reactive({
  title: '',
  description: '',
  start_date: '',
  start_time: '',
  end_date: '',
  end_time: '',
  location_id: '',
  category_ids: [] as string[],
  tags: '',
  is_family_friendly: false,
  website_url: '',
  image: null as File | null,
})

const loading = ref(false)
const success = ref(false)
const error = ref('')
const fieldErrors = ref<Record<string, string[]>>({})

function handleImageInput(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) form.image = file
}

async function handleSubmit() {
  loading.value = true
  error.value = ''
  fieldErrors.value = {}

  try {
    const body = new FormData()
    Object.entries(form).forEach(([k, v]) => {
      if (v === null) return
      if (Array.isArray(v)) v.forEach(item => body.append(`${k}[]`, item))
      else if (v instanceof File) body.append(k, v)
      else body.append(k, String(v))
    })

    await $fetch('/events/submit', {
      baseURL: config.public.apiBase,
      method: 'POST',
      headers: { Authorization: `Bearer ${auth.token}` },
      body,
    })
    success.value = true
  } catch (e: any) {
    if (e?.data?.errors) {
      fieldErrors.value = e.data.errors
    }
    error.value = e?.data?.message ?? 'Submission failed. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-2xl mx-auto">
    <div class="flex flex-col gap-6">
      <div>
        <h1 class="text-3xl font-bold">Submit an Event</h1>
        <p class="opacity-60 mt-1">Share an Atlanta event with the community.</p>
      </div>

      <div v-if="success" role="alert" class="alert alert-success">
        <span>Your event was submitted and is pending review. Thank you!</span>
      </div>

      <form v-else class="flex flex-col gap-5" @submit.prevent="handleSubmit">
        <!-- Title -->
        <div class="form-control gap-1">
          <label class="label label-text required">Event Title</label>
          <input v-model="form.title" type="text" class="input input-bordered w-full" required />
          <span v-if="fieldErrors.title" class="text-error text-xs">{{ fieldErrors.title.join(', ') }}</span>
        </div>

        <!-- Description -->
        <div class="form-control gap-1">
          <label class="label label-text">Description</label>
          <textarea v-model="form.description" class="textarea textarea-bordered w-full" rows="5" />
        </div>

        <!-- Dates -->
        <div class="grid grid-cols-2 gap-4">
          <div class="form-control gap-1">
            <label class="label label-text required">Start Date</label>
            <input v-model="form.start_date" type="date" class="input input-bordered w-full" required />
          </div>
          <div class="form-control gap-1">
            <label class="label label-text">Start Time</label>
            <input v-model="form.start_time" type="time" class="input input-bordered w-full" />
          </div>
          <div class="form-control gap-1">
            <label class="label label-text">End Date</label>
            <input v-model="form.end_date" type="date" class="input input-bordered w-full" />
          </div>
          <div class="form-control gap-1">
            <label class="label label-text">End Time</label>
            <input v-model="form.end_time" type="time" class="input input-bordered w-full" />
          </div>
        </div>

        <!-- Location -->
        <div class="form-control gap-1">
          <label class="label label-text">Location</label>
          <select v-model="form.location_id" class="select select-bordered w-full">
            <option value="">Select a location</option>
            <option v-for="loc in locations" :key="loc.id" :value="loc.id">{{ loc.name }}</option>
          </select>
        </div>

        <!-- Categories -->
        <div class="form-control gap-1">
          <label class="label label-text">Categories</label>
          <div class="flex flex-wrap gap-2">
            <label
              v-for="cat in categories"
              :key="cat.id"
              class="flex items-center gap-1.5 cursor-pointer"
            >
              <input
                v-model="form.category_ids"
                type="checkbox"
                :value="String(cat.id)"
                class="checkbox checkbox-sm checkbox-primary"
              />
              <span class="text-sm">{{ cat.name }}</span>
            </label>
          </div>
        </div>

        <!-- Tags -->
        <div class="form-control gap-1">
          <label class="label label-text">Tags</label>
          <input v-model="form.tags" type="text" class="input input-bordered w-full" placeholder="music, outdoor, free (comma-separated)" />
        </div>

        <!-- Website -->
        <div class="form-control gap-1">
          <label class="label label-text">Website / Ticket Link</label>
          <input v-model="form.website_url" type="url" class="input input-bordered w-full" placeholder="https://…" />
        </div>

        <!-- Family Friendly -->
        <label class="flex items-center gap-3 cursor-pointer">
          <input v-model="form.is_family_friendly" type="checkbox" class="checkbox checkbox-primary" />
          <span>Family Friendly</span>
        </label>

        <!-- Image -->
        <div class="form-control gap-1">
          <label class="label label-text">Event Image</label>
          <input type="file" accept="image/*" class="file-input file-input-bordered w-full" @change="handleImageInput" />
        </div>

        <div v-if="error" role="alert" class="alert alert-error text-sm py-2">{{ error }}</div>

        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Submitting…' : 'Submit Event' }}
        </button>
      </form>
    </div>
  </div>
</template>
