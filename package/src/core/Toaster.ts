import { icons } from "./icons";
import type {
    ToasterOptions,
    ToastOptions,
    ToastOptionsFull,
    ToastPosition,
    ToastType,
} from "./types";
import { resolveValue } from "./utils";

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

    #container: HTMLDivElement;
    toastTimeoutMap = new Map<string, ReturnType<typeof setTimeout>>();

    constructor(options?: Partial<ToasterOptions>) {
        this.defaultOptions = { ...this.defaultOptions, ...options };
        this.#container = this.#createContainer();
        this.changePosition(this.defaultOptions.position);
    }

    count = 0;
    #generateId() {
        this.count++;
        return `toast-${this.count};`;
    }

    #createContainer() {
        const container = document.createElement("div");
        container.popover = "manual";
        document.body.append(container);
        container.showPopover();

        return container;
    }

    changePosition(position: ToastPosition) {
        this.#container.className = `toast-container ${position.replace("-", " ")}`;
    }

    /**
     * Get or create a toast element by id.
     * If no id is given, or the toast with the given id does not exist, it will create a new one.
     * @param id - The id of the toast to get or create.
     * @returns The toast element with a defined id.
     */
    #getOrCreateToast(id?: string) {
        if (id) {
            const toast = (
                this.#container.children as HTMLCollectionOf<HTMLElement>
            ).namedItem(id);
            if (toast) {
                delete toast.dataset.isNew; // Mark as not new
                return toast;
            }
            console.warn(`Toast with id ${id} not found, creating a new one.`);
        }

        // If no id is provided,
        // or the toast with the given id does not exist,
        // create a new one
        const toast = document.createElement("article");
        toast.id = this.#generateId();
        toast.dataset.isNew = "true"; // Mark as new
        return toast;
    }

    isEmpty() {
        return this.#container.children.length === 0;
    }

    clear() {
        this.toastTimeoutMap.forEach((timeout) => clearTimeout(timeout));
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

        const toast = this.#getOrCreateToast(config.id);

        // Add content to the toast
        toast.innerHTML = `
            ${config.type ? `<div class="toast-icon">${icons[config.type]}</div>` : ""}
            <div class="toast-content">
                ${config.title ? `<p class="toast-title">${config.title}</p>` : ""}
                <p class="toast-message">${config.message}</p>
            </div>
            ${config.dismissible ? `<button class="toast-close">${icons.close}</button>` : ""}
        `;

        // if the toast is new, we hide it first for animate it in later;
        // otherwise we don't need to hide it
        toast.className = `toast ${config.type} ${toast.dataset.isNew ? "hide" : ""}`;

        // Add toast to the container
        this.#container.append(toast);

        // Animate in if it's a new toast
        if (toast.dataset.isNew) {
            setTimeout(() => {
                toast.classList.remove("hide");
                toast.classList.add("show");
            }, 100); // Small delay to allow CSS transition
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

        // Handle manual closing
        if (config.dismissible) {
            const closeButton = toast.querySelector(".toast-close");
            closeButton!.addEventListener("click", () =>
                this.dismiss(toast.id),
            );
        }

        return toast.id;
    }

    // Function to hide and remove a toast
    dismiss(toastId: string) {
        const toast = this.#getOrCreateToast(toastId);
        if (!toast) {
            console.error("No toast found to dismiss");
            return;
        }
        const timeout = this.toastTimeoutMap.get(toastId);
        if (timeout) {
            clearTimeout(timeout);
            this.toastTimeoutMap.delete(toastId);
        }

        toast.classList.remove("show");
        toast.classList.add("hide");
        // Remove the element after the animation completes
        toast.addEventListener("transitionend", () => toast.remove(), {
            once: true,
        });
    }

    // public-facing method with `message` as first argument
    toast(message: string, options: Partial<ToastOptions> = {}) {
        return this.#createToast({ ...options, message });
    }

    #createWithType(
        type: ToastType,
        options: Partial<Omit<ToastOptionsFull, "type">>,
    ) {
        return this.#createToast({
            ...options,
            type: type,
            title: options.title ?? type[0].toUpperCase() + type.slice(1),
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
        const id = this.loading(handlers.loading, options);

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
