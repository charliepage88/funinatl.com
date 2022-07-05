<script setup>
import { onMounted, ref } from 'vue';

defineProps([
    'modelValue',
    'classes',
    'type',
    'placeholder'
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
    <input
        :type="type || 'text'"
        class="border-gray-300 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 rounded-md shadow-sm w-full"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        ref="input"
        :class="classes"
        :placeholder="placeholder || ''"
    />
</template>
