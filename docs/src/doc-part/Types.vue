<script setup lang="ts">
import { toaster } from "../toaster";
import Button from "../component/button.vue";
import ButtonGroup from "../component/button-group.vue";
</script>

<template>
    <h3>Types</h3>
    <ButtonGroup>
        <Button @click="toaster.toast('This is a default toast.')">
            Default
        </Button>
        <Button
            class="btn-success"
            @click="
                toaster.success('Your profile has been updated successfully.')
            "
        >
            Success
        </Button>
        <Button
            class="btn-error"
            @click="
                toaster.error('Failed to upload the file. Please try again.')
            "
        >
            Error
        </Button>
        <Button
            class="btn-info"
            @click="
                toaster.info('You can customize the duration of this toast.', {
                    title: 'Did you know?',
                })
            "
        >
            Info
        </Button>
        <Button
            class="btn-warning"
            @click="
                toaster.warning('Your session will expire in 2 minutes.', {
                    title: 'Session Expiring',
                })
            "
        >
            Warning
        </Button>
        <Button
            @click="
                toaster.loading('This toast is loading indefinitely.', {
                    title: 'Loading...',
                    dismissible: true,
                })
            "
        >
            Loading
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
