<script setup lang="ts">
import Features from "./doc-part/Features.vue";
import Hero from "./doc-part/Hero.vue";

import Types from "./doc-part/Types.vue";
import Positions from "./doc-part/Positions.vue";

import "@fontsource-variable/inter";
import Installation from "./doc-part/Installation.vue";
import Usage from "./doc-part/Basic.vue";
import Advanced from "./doc-part/Advanced.vue";
import Footer from "./doc-part/Footer.vue";
</script>

<template>
    <Hero />
    <main class="t-container">
        <Features />
        <Installation />
        <Usage />
        <Types />
        <Positions />
        <Advanced />
    </main>
    <Footer />
</template>

<style>
body {
    font-family:
        "Inter Variable",
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Roboto,
        Oxygen,
        Ubuntu,
        Cantarell,
        "Open Sans",
        "Helvetica Neue",
        sans-serif;
    color: var(--text-color);
    line-height: 1.6;
    background-color: var(--background);
}
</style>
