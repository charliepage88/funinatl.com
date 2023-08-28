<script setup>
import { Head, Link } from '@inertiajs/vue3';

defineProps({
    canLogin: Boolean,
    canRegister: Boolean,
});
</script>

<script>
import Layout from '@/Layouts/AppLayout.vue'

export default {
    // Using a render function...
    layout: (h, page) => h(Layout, [page]),

    // Using shorthand syntax...
    layout: Layout,
}
</script>

<template>
    <Head title="Home" />

    hello this is index
</template>
