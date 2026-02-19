<template>
  <div class="py-3 px-4 bg-green-500 border-b border-gray-200 flex items-center justify-center gap-4 flex-wrap">
    <ClientOnly>
      <div class="flex items-center gap-2">
        <label class="text-sm text-white w-24">Start Date</label>
        <VueDatePicker
          v-model="startDate"
          :enable-time-picker="false"
          :min-date="minDate"
          :max-date="endDate || maxDate"
          format="yyyy-MM-dd"
          placeholder="Start date"
          auto-apply
          @update:model-value="onUpdate"
        />
      </div>
      <div class="flex items-center gap-2">
        <label class="text-sm text-white w-24">End Date</label>
        <VueDatePicker
          v-model="endDate"
          :enable-time-picker="false"
          :min-date="startDate || minDate"
          :max-date="maxDate"
          format="yyyy-MM-dd"
          placeholder="End date"
          auto-apply
          @update:model-value="onUpdate"
        />
      </div>
      <template #fallback>
        <span class="text-sm text-white">Loading…</span>
      </template>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  start?: string
  end?: string
}>(), {})

const emit = defineEmits<{
  change: [{ start: string; end: string }]
}>()

function strToDate(s: string) {
  return new Date(s + 'T00:00:00')
}

function fmt(d: Date | null): string {
  if (!d) return ''
  return d.toISOString().split('T')[0]
}

// Wide bounds so historical data works
const minDate = new Date('2021-01-01')
const maxDate = new Date('2026-12-31')

const startDate = ref<Date | null>(props.start ? strToDate(props.start) : null)
const endDate = ref<Date | null>(props.end ? strToDate(props.end) : null)

function onUpdate() {
  if (startDate.value && endDate.value) {
    emit('change', { start: fmt(startDate.value), end: fmt(endDate.value) })
  }
}
</script>
