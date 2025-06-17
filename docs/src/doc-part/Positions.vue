<script setup lang="ts">
import { toaster } from "../toaster";
import Button from "../component/button.vue";
import ButtonGroup from "../component/button-group.vue";
import { ref } from "vue";

const positions = [
    { value: "top-left", label: "Top Left" },
    { value: "top-center", label: "Top Center" },
    { value: "top-right", label: "Top Right" },
    { value: "bottom-left", label: "Bottom Left" },
    { value: "bottom-center", label: "Bottom Center" },
    { value: "bottom-right", label: "Bottom Right" },
] as const;

let toastId = ref("0");
</script>

<template>
    <h3>Position</h3>
    <ButtonGroup>
        <Button
            v-for="position in positions"
            :key="position.value"
            @click="
                {
                    toastId = toaster.toast(
                        `I\'m here now on the ${position.label} position!`,
                        { id: toastId, durationMs: 5000 },
                    );
                    toaster.changePosition(position.value);
                }
            "
        >
            {{ position.label }}
        </Button>
    </ButtonGroup>
</template>
