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

    <h3 class="text-2xl font-semibold leading-6 pt-4 pb-8">Tuesday, August 29th</h3>

    <div class="flex gap-4">
        <!-- Event 1 -->
        <div class="card card-link w-96 bg-base-100 shadow-xl glass relative">
            <figure class="bg-cyan-900">
                <img src="https://funinatl.nyc3.cdn.digitaloceanspaces.com/5946/conversions/2642-virtual-olmsted-and-americas-urban-parks-watch-party-and-panel-discussion-event-april-24-2021-other-piedmont-parkpng-thumb_desktop.jpg" class="h-48" />
            </figure>
            <div class="card-body p-4 pt-2">
                <div class="">
                    <time
                        datetime="2023-08-29"
                        class="flex justify-start gap-2 text-sm font-bold uppercase text-cyan-400"
                    >
                        <!-- <span class="w-px flex-1 bg-gray-900/10"></span> -->
                        <span>Aug 29</span>
                        <span>8:00 AM</span>
                    </time>
                </div>

                <!-- Event Name -->
                <h2 class="card-title">
                    Olmsted And America's Urban Parks Watch Party And Panel Discussion Event
                    <div class="badge badge-primary">OUTSIDE</div>
                </h2>

                <!-- Description -->
                <div class="card-actions">
                    <p>
                        On Saturday, August 29th, starting at 8:00 AM. Go check out this event at Piedmont Park! 
                    </p>

                    <div class="flex gap-1 -ml-1">
                        <button class="btn btn-primary">
                            Location
                        </button>
                        <button class="btn btn-info btn-wide">
                            Details
                        </button>
                    </div>
                </div>
            </div>
        </div>

        <!-- Event 2 -->
        <div class="card card-compact w-96 bg-base-100 shadow-xl glass relative">
            <figure class="bg-cyan-900">
                <img src="https://badearl.com/wp-content/uploads/2023/05/Cardiel_Live-copy-min.jpg" class="h-48" />
            </figure>
            <div class="card-body p-4 pt-2">
                <div class="">
                    <time
                        datetime="2023-08-29"
                        class="flex justify-start gap-2 text-sm font-bold uppercase text-cyan-400"
                    >
                        <span>Aug 29</span>
                        <span>7:30 PM - 11:00 PM</span>
                    </time>
                </div>

                <!-- Event Name -->
                <h2 class="card-title mb-4">
                    Cardiel at The Earl
                    <div class="badge badge-success">MUSIC</div>
                </h2>

                <!-- Bands? -->
                <div class="card-actions">
                    <div class="badge badge-warning">Ladrones</div> 
                    <div class="badge badge-warning">Tongues of Fire</div>

                    <div class="flex gap-1 -ml-1">
                        <button class="btn btn-primary">
                            Location
                        </button>
                        <button class="btn btn-info btn-wide">
                            Details
                        </button>
                    </div>
                </div>

                <!-- Footer? -->
                <div class="card-footer">
                    yo yo yo
                </div>
            </div>
        </div>

        <!-- Event 3 -->
        <div class="card w-96 bg-base-100 shadow-xl glass relative">
            <figure class="bg-cyan-900">
                <img src="https://www.freshtix.com/rails/active_storage/representations/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaEpJaWt4WXpobU1Ua3lNQzB3TTJRNUxUUmtNRGd0T0RJMU15MWtNak01WkRnNU1qZG1ORGNHT2daRlZBPT0iLCJleHAiOm51bGwsInB1ciI6ImJsb2JfaWQifX0=--15393dfb008ef88084b5f823776e9500fef3fee8/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaDdCem9MWm05eWJXRjBTU0lJYW5CbkJqb0dSVlE2QzNKbGMybDZaVWtpRERJd01IZ3pNREFHT3daVSIsImV4cCI6bnVsbCwicHVyIjoidmFyaWF0aW9uIn19--9e748f6d6c6ba4aec666943509fb6e52cdf790e7/Open_Mic_200x300.jpg" class="h-48" />
            </figure>
            <div class="card-body p-4 pt-2">
                <div class="">
                    <time
                        datetime="2023-08-29"
                        class="flex justify-start gap-2 text-sm font-bold uppercase text-cyan-400"
                    >
                        <span>Aug 29</span>
                        <span>8:00 PM</span>
                    </time>
                </div>

                <!-- Event Name -->
                <h2 class="card-title">
                    Open Mic Night at Laughing Skull Lounge
                    <div class="badge badge-secondary">COMEDY</div>
                </h2>

                <!-- Description -->
                <div class="card-actions mt-2">
                    <p>
                        20ish Comics doing 4 Minutes of 'Funny HaHa' or 'Funny WTF?' - Tickets $15
                    </p>

                    <div class="flex gap-1 -ml-1">
                        <button class="btn btn-primary">
                            Location
                        </button>
                        <button class="btn btn-info btn-wide">
                            Details
                        </button>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
