<script setup lang="ts">
import { toaster } from "../toaster";
import Button from "../component/button.vue";
import ButtonGroup from "../component/button-group.vue";
import DocSection from "@/component/doc-section.vue";
import {
    CircleCheck,
    CircleX,
    Info,
    CircleAlert,
    LoaderCircle,
} from "lucide-vue-next";
import { ref } from "vue";
import CodeBlock from "@/component/code-block.vue";

const types: {
    label: string;
    action: () => void;
    icon?: typeof CircleCheck;
    snippet: string;
}[] = [
    {
        label: "Success",
        icon: CircleCheck,
        action: () => {
            toaster.success("Your profile has been updated successfully.");
        },
        snippet: `toaster.success("Your profile has been updated successfully.");`,
    },
    {
        label: "Error",
        icon: CircleX,
        action: () => {
            toaster.error("Failed to upload the file. Please try again.");
        },
        snippet: `toaster.error("Failed to upload the file. Please try again.");`,
    },
    {
        label: "Info",
        icon: Info,
        action: () => {
            toaster.info("You can customize the duration of this toast.", {
                title: "Did you know?",
                durationMs: 3000,
            });
        },
        snippet: `toaster.info("You can customize the duration of this toast.", {
    title: "Did you know?",
    durationMs: 3000,
});`,
    },
    {
        label: "Warning",
        icon: CircleAlert,
        action: () => {
            toaster.warning("Your session will expire in 2 minutes.", {
                title: "Session Expiring",
            });
        },
        snippet: `toaster.warning("Your session will expire in 2 minutes.", {
    title: "Session Expiring",
});`,
    },
    {
        label: "Loading",
        icon: LoaderCircle,
        action: () => {
            toaster.loading("This toast is loading indefinitely.", {
                dismissible: true,
            });
        },
        snippet: `toaster.loading("This toast is loading indefinitely.", {
    dismissible: true,
});`,
    },
];

const selectedType = ref(types[0]);
</script>

<template>
    <DocSection>
        <template #heading>Types</template>
        <template #description>
            These are some predefined types of toasts with their own styles and
            icons.
        </template>
        <ButtonGroup>
            <Button
                v-for="type in types"
                :key="type.label"
                @click="
                    () => {
                        type.action();
                        selectedType = type;
                    }
                "
                :active="selectedType.label === type.label"
            >
                <component :is="type.icon" class="size-4" />
                {{ type.label }}
            </Button>
        </ButtonGroup>
        <CodeBlock :code="selectedType.snippet" :key="selectedType.label" />
    </DocSection>
</template>
