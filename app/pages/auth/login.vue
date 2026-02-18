<template>
  <div class="min-h-[70vh] flex items-center justify-center px-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-1">Sign In</h1>
        <p class="text-gray-500 text-sm mb-8">Welcome back to FunInATL.</p>

        <form @submit.prevent="submit">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                v-model="form.email"
                type="email"
                required
                autocomplete="email"
                class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                v-model="form.password"
                type="password"
                required
                autocomplete="current-password"
                class="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-orange-500"
                placeholder="••••••••"
              />
            </div>

            <p v-if="errorMsg" class="text-red-500 text-sm">{{ errorMsg }}</p>

            <button
              type="submit"
              :disabled="submitting"
              class="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-semibold py-3 rounded-xl transition-colors"
            >
              {{ submitting ? 'Signing in...' : 'Sign In' }}
            </button>
          </div>
        </form>

        <p class="mt-6 text-center text-sm text-gray-500">
          Don't have an account?
          <NuxtLink to="/auth/register" class="text-orange-500 hover:underline font-medium">Create one</NuxtLink>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'Sign In – FunInATL' })

const { post } = useApi()
const auth = useAuthStore()
const form = reactive({ email: '', password: '' })
const submitting = ref(false)
const errorMsg = ref('')

async function submit() {
  submitting.value = true
  errorMsg.value = ''
  try {
    const data = await post<{ token: string; user: any }>('/auth/login', { ...form })
    auth.setAuth(data.token, data.user)
    await navigateTo('/user/dashboard')
  } catch {
    errorMsg.value = 'Invalid email or password. Please try again.'
  } finally {
    submitting.value = false
  }
}
</script>
