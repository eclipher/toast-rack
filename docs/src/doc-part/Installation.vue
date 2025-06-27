<script setup lang="ts">
import CodeBlock from "@/component/code-block.vue";
import DocSection from "@/component/doc-section.vue";

const code = `pnpm install toast-rack`;
</script>

<template>
    <DocSection>
        <template #heading>Installation</template>
        <template #description class="text-sm text-gray-800/80">
            Why do you need any other package manager, when pnpm exists?
        </template>
        <CodeBlock :code="code" language="bash" />
    </DocSection>
</template>
