<script setup>
import { ChatAltIcon, TagIcon, UserCircleIcon } from '@heroicons/vue/solid'
import FormSelect from '@/Components/Form/Select.vue'
import FormInput  from '@/Components/Form/Input.vue'
import Button     from '@/Components/Form/Button.vue' 

const activity = [
  {
    id: 1,
    category: {
        "name": "Music",
        "slug": "music"
    },
    location: {
        "name": "Bad Earl",
        "slug": "bad-earl",
        "image_url": "https://funinatl.nyc3.cdn.digitaloceanspaces.com/5982/conversions/2678-jazz-jam-w-the-gordon-vernick-quartet-april-28-2021-music-red-light-cafejpg-thumb_desktop.jpg"
    },
    date: '6d ago',
  },
  {
    id: 2,
    category: {
        "name": "Music",
        "slug": "music"
    },
    location: {
        "name": "Bad Earl",
        "slug": "bad-earl",
        "image_url": "https://funinatl.nyc3.cdn.digitaloceanspaces.com/5982/conversions/2678-jazz-jam-w-the-gordon-vernick-quartet-april-28-2021-music-red-light-cafejpg-thumb_desktop.jpg"
    },
    date: '2d ago',
  },
  {
    id: 3,
    category: {
        "name": "Music",
        "slug": "music"
    },
    location: {
        "name": "Bad Earl",
        "slug": "bad-earl",
        "image_url": "https://funinatl.nyc3.cdn.digitaloceanspaces.com/5982/conversions/2678-jazz-jam-w-the-gordon-vernick-quartet-april-28-2021-music-red-light-cafejpg-thumb_desktop.jpg"
    },
    tags: [
      { name: '21+', href: '#', color: 'bg-rose-500' },
      { name: 'Mask Required', href: '#', color: 'bg-indigo-500' },
    ],
    date: '6h ago',
  },
  {
    id: 4,
    category: {
        "name": "Music",
        "slug": "music"
    },
    location: {
        "name": "Bad Earl",
        "slug": "bad-earl",
        "image_url": "https://funinatl.nyc3.cdn.digitaloceanspaces.com/5982/conversions/2678-jazz-jam-w-the-gordon-vernick-quartet-april-28-2021-music-red-light-cafejpg-thumb_desktop.jpg"
    },
    date: '2h ago',
  },
]

const categories = [
    {
        slug: 'arts-and-theatre',
        label: 'Arts & Theatre'
    },
    {
        slug: 'comedy',
        label: 'Comedy'
    },
    {
        slug: 'food-drinks',
        label: 'Food & Drinks'
    },
    {
        slug: 'music',
        label: 'Music'
    },
    {
        slug: 'other',
        label: 'Other'
    }
]

const locations = [
    {
        slug: '529',
        label: '529'
    },
    {
        slug: 'aisle-5',
        label: 'Aisle 5'
    }
]

const searchForm = {
    category: null,
    location: null,
    q: null
}
</script>

<template>
    <section class="mb-40">
    <div class="px-6 py-12 md:px-12 bg-gray-100 text-gray-800 text-center lg:text-left rounded-lg">
      <div class="container mx-auto xl:px-32">
        <div class="grid lg:grid-cols-2 gap-12 items-center">
          <div class="mt-12 lg:mt-0">
            <h1 class="text-4xl md:text-5xl xl:text-6xl font-bold tracking-tight mb-12">Fun In Atlanta<br /><span class="text-blue-600">Find things to do!</span></h1>
            
            <div class="flow-root">
                <ul role="list" class="-mb-8">
                <li v-for="(activityItem, activityItemIdx) in activity" :key="activityItem.id">
                    <div class="relative pb-8">
                    <span v-if="activityItemIdx !== activity.length - 1" class="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true" />
                    <div class="relative flex items-start space-x-3">
                        <div>
                            <div class="relative px-1">
                                <img class="h-10 w-10 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white" :src="activityItem.location.image_url" alt="" />
                            </div>
                        </div>
                        <div class="min-w-0 flex-1 py-0">
                            <div class="text-sm leading-8 text-gray-500">
                            <span class="mr-0.5">
                                <a href="/" class="font-medium text-gray-900">{{ activityItem.location.name }}</a>
                                {{ ' ' }}
                                <a href="/">added new event</a>
                            </span>
                            {{ ' ' }}
                            <span class="mr-0.5">
                                <template v-for="tag in activityItem.tags" :key="tag.name">
                                <a :href="tag.href" class="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm">
                                    <span class="absolute flex-shrink-0 flex items-center justify-center">
                                    <span :class="[tag.color, 'h-1.5 w-1.5 rounded-full']" aria-hidden="true" />
                                    </span>
                                    <span class="ml-3.5 font-medium text-gray-900">{{ tag.name }}</span>
                                </a>
                                {{ ' ' }}
                                </template>
                            </span>
                            <span class="whitespace-nowrap">{{ activityItem.date }}</span>
                            </div>
                        </div>
                    </div>
                    </div>
                </li>
                </ul>
            </div>
          </div>
          <div class="mb-12 lg:mb-0">
            <div class="block rounded-lg shadow-lg bg-white px-6 py-12 md:px-12">
              <form>
                <div class="grid md:grid-cols-2 md:gap-6">
                  <div class="mb-6">
                    <FormSelect v-model="searchForm.category" :options="categories" emptyLabel="Category" />
                  </div>
                  <div class="mb-6">
                    <FormSelect v-model="searchForm.location" :options="locations" emptyLabel="Location" />
                  </div>
                </div>

                <FormInput v-model="searchForm.q" placeholder="Search for Event..." />

                <Button classes="w-full justify-center mt-4 text-xl bg-blue-500 hover:bg-blue-800" type="button">Search</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>