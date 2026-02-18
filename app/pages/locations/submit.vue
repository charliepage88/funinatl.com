<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
})

useSeoMeta({ title: 'Submit a Location – FunInATL' })

const config = useRuntimeConfig()
const auth = useAuthStore()

const form = reactive({
  name: '',
  address: '',
  city: 'Atlanta',
  state: 'GA',
  zip: '',
  description: '',
  website_url: '',
  phone: '',
  tags: '',
  photo: null as File | null,
})

const loading = ref(false)
const success = ref(false)
const error = ref('')
const fieldErrors = ref<Record<string, string[]>>({})

function handlePhotoInput(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) form.photo = file
}

async function handleSubmit() {
  loading.value = true
  error.value = ''
  fieldErrors.value = {}

  try {
    const body = new FormData()
    Object.entries(form).forEach(([k, v]) => {
      if (v === null) return
      if (v instanceof File) body.append(k, v)
      else body.append(k, String(v))
    })

    await $fetch('/locations/submit', {
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
        <h1 class="text-3xl font-bold">Submit a Location</h1>
        <p class="opacity-60 mt-1">Add a venue or location to the FunInATL directory.</p>
      </div>

      <div v-if="success" role="alert" class="alert alert-success">
        <span>Location submitted! It will appear after review. Thank you!</span>
      </div>

      <form v-else class="flex flex-col gap-5" @submit.prevent="handleSubmit">
        <div class="form-control gap-1">
          <label class="label label-text required">Location Name</label>
          <input v-model="form.name" type="text" class="input input-bordered w-full" required />
          <span v-if="fieldErrors.name" class="text-error text-xs">{{ fieldErrors.name.join(', ') }}</span>
        </div>

        <div class="form-control gap-1">
          <label class="label label-text">Street Address</label>
          <input v-model="form.address" type="text" class="input input-bordered w-full" />
        </div>

        <div class="grid grid-cols-3 gap-3">
          <div class="form-control gap-1 col-span-1">
            <label class="label label-text">City</label>
            <input v-model="form.city" type="text" class="input input-bordered w-full" />
          </div>
          <div class="form-control gap-1">
            <label class="label label-text">State</label>
            <input v-model="form.state" type="text" class="input input-bordered w-full" maxlength="2" />
          </div>
          <div class="form-control gap-1">
            <label class="label label-text">ZIP</label>
            <input v-model="form.zip" type="text" class="input input-bordered w-full" maxlength="10" />
          </div>
        </div>

        <div class="form-control gap-1">
          <label class="label label-text">Description</label>
          <textarea v-model="form.description" class="textarea textarea-bordered w-full" rows="4" />
        </div>

        <div class="form-control gap-1">
          <label class="label label-text">Website</label>
          <input v-model="form.website_url" type="url" class="input input-bordered w-full" placeholder="https://…" />
        </div>

        <div class="form-control gap-1">
          <label class="label label-text">Phone</label>
          <input v-model="form.phone" type="tel" class="input input-bordered w-full" placeholder="(404) 555-0100" />
        </div>

        <div class="form-control gap-1">
          <label class="label label-text">Tags</label>
          <input v-model="form.tags" type="text" class="input input-bordered w-full" placeholder="venue, bar, outdoor (comma-separated)" />
        </div>

        <div class="form-control gap-1">
          <label class="label label-text">Photo</label>
          <input type="file" accept="image/*" class="file-input file-input-bordered w-full" @change="handlePhotoInput" />
        </div>

        <div v-if="error" role="alert" class="alert alert-error text-sm py-2">{{ error }}</div>

        <button type="submit" class="btn btn-primary" :disabled="loading">
          {{ loading ? 'Submitting…' : 'Submit Location' }}
        </button>
      </form>
    </div>
  </div>
</template>
