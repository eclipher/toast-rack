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
        label: "Headless Custom Toast",
        action: () => {
            const message = document.createElement("template");
            message.innerHTML = String.raw`
              <div
                class="max-w-md w-full bg-white dark:bg-gray-700 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black/5"
              >
                <div class="flex-1 w-0 p-4">
                  <div class="flex items-start">
                    <div class="flex-shrink-0 pt-0.5">
                      <img
                        class="h-10 w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                        alt=""
                      />
                    </div>
                    <div class="ml-3 flex-1">
                      <p class="text-sm font-medium">
                        Emilia Gates
                      </p>
                      <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
                        Sure! 8:30pm works great!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              `;

            toaster.custom(message.content.firstElementChild as HTMLElement);
        },
        snippet: `// Shamelessly copied from react-hot-toast TailwindCSS example
const message = document.createElement("template");
message.innerHTML = String.raw\`
    <div
    class="max-w-md w-full bg-white dark:bg-gray-700 shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black/5"
    >
    <div class="flex-1 w-0 p-4">
        <div class="flex items-start">
        <div class="flex-shrink-0 pt-0.5">
            <img
            class="h-10 w-10 rounded-full"
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixqx=6GHAjsWpt9&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
            alt=""
            />
        </div>
        <div class="ml-3 flex-1">
            <p class="text-sm font-medium">
            Emilia Gates
            </p>
            <p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
            Sure! 8:30pm works great!
            </p>
        </div>
        </div>
    </div>
    </div>
\`;

toaster.custom(message.content.firstElementChild as HTMLElement);`,
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
    {
        label: "Dismiss All",
        action: () => {
            toaster.dismissAll();
        },
        snippet: `toaster.dismissAll();`,
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
