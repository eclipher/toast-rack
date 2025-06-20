<template>
    <div class="flex gap-4 flex-wrap">
        <slot />
    </div>
</template>
<style scoped>
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
</style>
