<script setup>
defineProps({
    category: Object,
    location: Object,
});
</script>

<template>
    <!-- 'Other' -->
    <span v-if="category.slug === 'other'" class="inline-block text-center px-2.5 py-0.5 rounded-full text-xs font-medium absolute bottom-1 right-1 bg-green-100 text-green-800 hover:bg-green-500 hover:text-black">
        {{ location.name }}
    </span>

    <!-- Music -->
    <span v-if="category.slug === 'music'" class="inline-block text-center px-2.5 py-0.5 rounded-full text-xs font-medium absolute bottom-1 right-1 bg-blue-100 text-blue-800 hover:bg-blue-500 hover:text-black">
        {{ location.name }}
    </span>

    <!-- Comedy -->
    <span v-if="category.slug === 'comedy'" class="inline-block text-center px-2.5 py-0.5 rounded-full text-xs font-medium absolute bottom-1 right-1 bg-red-100 text-red-800 hover:bg-red-500 hover:text-black">
        {{ location.name }}
    </span>
</template>