<template>
    <div class="my-14">
        <h2 class="text-2xl font-semibold mb-2"><slot name="heading" /></h2>
        <p class="text-sm text-gray-800/80 pb-4">
            <slot name="description" />
        </p>
        <slot />
    </div>
</template>
