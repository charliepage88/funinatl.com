<script setup lang="ts">
const props = defineProps<{
  modelValue: string
  category?: string
  location?: string
  familyFriendly?: boolean
  categories?: { slug: string; name: string }[]
  locations?: { slug: string; name: string }[]
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', v: string): void
  (e: 'update:category', v: string): void
  (e: 'update:location', v: string): void
  (e: 'update:familyFriendly', v: boolean): void
  (e: 'search'): void
}>()

const localQ = ref(props.modelValue)
const localCat = ref(props.category ?? '')
const localLoc = ref(props.location ?? '')
const localFamily = ref(props.familyFriendly ?? false)

function submit() {
  emit('update:modelValue', localQ.value)
  emit('update:category', localCat.value)
  emit('update:location', localLoc.value)
  emit('update:familyFriendly', localFamily.value)
  emit('search')
}
</script>

<template>
  <form class="flex flex-col gap-3" @submit.prevent="submit">
    <div class="flex gap-2">
      <input
        v-model="localQ"
        type="search"
        placeholder="Search events…"
        class="input input-bordered flex-1"
      />
      <button type="submit" class="btn btn-primary">Search</button>
    </div>
    <div class="flex flex-wrap gap-2">
      <select v-model="localCat" class="select select-bordered select-sm w-40">
        <option value="">All Categories</option>
        <option v-for="cat in categories" :key="cat.slug" :value="cat.slug">{{ cat.name }}</option>
      </select>
      <select v-model="localLoc" class="select select-bordered select-sm w-44">
        <option value="">All Locations</option>
        <option v-for="loc in locations" :key="loc.slug" :value="loc.slug">{{ loc.name }}</option>
      </select>
      <label class="flex items-center gap-2 cursor-pointer">
        <input v-model="localFamily" type="checkbox" class="checkbox checkbox-sm checkbox-primary" />
        <span class="text-sm">Family Friendly</span>
      </label>
    </div>
  </form>
</template>
