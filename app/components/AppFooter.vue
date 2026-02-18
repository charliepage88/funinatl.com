<template>
  <footer class="bg-whitesmoke pt-10 pb-6">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">

        <!-- Categories -->
        <div>
          <h3 class="font-semibold text-base text-gray-800 mb-3">Categories</h3>
          <div v-for="cat in categories" :key="cat.to" class="mb-2">
            <NuxtLink :to="cat.to" class="text-primary hover:underline text-sm">{{ cat.label }}</NuxtLink>
          </div>
        </div>

        <!-- Menu -->
        <div>
          <h3 class="font-semibold text-base text-gray-800 mb-3">Menu</h3>
          <div v-for="item in menuLinks" :key="item.to" class="mb-2">
            <NuxtLink :to="item.to" class="text-primary hover:underline text-sm">{{ item.label }}</NuxtLink>
          </div>
        </div>

        <!-- CTA Buttons -->
        <div class="col-span-2 sm:col-span-1 flex flex-col gap-2">
          <NuxtLink
            to="/get-listed"
            class="flex items-center justify-center gap-2 bg-info hover:bg-info-dark text-white font-semibold py-3 px-4 rounded transition-colors text-sm no-underline"
          >
            <i class="fas fa-map fa-lg" />
            Get Listed
          </NuxtLink>
          <NuxtLink
            to="/contact"
            class="flex items-center justify-center gap-2 bg-indigo hover:opacity-90 text-white font-semibold py-3 px-4 rounded transition-colors text-sm no-underline"
          >
            <i class="fas fa-envelope fa-lg" />
            Contact Us
          </NuxtLink>
        </div>

        <!-- Newsletter -->
        <div class="col-span-2 lg:col-span-2">
          <h3 class="font-semibold text-base text-gray-800 mb-3">Newsletter</h3>
          <p class="text-sm text-gray-600 mb-3">Keep updated on events going on in Atlanta.</p>
          <form @submit.prevent="subscribe">
            <div class="mb-2">
              <input
                v-model="email"
                type="email"
                placeholder="Your email address"
                required
                aria-label="Your email address"
                class="w-full px-3 py-2 text-gray-900 text-sm rounded border border-gray-300 focus:outline-none focus:border-info"
              />
            </div>
            <button
              type="submit"
              :disabled="subscribing"
              class="bg-primary hover:opacity-90 disabled:opacity-60 text-white text-sm font-medium px-4 py-2 rounded transition-opacity"
            >
              {{ subscribing ? 'Subscribing…' : 'Subscribe' }}
            </button>
            <p v-if="msg" class="mt-2 text-xs" :class="err ? 'text-danger' : 'text-success'">{{ msg }}</p>
          </form>
        </div>

        <!-- Copyright -->
        <div class="col-span-2 lg:col-span-1 flex items-end">
          <p class="text-sm text-gray-500 mt-6 lg:mt-0 text-center lg:text-right w-full">
            Copyright &copy;2016–{{ new Date().getFullYear() }}<br />
            <a href="https://www.charlespage.me" target="_blank" rel="noopener" class="text-primary hover:underline">
              Charles Page
            </a>
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
const { post } = useApi()
const email = ref('')
const subscribing = ref(false)
const msg = ref('')
const err = ref(false)

const categories = [
  { to: '/category/music', label: 'Music' },
  { to: '/category/food-drinks', label: 'Food & Drinks' },
  { to: '/category/comedy', label: 'Comedy' },
  { to: '/category/arts-theatre', label: 'Arts & Theatre' },
  { to: '/category/other', label: 'Other' },
]

const menuLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
  { to: '/submit-event', label: 'Submit Event' },
  { to: '/subscribe', label: 'Subscribe' },
]

async function subscribe() {
  subscribing.value = true
  msg.value = ''
  err.value = false
  try {
    await post('/newsletter/subscribe', { email: email.value })
    msg.value = 'Subscribed!'
    email.value = ''
  } catch {
    err.value = true
    msg.value = 'Something went wrong. Please try again.'
  } finally {
    subscribing.value = false
  }
}
</script>
