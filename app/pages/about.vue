<template>
  <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
    <h1 class="text-4xl font-bold text-gray-900 mb-6">About FunInATL</h1>
    <div class="prose prose-gray max-w-none text-gray-700 space-y-4 text-lg leading-relaxed">
      <p>
        FunInATL is Atlanta's go-to guide for discovering events happening around the city. We focus on
        the smaller, independent venues and lesser-known events that make Atlanta's cultural scene unique.
      </p>
      <p>
        Whether you're looking for live music, comedy shows, food festivals, or art exhibitions, we've got
        you covered. Our mission is to help Atlantans find fun things to do without the noise of the
        mainstream event platforms.
      </p>
      <p>
        Have an event you'd like to share? We'd love to feature it.
      </p>
    </div>
    <div class="mt-10">
      <NuxtLink
        to="/contact"
        class="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-xl transition-colors"
      >
        Get in Touch
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({ title: 'About – FunInATL' })
</script>
