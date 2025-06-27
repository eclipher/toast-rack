<script setup lang="ts">
import { cn } from "@/utils";

const {
    href,
    active,
    class: className,
} = defineProps<{
    href?: string;
    active?: boolean;
    class?: string;
}>();
</script>

<template>
    <component
        :is="href ? 'a' : 'button'"
        :href="href"
        :type="href ? null : 'button'"
        :target="href ? '_blank' : null"
        :class="
            cn(
                'inline-flex items-center justify-center gap-2 px-4 py-2 hover:-translate-y-1 transition-transform shadow-sm rounded dark:bg-gray-700 bg-gray-100',
                className,
                active ? 'active' : '',
            )
        "
    >
        <slot />
    </component>
</template>

<style scoped>
.active {
    border: 2px solid var(--color-primary);
}
</style>
