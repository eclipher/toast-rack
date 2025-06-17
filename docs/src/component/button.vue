<script setup lang="ts">
import type { ButtonHTMLAttributes } from "vue";

const { type = "button" } = defineProps<{
    type?: ButtonHTMLAttributes["type"];
}>();
</script>

<template>
    <button :type><slot /></button>
</template>

<style scoped>
button {
    font-family: "Inter", sans-serif;
    padding: 10px 20px;
    border-radius: 6px;
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: 500;
    transition:
        transform 0.2s,
        box-shadow 0.2s;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    }
}
</style>
