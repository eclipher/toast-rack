<script setup lang="ts">
defineProps<{
    href?: string;
    active?: boolean;
}>();
</script>

<template>
    <component
        :is="href ? 'a' : 'button'"
        :href="href"
        :type="href ? null : 'button'"
        class="inline-flex items-center justify-center gap-2 px-4 py-2 hover:-translate-y-1 transition-transform shadow-sm rounded bg-gray-100"
        :class="{ active: active }"
    >
        <slot />
    </component>
</template>

<style scoped>
.active {
    border: 2px solid var(--color-primary);
}
</style>
