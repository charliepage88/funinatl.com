<template>
  <div v-if="tag">
    <DateRangePicker :start="dateStart" :end="dateEnd" @change="onDateChange" />

    <div class="flex justify-center pt-6 pb-2">
      <span class="inline-block bg-info text-white text-2xl font-semibold px-5 py-2 rounded">
        #{{ tag.name }}
      </span>
    </div>

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
  `tag-${slug.value}`,
  () => get<{ events: any[]; tag: any }>(`/events/tag/${slug.value}/${dateStart.value}/${dateEnd.value}`),
  { watch: [dateStart, dateEnd] }
)

const tag = computed(() => data.value?.tag)

useHead(() => ({
  title: tag.value ? `#${tag.value.name} Events | FunInATL` : 'Tag – FunInATL',
}))

function onDateChange({ start, end }: { start: string; end: string }) {
  dateStart.value = start
  dateEnd.value = end
}
</script>
