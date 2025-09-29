import {
    errorIcon,
    infoIcon,
    loadingIcon,
    successIcon,
    warningIcon,
} from "../utils-lit/icons";
import { basicToast, dispatchToast } from "./toaster";
import type { ToastData, ToastType } from "../types";
import { resolveValue } from "../utils-lit/resolve-value";

type PromiseHandler<T> = {
    /**
     * The loading message.
     */
    loading: string;
    /**
     * The success message or a function that returns the message.
     */
    success: string | ((data: T) => string);
    /**
     * The error message or a function that returns the message.
     */
    error: string | ((error: unknown) => string);

    /**
     * Optional callback to run after the promise is resolved or rejected.
     */
    finally?: () => void;
};

function createTypeDispatcher(
    type: ToastType,
    icon: string,
    accentColor: string,
) {
    return (message: string, options?: ToastData) =>
        dispatchToast(message, {
            ...options,
            title: options?.title ?? type,
            icon: options?.icon ?? icon,
            style: { "--accent-color": accentColor, ...options?.style },
        });
}

export const toastFull = Object.assign(basicToast, {
    success: createTypeDispatcher("Success", successIcon, "#4caf50"),
    error: createTypeDispatcher("Error", errorIcon, "#f44336"),
    info: createTypeDispatcher("Info", infoIcon, "#2196f3"),
    warning: createTypeDispatcher("Warning", warningIcon, "#ff9800"),
    loading: createTypeDispatcher(
        "Loading",
        loadingIcon,
        "var(--message-color)",
    ),
    /**
     * A convenience method to handle promises with toast notifications.
     * @param promise - The promise to handle, or a function that returns a promise.
     * @param handlers - An object containing loading, success, and error messages, as well as an optional finally callback.
     * @param options - Additional options for the toast.
     * @returns The ID of the toast.
     */
    promise: async function <T>(
        promise: Promise<T>,
        handlers: PromiseHandler<T>,
        options?: ToastData,
    ) {
        const id = this.loading(handlers.loading, {
            ...options,
            durationMs: Infinity, // Keep the loading toast on screen indefinitely until resolved
        });

        const p = resolveValue(promise);

        try {
            const data = await p;
            const successMessage = resolveValue(handlers.success, data);
            this.success(successMessage, { id, ...options });
        } catch (err) {
            const errorMessage = resolveValue(handlers.error, err);
            this.error(errorMessage, { id, ...options });
        } finally {
            handlers.finally?.();
        }

        return id;
    },
});
