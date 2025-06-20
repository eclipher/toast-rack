<script setup lang="ts">
import { toaster } from "../toaster";
import Button from "../component/button.vue";
import ButtonGroup from "../component/button-group.vue";
import { computed, ref } from "vue";
import DocSection from "@/component/doc-section.vue";
import CodeBlock from "@/component/code-block.vue";

const positions = [
    { value: "top-left", label: "Top Left" },
    { value: "top-center", label: "Top Center" },
    { value: "top-right", label: "Top Right" },
    { value: "bottom-left", label: "Bottom Left" },
    { value: "bottom-center", label: "Bottom Center" },
    { value: "bottom-right", label: "Bottom Right" },
] as const;

const toastId = ref("0");
const selectedPosition = ref("top-right");

const code = computed(() => {
    return `const toaster = new Toast({ position: '${selectedPosition.value}' });`;
});
</script>

<template>
    <DocSection>
        <template #heading>Positions</template>
        <template #description>
            Change the position by passing the <code>position</code> option to
            the <code>Toaster</code> instance.
        </template>

        <ButtonGroup>
            <Button
                v-for="position in positions"
                :key="position.value"
                @click="
                    {
                        selectedPosition = position.value;
                        toastId = toaster.toast(
                            `I\'m here now on the ${position.label} position!`,
                            { id: toastId },
                        );
                        toaster.changePosition(position.value);
                    }
                "
                :class="{ active: selectedPosition === position.value }"
            >
                {{ position.label }}
            </Button>
        </ButtonGroup>
        <CodeBlock :key="code" :code="code" />
    </DocSection>
</template>
