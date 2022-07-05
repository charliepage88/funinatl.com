<script setup>
defineProps({
    category: Object,
});
</script>

<template>
    <!-- 'Other' -->
    <span v-if="category.slug === 'other'" class="inline-block text-center px-2.5 py-0.5 text-xs font-medium absolute inset-x-0 bottom-0 opacity-75 bg-green-100 text-green-800 hover:bg-green-500 hover:text-black">
        {{ category.name }}
    </span>

    <!-- Music -->
    <span v-if="category.slug === 'music'" class="inline-block text-center px-2.5 py-0.5 text-xs font-medium absolute inset-x-0 bottom-0 opacity-75 bg-blue-100 text-blue-800 hover:bg-blue-500 hover:text-black">
        {{ category.name }}
    </span>

    <!-- Comedy -->
    <span v-if="category.slug === 'comedy'" class="inline-block text-center px-2.5 py-0.5 text-xs font-medium absolute inset-x-0 bottom-0 opacity-75 bg-red-100 text-red-800 hover:bg-red-500 hover:text-black">
        {{ category.name }}
    </span>
</template>