<script setup lang="ts">
import Button from "@/component/button.vue";
import CodeBlock from "@/component/code-block.vue";
import DocSection from "@/component/doc-section.vue";

const code = `// create a single instance of ToastRack for the entire app
import { ToastRack } from "toast-rack";
const toaster = new ToastRack();

// import the toaster from anywhere in your app, and use it to show a toast
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
