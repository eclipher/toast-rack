<script setup lang="ts">
import Button from "@/component/button.vue";
import CodeBlock from "@/component/code-block.vue";
import DocSection from "@/component/doc-section.vue";
import { toast } from "toast-rack";

const code = `// create a single instance of ToastRack for the entire app
import { ToastRack } from "toast-rack";
const toaster = new ToastRack();

// import the toaster from anywhere in your app, and use it to show a toast
toaster.toast("Hello, world!")
`;
</script>

<template>
    <DocSection>
        <template #heading>Basic Usage</template>
        <template #description>
            This is how you use the toast notification.
        </template>
        <Button @click="toast('Hello, world!')">Show Toast</Button>
        <CodeBlock :code="code" />
    </DocSection>
</template>
