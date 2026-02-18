<script setup lang="ts">
definePageMeta({ layout: 'default' })

useSeoMeta({ title: 'Login – FunInATL' })

const auth = useAuthStore()
const router = useRouter()

const email = ref('')
const password = ref('')
const error = ref('')
const loading = ref(false)

async function handleLogin() {
  error.value = ''
  loading.value = true
  try {
    await auth.login(email.value, password.value)
    router.push('/')
  } catch (e: any) {
    error.value = e?.data?.message ?? 'Invalid credentials. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="max-w-md mx-auto mt-8">
    <div class="card bg-base-200 shadow-lg">
      <div class="card-body gap-6">
        <h1 class="card-title text-2xl">Log In</h1>

        <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
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
              autocomplete="current-password"
              required
            />
          </div>

          <div v-if="error" role="alert" class="alert alert-error text-sm py-2">
            {{ error }}
          </div>

          <button type="submit" class="btn btn-primary w-full" :disabled="loading">
            {{ loading ? 'Logging in…' : 'Log In' }}
          </button>
        </form>

        <p class="text-center text-sm opacity-70">
          Don't have an account?
          <NuxtLink to="/auth/register" class="link link-primary">Register</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>
