<script setup lang="ts">
import { watchEffect } from "vue";
import { useClipboard } from "@vueuse/core";
import { Copy } from "lucide-vue-next";
import { highlighter } from "./code-block-highlighter";

import { toaster } from "@/toaster";

const { code, language = "typescript" } = defineProps<{
    code: string;
    language?: "typescript" | "bash";
}>();

const highlightedCode = highlighter.codeToHtml(code, {
    lang: language,
    theme: "nord",
});

const { copy, copied } = useClipboard({ source: code });

watchEffect(() => {
    if (copied.value) {
        toaster.success("Code copied to clipboard!");
    }
});
</script>

<template>
    <div class="my-4">
        <div
            class="*:rounded-lg *:p-4 *:text-wrap *:max-h-[650px] *:overflow-auto"
            v-html="highlightedCode"
        ></div>

        <button
            type="button"
            @click="copy(code)"
            class="text-sm mt-2 text-primary font-medium flex items-center gap-1"
        >
            <Copy class="size-4" />
            <span>Copy</span>
        </button>
    </div>
</template>
