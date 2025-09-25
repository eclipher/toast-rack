<script setup lang="ts">
import { toast } from "toast-rack";
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
            toast.success("Your profile has been updated successfully.");
        },
        snippet: `toast.success("Your profile has been updated successfully.");`,
    },
    {
        label: "Error",
        icon: CircleX,
        action: () => {
            toast.error("Failed to upload the file. Please try again.");
        },
        snippet: `toast.error("Failed to upload the file. Please try again.");`,
    },
    {
        label: "Info",
        icon: Info,
        action: () => {
            toast.info("You can customize the duration of this toast.", {
                title: "Did you know?",
            });
        },
        snippet: `toast.info("You can customize the duration of this toast.", {
    title: "Did you know?"
});`,
    },
    {
        label: "Warning",
        icon: CircleAlert,
        action: () => {
            toast.warning("Your session will expire in 2 minutes.", {
                title: "Session Expiring",
            });
        },
        snippet: `toast.warning("Your session will expire in 2 minutes.", {
    title: "Session Expiring",
});`,
    },
    {
        label: "Loading",
        icon: LoaderCircle,
        action: () => {
            toast.loading("Submitting your data...");
        },
        snippet: `toast.loading("Submitting your data...");`,
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
