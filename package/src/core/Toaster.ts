import { Toast } from "../components/toast";
import { ToastRack } from "../components/toast-container";
import type {
    ToasterOptions,
    ToastMessage,
    ToastOptions,
    ToastOptionsFull,
    ToastPosition,
    ToastType,
} from "./types";
import { registerCustomElement, resolveValue } from "./utils";

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

export class Toaster {
    defaultOptions: ToasterOptions = {
        durationMs: 5000,
        dismissible: true,
        position: "top-right",
    };

    #container: ToastRack;
    toastTimeoutMap = new Map<string, ReturnType<typeof setTimeout>>();

    constructor(options?: Partial<ToasterOptions>) {
        registerCustomElement("toast-rack", ToastRack);
        registerCustomElement("toast-element", Toast);

        this.defaultOptions = { ...this.defaultOptions, ...options };
        this.#container = this.#getOrCreateContainer();
    }

    count = 0;
    #generateId() {
        this.count++;
        return `toast-${this.count}`;
    }

    #getOrCreateContainer() {
        const existingContainer =
            document.querySelector<ToastRack>("toast-rack");
        if (existingContainer) {
            console.warn(
                "Toast container already exists. Using the existing one.",
            );
            return existingContainer;
        }
        const container = new ToastRack();
        document.body.append(container);
        return container;
    }

    changePosition(position: ToastPosition) {
        this.#container.changePosition(position);
    }

    #getToast(id: string): Toast | null {
        return this.#container.toasts.namedItem(id);
    }

    isEmpty() {
        return this.#container.toasts.length === 0;
    }

    dismissAll() {
        this.toastTimeoutMap.forEach((_timeout, id) => this.dismiss(id));
        this.toastTimeoutMap.clear();
        this.#container.innerHTML = "";
    }

    // The main function to create and show a toast
    #createToast(options: Partial<ToastOptionsFull>): string {
        const config: ToastOptionsFull = {
            ...this.defaultOptions,
            ...options,
            message: options.message || "",
        };

        let toast: Toast | null = null;
        const { id: givenId, ...restConfig } = config;
        if (givenId) {
            toast = this.#getToast(givenId);
            if (toast) {
                toast.update(restConfig);
            } else {
                console.warn(
                    `Toast with id ${givenId} not found, creating a new one.`,
                );
            }
        }

        // If no id is given, or the toast with the given id does not exist, create a new toast.
        if (!toast) {
            toast = new Toast(
                { ...restConfig, id: this.#generateId() },
                this.#container,
            );
            this.#container.appendToast(toast);
        }

        // Auto-dismiss functionality
        if (config.durationMs !== Infinity) {
            // clean up existing timeout
            clearTimeout(this.toastTimeoutMap.get(toast.id));
            this.toastTimeoutMap.set(
                toast.id,
                setTimeout(() => this.dismiss(toast.id), config.durationMs),
            );
        }

        toast.addEventListener("click", (e) => {
            if ((e.target as HTMLElement).closest("[data-action='dismiss']")) {
                this.dismiss(toast.id);
            }
        });
        return toast.id;
    }

    // Function to hide and remove a toast
    dismiss(toastId: string) {
        const toast = this.#getToast(toastId);
        if (!toast) {
            console.error("No toast found to dismiss with id:", toastId);
            return;
        }
        const timeout = this.toastTimeoutMap.get(toastId);
        if (timeout) {
            clearTimeout(timeout);
            this.toastTimeoutMap.delete(toastId);
        }

        toast.removeAfterAnimation();
    }

    // public-facing method with `message` as first argument
    toast(message: string, options: Partial<ToastOptions> = {}) {
        return this.#createToast({ ...options, message });
    }

    /**
     * Show a custom toast notification. This method will disable the default styling and allow you to fully customize the toast's appearance.
     * @param message - The message to display in the toast. Can be a string or an HTMLElement.
     * @param options - Additional options for the toast.
     * @returns The ID of the created toast.
     */
    custom(message: ToastMessage, options: Partial<ToastOptions> = {}) {
        return this.#createToast({ ...options, message, unstyled: true });
    }

    #createWithType(
        type: ToastType,
        options: Partial<Omit<ToastOptionsFull, "type">>,
    ) {
        return this.#createToast({
            ...options,
            type: type,
            title:
                options.title ??
                this.defaultOptions.title ??
                type[0].toUpperCase() + type.slice(1),
        });
    }

    success(message: string, options?: Partial<ToastOptions>) {
        return this.#createWithType("success", { ...options, message });
    }

    error(message: string, options?: Partial<ToastOptions>) {
        return this.#createWithType("error", { ...options, message });
    }

    info(message: string, options?: Partial<ToastOptions>) {
        return this.#createWithType("info", { ...options, message });
    }

    warning(message: string, options?: Partial<ToastOptions>) {
        return this.#createWithType("warning", { ...options, message });
    }

    /** Render a toast of "loading" type. By default, this kind of toast will stay on screen forever and cannot be dismissed by user. You can either:
     * - Programmatically remove it via `toaster.remove()`.
     * - Or explicitly pass `dismissible` and `duration` to override the default option.  */
    loading(message: string, options?: Partial<ToastOptions>) {
        return this.#createWithType("loading", {
            durationMs: Infinity,
            dismissible: false,
            ...options,
            message,
        });
    }

    /**
     * A convenience method to handle promises with toast notifications.
     * @param promise - The promise to handle, or a function that returns a promise.
     * @param handlers - An object containing loading, success, and error messages, as well as an optional finally callback.
     * @param options - Additional options for the toast.
     * @returns The ID of the toast.
     */
    async promise<T>(
        promise: Promise<T> | (() => Promise<T>),
        handlers: PromiseHandler<T>,
        options: Omit<Partial<ToastOptions>, "type" | "id"> = {},
    ) {
        const id = this.loading(handlers.loading, {
            durationMs: Infinity, // Keep the loading toast on screen indefinitely until resolved (in case user specifies `durationMs`)
            ...options,
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
    }
}
