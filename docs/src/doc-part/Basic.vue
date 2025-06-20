<script setup lang="ts">
import Button from "@/component/button.vue";
import CodeBlock from "@/component/code-block.vue";
import DocSection from "@/component/doc-section.vue";

const code = `// import styles
import "toast-kit/style.css";

// create a single instance of Toaster for the entire app
import { Toaster } from "toast-kit";
const toaster = new Toaster();

// import the toaster from anywhere in your app use it to show a toast notification
toaster.toast("Hello, world!")
`;
import { toaster } from "@/toaster";
</script>

<template>
    <DocSection>
        <template #heading>Basic Usage</template>
        <template #description>
            This is how you use the toast notification.
        </template>
        <Button @click="toaster.toast('Hello, world!')">Show Toast</Button>
        <CodeBlock :code="code" />
    </DocSection>
</template>
