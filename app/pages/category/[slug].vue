<template>
  <div v-if="category">
    <DateRangePicker :start="dateStart" :end="dateEnd" @change="onDateChange" />

    <h1 class="text-5xl font-semibold text-center text-gray-800 pt-6 capitalize">
      {{ category.name }}
    </h1>

    <div class="container mx-auto px-4 lg:px-16 pt-2 pb-10">
      <div v-if="pending" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-info" />
      </div>
      <EventList v-else :groups="data?.events || []" />
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const slug = computed(() => route.params.slug as string)
const { get } = useApi()

const DEFAULT_START = '2021-01-01'
const DEFAULT_END = '2021-12-31'
// defaults set above
const fmt = (d: Date) => d.toISOString().split('T')[0]

const dateStart = ref(DEFAULT_START)
const dateEnd = ref(DEFAULT_END)

const { data, pending } = await useAsyncData(
  `category-${slug.value}`,
  () => get<{ events: any[]; category: any }>(`/events/category/${slug.value}/${dateStart.value}/${dateEnd.value}`),
  { watch: [dateStart, dateEnd] }
)

const category = computed(() => data.value?.category)

useHead(() => ({
  title: category.value ? `Atlanta Events – ${category.value.name} | FunInATL` : 'Category – FunInATL',
  meta: [{ name: 'description', content: category.value ? `Atlanta events for category ${category.value.name}.` : '' }],
}))

function onDateChange({ start, end }: { start: string; end: string }) {
  dateStart.value = start
  dateEnd.value = end
}
</script>
