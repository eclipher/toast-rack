import { Toast } from "../components/toast";
import { ToastRack } from "../components/toast-container";
import type {
    ToasterOptions,
    ToastMessage,
    ToastOptions,
    ToastOptionsFull,
    ToastPosition,
} from "./types";
import { registerCustomElement } from "./utils";

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
        this.#container = this.#getOrCreateContainer(
            this.defaultOptions.position,
        );
    }

    count = 0;
    #generateId() {
        this.count++;
        return `toast-${this.count}`;
    }

    #getOrCreateContainer(position?: ToastPosition) {
        const existingContainer =
            document.querySelector<ToastRack>("toast-rack");
        if (existingContainer) {
            console.warn(
                "Toast container already exists. Using the existing one.",
            );
            return existingContainer;
        }
        const container = new ToastRack(position);
        document.body.append(container);
        return container;
    }

    changePosition(position: ToastPosition) {
        this.#container.changePosition(position);
    }

    #getToast(id: string): Toast | null {
        return this.#container.toasts.namedItem(id);
    }

    get isEmpty() {
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


}
