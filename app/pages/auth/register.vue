<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeoMeta({ title: 'Register – FunInATL' })

const auth = useAuthStore()
const router = useRouter()

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const error = ref('')
const loading = ref(false)

async function handleRegister() {
  error.value = ''
  if (password.value !== passwordConfirmation.value) {
    error.value = 'Passwords do not match.'
    return
  }
  loading.value = true
  try {
    await auth.register(name.value, email.value, password.value, passwordConfirmation.value)
    router.push('/')
  } catch (e: any) {
    const errors = e?.data?.errors
    if (errors) {
      error.value = Object.values(errors).flat().join(' ')
    } else {
      error.value = e?.data?.message ?? 'Registration failed. Please try again.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-8">
    <div class="card bg-base-200 shadow-lg">
      <div class="card-body gap-6">
        <h1 class="card-title text-2xl">Create Account</h1>

        <form class="flex flex-col gap-4" @submit.prevent="handleRegister">
          <div class="form-control gap-1">
            <label class="label label-text" for="name">Name</label>
            <input
              id="name"
              v-model="name"
              type="text"
              class="input input-bordered w-full"
              placeholder="Your name"
              autocomplete="name"
              required
            />
          </div>

          <div class="form-control gap-1">
            <label class="label label-text" for="email">Email</label>
            <input
              id="email"
              v-model="email"
              type="email"
              class="input input-bordered w-full"
              placeholder="you@example.com"
              autocomplete="email"
              required
            />
          </div>

          <div class="form-control gap-1">
            <label class="label label-text" for="password">Password</label>
            <input
              id="password"
              v-model="password"
              type="password"
              class="input input-bordered w-full"
              placeholder="••••••••"
              autocomplete="new-password"
              minlength="8"
              required
            />
          </div>

          <div class="form-control gap-1">
            <label class="label label-text" for="password-confirm">Confirm Password</label>
            <input
              id="password-confirm"
              v-model="passwordConfirmation"
              type="password"
              class="input input-bordered w-full"
              placeholder="••••••••"
              autocomplete="new-password"
              required
            />
          </div>

          <div v-if="error" role="alert" class="alert alert-error text-sm py-2">
            {{ error }}
          </div>

          <button type="submit" class="btn btn-primary w-full" :disabled="loading">
            {{ loading ? 'Creating account…' : 'Create Account' }}
          </button>
        </form>

        <p class="text-center text-sm opacity-70">
          Already have an account?
          <NuxtLink to="/auth/login" class="link link-primary">Log in</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
