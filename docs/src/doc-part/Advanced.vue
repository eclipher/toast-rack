<script setup lang="ts">
import { toaster } from "../toaster";
import Button from "../component/button.vue";
import ButtonGroup from "../component/button-group.vue";
import DocSection from "@/component/doc-section.vue";
import CodeBlock from "@/component/code-block.vue";
import { ref } from "vue";

const advancedUsages: {
    label: string;
    action: () => void;
    snippet: string;
}[] = [
    {
        label: "Promise",
        action: () => {
            const promise = new Promise((resolve, reject) => {
                setTimeout(Math.random() < 0.5 ? resolve : reject, 1000);
            });

            toaster.promise(promise, {
                loading: "Saving...",
                success: "Saved successfully.",
                error: "Failed to save.",
            });
        },
        snippet: `const promise = new Promise((resolve, reject) => {
    setTimeout(Math.random() < 0.5 ? resolve : reject, 1000);
});
toaster.promise(promise, {
    loading: "Saving...",
    success: "Saved successfully.",
    error: "Failed to save.",
});
`,
    },
    {
        label: "Single Toast Customization",
        action: () => {
            toaster.toast("Customize to your heart's content", {
                title: "Fancy Toast",
                unstyled: true, // Disable default styles
                style: `background: linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113));`, // inline styles
                classes: {
                    // tailwind classes
                    toast: "rounded-none flex text-white items-center gap-2 px-6 py-4 text-white",
                    title: "font-bold text-2xl uppercase font-serif",
                    message: "font-serif",
                    close: "text-white/50 hover:text-white ",
                },
            });
        },
        snippet: `toaster.toast("Customize to your heart's content", {
    title: "Fancy Toast",
    unstyled: true, // Disable default styles
    style: \`background: linear-gradient(to right, rgb(255, 95, 109), rgb(255, 195, 113));\`, // inline styles
    classes: {
        // tailwind classes (or your own CSS classes)
        toast: "rounded-none flex text-white items-center gap-2 px-6 py-4 text-white",
        title: "font-bold text-2xl uppercase font-serif",
        message: "font-serif",
        close: "text-white/50 hover:text-white ",
    },
});`,
    },
    {
        label: "Global Customization",
        action: () => {
            toaster.toast(
                "All toasts in this app will be super long and user cannot dismiss them",
                {
                    title: "Awesome App",
                    durationMs: 10000,
                    dismissible: false,
                },
            );
        },
        snippet: `const toaster = new Toaster("All toasts in this app will be super long and user cannot dismiss them", {
    title: "Awesome App",
    durationMs: 10000,
    dismissible: false,
});
`,
    },
    {
        label: "Update a Toast",
        action: () => {
            const id = toaster.info(
                "You can update a toast after it has been shown by passing the same ID.",
            );
            setTimeout(
                () => toaster.success("This toast has been updated", { id }),
                2500,
            );
        },
        snippet: `const id = toaster.info(
    "You can update a toast after it has been shown by passing the same ID.",
);
setTimeout(
    () => toaster.success("This toast has been updated", { id }),
    2500,
);
`,
    },
];

const selectedUsage = ref(advancedUsages[0]);
</script>

<template>
    <DocSection>
        <template #heading>Advanced</template>
        <ButtonGroup>
            <Button
                v-for="usage in advancedUsages"
                :key="usage.label"
                @click="
                    usage.action();
                    selectedUsage = usage;
                "
                :active="selectedUsage.label === usage.label"
            >
                {{ usage.label }}
            </Button>
        </ButtonGroup>
        <CodeBlock :key="selectedUsage.label" :code="selectedUsage.snippet" />
    </DocSection>
</template>
