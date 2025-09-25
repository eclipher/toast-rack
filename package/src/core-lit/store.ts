import { signal } from "@lit-labs/preact-signals";
import type { ToastDataFull } from "./toaster";

export const toasts = signal<ToastDataFull[]>([]);

export function findToast(id: string) {
    return toasts.value.find((toast) => toast.id === id);
}

export function addToast(toast: ToastDataFull) {
    toasts.value = [...toasts.value, toast];
}

export function updateToast(id: string, updatedFields: Partial<ToastDataFull>) {
    toasts.value = toasts.value.map((toast) =>
        toast.id === id ? { ...toast, ...updatedFields } : toast,
    );
}
