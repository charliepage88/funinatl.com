<script setup>
import { onMounted, ref } from 'vue';

defineProps([
    'modelValue',
    'classes',
    'options',
    'emptyLabel'
]);

defineEmits(['update:modelValue']);

const input = ref(null);

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});
</script>

<template>
    <select
        class="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm w-full"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        ref="input"
        :class="classes"
    >
        <option value="">{{ emptyLabel || '' }}</option>
        <option v-for="option in options" :key="option.slug || option.value" :value="option.value">
            {{ option.label }}
        </option>
    </select>
</template>
