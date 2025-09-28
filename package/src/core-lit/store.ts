import { signal } from "@lit-labs/preact-signals";
import type { ToastDataFull } from "../types";
import { containerInstance } from "./toaster";

export const toasts = signal<ToastDataFull[]>([]);

const toastTimeoutMap = new Map<string, ReturnType<typeof setTimeout>>();

function addToastTimeout(id: string, durationMs?: number) {
    if (durationMs === Infinity) return;

    const timeout = setTimeout(
        () => removeToast(id),
        durationMs ?? containerInstance?.defaultToastOptions.durationMs ?? 5000,
    );
    toastTimeoutMap.set(id, timeout);
}

function clearToastTimeout(id: string) {
    if (toastTimeoutMap.has(id)) {
        clearTimeout(toastTimeoutMap.get(id));
        toastTimeoutMap.delete(id);
    }
}

function updateToastTimeout(id: string, durationMs?: number) {
    clearToastTimeout(id);
    addToastTimeout(id, durationMs);
}

export function findToast(id: string) {
    return toasts.value.find((toast) => toast.id === id);
}

export function addToast(toast: ToastDataFull) {
    addToastTimeout(toast.id, toast.durationMs);
    toasts.value = [...toasts.value, toast];
}

export function updateToast(
    id: string,
    updatedFields: Partial<Omit<ToastDataFull, "id">>,
) {
    updateToastTimeout(id, updatedFields.durationMs);

    toasts.value = toasts.value.map((toast) =>
        toast.id === id ? { ...toast, ...updatedFields } : toast,
    );
}

export function removeToast(id: string) {
    clearToastTimeout(id);
    toasts.value = toasts.value.filter((toast) => toast.id !== id);
}
