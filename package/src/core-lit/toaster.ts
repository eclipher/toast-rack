import type { StyleInfo } from "lit/directives/style-map.js";
import { ToastContainer } from "../components-lit/toast-container";
import type { ToasterOptions } from "../core/types";
import { generateId } from "../utils-lit/generate-id";
import { toasts } from "./store";

export function mountToaster(options?: ToasterOptions) {
    const existingContainer =
        document.querySelector<ToastContainer>("toast-rack-lit");
    if (existingContainer) {
        console.warn(
            "Toast container Lit already exists. Using the existing one.",
        );
        return existingContainer;
    }

    const container = new ToastContainer();
    if (options?.position) container.position = options.position;
    document.body.append(container);

    return container;
}

// user facing
export interface ToastData {
    id?: string;
    title?: string;
    icon?: string;
    style?: StyleInfo;
}

// everything about a toast, for state management
export interface ToastDataFull extends ToastData {
    id: string;
    message: string;
}

export function dispatchToast(message: string, options?: ToastData) {
    const toast = { ...options, id: options?.id ?? generateId(), message };
    toasts.value = [...toasts.value, toast];
    return toast.id;
}

export function basicToast(message: string, options?: ToastData) {
    return dispatchToast(message, options);
}
