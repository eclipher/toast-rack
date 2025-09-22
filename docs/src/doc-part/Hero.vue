<script setup lang="ts">
import Button from "@/component/button.vue";
import { toaster } from "../toaster";
import { NpmIcon, GitHubIcon } from "vue3-simple-icons";
import { toast } from "toast-rack";

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

function showDemoLit() {
    toast("This is a toast from the Lit version!");
}
</script>

<template>
    <header class="py-14 bg-primary">
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
                    class="bg-white dark:bg-white text-primary font-bold"
                    @click="showDemo()"
                >
                    Make a Toast
                </Button>

                <Button
                    class="bg-white dark:bg-white text-primary font-bold"
                    @click="showDemoLit()"
                >
                    Make a Toast
                </Button>
                <Button
                    href="https://github.com/eclipher/toast-rack"
                    class="border-white/20 bg-white/10 dark:bg-white/20"
                >
                    <GitHubIcon />
                    Github
                </Button>
                <Button
                    href="https://www.npmjs.com/package/toast-rack"
                    class="border-white/20 bg-white/10 dark:bg-white/20"
                >
                    <NpmIcon />
                    NPM
                </Button>
            </div>
        </div>
    </header>
</template>
