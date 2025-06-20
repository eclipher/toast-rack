pnp
<script setup lang="ts">
import {
    Blend,
    Blocks,
    Feather,
    Move,
    Hammer,
    Workflow,
} from "lucide-vue-next";

const features: { label: string; description: string; icon: typeof Feather }[] =
    [
        {
            label: "Lightweight",
            description: "A minimal library with no dependencies.",
            icon: Feather,
        },
        {
            label: "Framework-agnostic",
            description:
                "Built with vanilla JavaScript, it works with any framework or lack thereof.",
            icon: Blocks,
        },

        {
            label: "Promise API",
            description: "Easily display status for your async operations.",
            icon: Workflow,
        },
        {
            label: "Poor Compatibility",
            description:
                "It uses <a href='https://caniuse.com/mdn-api_htmlelement_showpopover' target='_blank' class='inline-anchor'>Popover API</a>, meaning it won't work on browsers older than 2024.",
            icon: Blend,
        },
        {
            label: "Janky Animations",
            description: "The toasts look good... when they are not moving. ",
            icon: Move,
        },
        {
            label: "It just works",
            description:
                "I made this for myself and it works. What more do you want?",
            icon: Hammer,
        },
    ];
</script>

<template>
    <div class="my-16 grid gap-x-8 gap-y-5 grid-cols-2 md:grid-cols-3">
        <div
            v-for="feature in features"
            :key="feature.label"
            class="flex flex-col p-4 gap-1 items-center text-center"
        >
            <component :is="feature.icon" class="text-primary size-8" />
            <h3 class="text-xl font-semibold">{{ feature.label }}</h3>
            <p v-html="feature.description"></p>
        </div>
    </div>
</template>

<style>
.inline-anchor {
    color: var(--primary-color);
}
</style>
