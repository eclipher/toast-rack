<script setup lang="ts">
import Button from "@/component/button.vue";
import { toaster } from "../toaster";
import { Github } from "lucide-vue-next";

function showDemo() {
    const promise = new Promise((resolve) => setTimeout(resolve, 1000));

    toaster.promise(
        promise,
        {
            loading: "Preparing your toast...",
            success: "Here's your toast!",
            error: "Failed to prepare your toast.",
        },
        {
            durationMs: 1500,
        },
    );
}
</script>

<template>
    <header class="py-14">
        <div
            class="flex flex-col t-container items-center justify-center gap-8 text-center text-white"
        >
            <h2 class="text-2xl font-bold">Toast Rack</h2>
            <h1 class="text-5xl md:text-7xl font-extrabold text-balance">
                Beautiful Toast Notifications Built with Vanilla JS
            </h1>
            <p>
                A lightweight, customizable toast notification library with zero
                dependencies
            </p>
            <div class="flex gap-4 flex-col sm:flex-row">
                <Button
                    class="bg-white text-primary font-bold"
                    @click="showDemo()"
                >
                    Make a Toast
                </Button>
                <Button
                    href="https://github.com/eclipher/toast-rack-js"
                    class="border-white/20 bg-white/10"
                >
                    <Github />
                    Github
                </Button>
            </div>
        </div>
    </header>
</template>

<style scoped>
header {
    background: linear-gradient(
        135deg,
        var(--primary-color),
        var(--primary-dark)
    );
}
</style>
