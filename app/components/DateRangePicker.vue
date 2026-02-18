<script setup lang="ts">
const props = defineProps<{
  start: string
  end: string
}>()

const emit = defineEmits<{
  (e: 'update:start', val: string): void
  (e: 'update:end', val: string): void
  (e: 'change', start: string, end: string): void
}>()

const localStart = ref(props.start)
const localEnd = ref(props.end)

watch(() => props.start, v => localStart.value = v)
watch(() => props.end, v => localEnd.value = v)

function apply() {
  emit('update:start', localStart.value)
  emit('update:end', localEnd.value)
  emit('change', localStart.value, localEnd.value)
}

function shiftWeek(dir: 1 | -1) {
  const s = new Date(props.start)
  const e = new Date(props.end)
  s.setDate(s.getDate() + dir * 7)
  e.setDate(e.getDate() + dir * 7)
  const fmt = (d: Date) => d.toISOString().slice(0, 10)
  emit('update:start', fmt(s))
  emit('update:end', fmt(e))
  emit('change', fmt(s), fmt(e))
}
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <button class="btn btn-ghost btn-sm btn-circle" title="Previous week" @click="shiftWeek(-1)">‹</button>
    <div class="flex items-center gap-2">
      <input
        v-model="localStart"
        type="date"
        class="input input-bordered input-sm w-36"
        @change="apply"
      />
      <span class="opacity-50 text-sm">to</span>
      <input
        v-model="localEnd"
        type="date"
        class="input input-bordered input-sm w-36"
        @change="apply"
      />
    </div>
    <button class="btn btn-ghost btn-sm btn-circle" title="Next week" @click="shiftWeek(1)">›</button>
  </div>
</template>
