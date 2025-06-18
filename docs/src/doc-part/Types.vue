<script setup lang="ts">
import { toaster } from "../toaster";
import Button from "../component/button.vue";
import ButtonGroup from "../component/button-group.vue";

const types: {
    label: string;
    action: () => void;
    buttonClass?: string;
}[] = [
    {
        label: "Default",
        action: () => {
            toaster.toast("This is a default toast.");
        },
    },
    {
        label: "Success",
        buttonClass: "btn-success",

        action: () => {
            toaster.success("Your profile has been updated successfully.");
        },
    },
    {
        label: "Error",
        buttonClass: "btn-error",

        action: () => {
            toaster.error("Failed to upload the file. Please try again.");
        },
    },
    {
        label: "Info",
        buttonClass: "btn-info",

        action: () => {
            toaster.info("You can customize the duration of this toast.", {
                title: "Did you know?",
            });
        },
    },
    {
        label: "Warning",
        buttonClass: "btn-warning",

        action: () => {
            toaster.warning("Your session will expire in 2 minutes.", {
                title: "Session Expiring",
            });
        },
    },
    {
        label: "Loading",
        action: () => {
            toaster.loading("This toast is loading indefinitely.", {
                title: "Loading...",
                dismissible: true,
            });
        },
    },
    {
        label: "Promise",
        action: () => {
            const promise = new Promise((resolve, reject) => {
                setTimeout(Math.random() < 0.5 ? resolve : reject, 1000);
            });

            toaster.promise(
                promise,
                {
                    loading: "Saving...",
                    success: "Saved successfully.",
                    error: "Failed to save.",
                },
                {
                    title: "Promise",
                },
            );
        },
    },
];
</script>

<template>
    <h3>Types</h3>
    <ButtonGroup>
        <Button
            v-for="type in types"
            :key="type.label"
            @click="type.action"
            :class="type.buttonClass"
        >
            {{ type.label }}
        </Button>
    </ButtonGroup>
</template>

<style>
.btn-success {
    background-color: #4caf50;
    color: white;
}
.btn-error {
    background-color: #f44336;
    color: white;
}
.btn-info {
    background-color: #2196f3;
    color: white;
}
.btn-warning {
    background-color: #ff9800;
    color: white;
}
</style>
