<script setup lang="ts">
const email = ref('')
const subscribed = ref(false)
const subscribing = ref(false)
const error = ref('')

async function subscribe() {
  if (!email.value) return
  subscribing.value = true
  error.value = ''
  try {
    const config = useRuntimeConfig()
    await $fetch('/newsletter/subscribe', {
      baseURL: config.public.apiBase,
      method: 'POST',
      body: { email: email.value },
    })
    subscribed.value = true
  } catch {
    error.value = 'Something went wrong. Please try again.'
  } finally {
    subscribing.value = false
  }
}
</script>

<template>
  <footer class="footer footer-center bg-base-300 text-base-content p-10 mt-16">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
      <div class="flex flex-col gap-2">
        <span class="footer-title">FunInATL</span>
        <p class="text-sm opacity-70">Your guide to events and activities in Atlanta, GA.</p>
      </div>

      <div class="flex flex-col gap-2">
        <span class="footer-title">Explore</span>
        <NuxtLink to="/" class="link link-hover text-sm">Events</NuxtLink>
        <NuxtLink to="/search" class="link link-hover text-sm">Search</NuxtLink>
        <NuxtLink to="/categories" class="link link-hover text-sm">Categories</NuxtLink>
        <NuxtLink to="/events/submit" class="link link-hover text-sm">Submit an Event</NuxtLink>
        <NuxtLink to="/locations/submit" class="link link-hover text-sm">Submit a Location</NuxtLink>
      </div>

      <div class="flex flex-col gap-3">
        <span class="footer-title">Newsletter</span>
        <p class="text-sm opacity-70">Get weekly Atlanta events in your inbox.</p>
        <form v-if="!subscribed" class="flex flex-col gap-2" @submit.prevent="subscribe">
          <input
            v-model="email"
            type="email"
            placeholder="your@email.com"
            class="input input-bordered input-sm w-full"
            required
          />
          <button type="submit" class="btn btn-primary btn-sm" :disabled="subscribing">
            {{ subscribing ? 'Subscribing…' : 'Subscribe' }}
          </button>
          <p v-if="error" class="text-error text-xs">{{ error }}</p>
        </form>
        <p v-else class="text-success text-sm">Thanks for subscribing!</p>
      </div>
    </div>

    <div class="divider w-full max-w-5xl my-2" />

    <p class="text-sm opacity-50">&copy; {{ new Date().getFullYear() }} FunInATL. All rights reserved.</p>
  </footer>
</template>
