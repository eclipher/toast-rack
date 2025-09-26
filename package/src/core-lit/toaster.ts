import { ToastContainer } from "../components-lit/toast-container";
import { generateId } from "../utils-lit/generate-id";
import { addToast, findToast, updateToast } from "./store";
import type { ToastData, ToastDataFull, ToasterOptions } from "../types";

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

    const { position, ...restOptions } = options || {};
    if (position) container.position = position;
    container.defaultToastOptions = {
        ...container.defaultToastOptions,
        ...restOptions,
    };
    document.body.append(container);

    return container;
}

export function dispatchToast(message: string, options?: ToastData) {
    if (options?.id) {
        if (findToast(options.id)) {
            updateToast(options.id, { ...options, message });
            return options.id;
        } else {
            console.warn(
                `Toast with id ${options.id} not found, creating a new one.`,
            );
        }
    }
    const toast: ToastDataFull = {
        ...options,
        id: options?.id ?? generateId(),
        message,
    };
    addToast(toast);
    return toast.id;
}

export function basicToast(message: string, options?: ToastData) {
    return dispatchToast(message, options);
}
