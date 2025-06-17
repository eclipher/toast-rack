<script setup lang="ts">
import { toaster } from "./toaster";
import Button from "./component/button.vue";
import ButtonGroup from "./component/button-group.vue";
import Types from "./doc-part/Types.vue";
import Positions from "./doc-part/Positions.vue";
</script>

<template>
    <Types />
    <Positions />
</template>

<style>
body {
    font-family: "Inter", sans-serif;
    background-color: #f0f2f5;
    margin: 0;
    padding: 24px;
}
</style>
