<script setup>
import { ref } from 'vue'
import DefaultLayout from '@/Layouts/Default.vue';
import { Head, Link } from '@inertiajs/inertia-vue3';
import { EmojiHappyIcon } from '@heroicons/vue/solid'

import * as fakeEvents from '@/Data/fake-events.json';
import CategoryBadge from '@/Components/Elements/Badges/CategoryBadge.vue'
import LocationBadge from '@/Components/Elements/Badges/LocationBadge.vue';
import HomeHero from '@/Components/Layout/HomeHero.vue';

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
    laravelVersion: String,
    phpVersion: String,
});

const events = ref(fakeEvents.default)
</script>

<template>
    <DefaultLayout>
        <Head title="Homepage" />

        <HomeHero />

        <h3 class="uppercase pl-4 text-2xl font-bold leading-5 md:text-center">This Weekend</h3>

        <h4 class="uppercase pl-4 text-xl leading-5 pt-8">Saturday, April 24th</h4>

        <div class="relative flex flex-col md:flex-row items-top justify-center bg-gray-100 dark:bg-gray-900 sm:items-center pt-6 sm:pt-2">
            <!-- List Events -->
            <div v-for="event in events" :key="event.slug" class="p-4">
                <div class="flex justify-center">
                    <div class="w-full flex flex-col md:flex-row md:max-w-xl rounded-lg bg-white shadow-lg">
                        <div class="w-full md:w-80 h-64 md:h-72 relative">
                            <img class="w-full h-full object-cover rounded-t-lg md:rounded-none md:rounded-l-lg" :alt="event.title" :src="event.images[0].srp_thumb_url">
                            <span v-if="event.options.is_family_friendly" class="inline-block text-center bg-yellow-300 text-gray-500 hover:bg-yellow-200 text-xs absolute inset-x-0 top-0 py-1">
                                <EmojiHappyIcon class="w-4 h-4 inline" /> Family Friendly
                            </span>
                            <CategoryBadge :category="event.category" />
                        </div>
                        <div class="p-2 flex flex-col justify-start relative">
                            <h5 class="text-gray-900 text-xl font-medium mb-2">{{ event.title }}</h5>
                            <p class="text-gray-700 text-base pb-6">
                                This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.
                            </p>
                            <p class="block text-gray-400 text-center font-bold text-lg pb-12 md:pb-6">
                                {{ event.price }}
                            </p>
                            <p class="text-gray-600 text-sm md:text-xs absolute bottom-1">
                                Saturday, June 24th at 9 PM
                            </p>
                            <LocationBadge :category="event.category" :location="event.location" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </DefaultLayout>
</template>
