<script setup lang="ts">
import { Toaster } from "toast-kit";
import Button from "./component/button.vue";
const toaster = new Toaster();
</script>

<template>
    <div class="demo-buttons">
        <Button id="btn-default" @click="toaster.show()">Show Default</Button>
        <Button
            class="btn-success"
            @click="
                (toaster.positionContainer('bottom-center'),
                toaster.success({
                    message: 'Your profile has been updated successfully.',
                }))
            "
        >
            Show Success
        </Button>
        <Button
            class="btn-error"
            @click="
                toaster.error({
                    message: 'Failed to upload the file. Please try again.',
                })
            "
        >
            Show Error
        </Button>
        <Button
            class="btn-info"
            @click="
                toaster.info({
                    title: 'Did you know?',
                    message: 'You can customize the duration of this toast.',
                })
            "
        >
            Show Info
        </Button>
        <Button
            class="btn-warning"
            @click="
                toaster.warning({
                    title: 'Session Expiring',
                    message: 'Your session will expire in 2 minutes.',
                    duration: 7000,
                })
            "
        >
            Show Warning
        </Button>
    </div>
</template>

<style scoped>
:global(body) {
    font-family: "Inter", sans-serif;
    background-color: #f0f2f5;
    margin: 0;
    padding: 24px;
}

.demo-buttons {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    justify-content: center;
    padding: 20px;
    background: white;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

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
