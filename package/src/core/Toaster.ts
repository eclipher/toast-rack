import type {
    ToasterOptions,
    ToastOptions,
    ToastPosition,
    ToastType,
} from "./types";

type ToastOptionsWithMessage = Partial<ToastOptions> & {
    message: string;
};

export class Toaster {
    defaultOptions: Omit<ToasterOptions, "id"> = {
        title: "Notification",
        type: "info",
        durationMs: 5000,
        dismissible: true,
        position: "top-right",
    };

    // Icons for different toast types
    icons: Record<ToastType, string> = {
        success: "✓",
        error: "✖",
        info: "ℹ",
        warning: "⚠",
        loading: "↻",
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

    #findToastEl(id: string) {
        return (
            this.#container.children as HTMLCollectionOf<HTMLElement>
        ).namedItem(id);
    }

    isEmpty() {
        return this.#container.children.length === 0;
    }

    // The main function to create and show a toast
    #createToast(options: ToastOptionsWithMessage): string {
        const config: Omit<ToastOptions, "id"> & {
            id?: string;
            message: string;
        } = {
            ...this.defaultOptions,
            ...options,
        };

        let toast: HTMLElement | null = null;
        let isNew = false;
        // reuse existing toast if exists
        if (config.id) toast = this.#findToastEl(config.id);
        // otherwise create a new element
        if (!toast) {
            toast = document.createElement("article");
            isNew = true;
        }

        const id = config.id ?? this.#generateId();
        toast.id = id;

        // Add content to the toast
        toast.innerHTML = `
            <div class="toast-icon">${this.icons[config.type] || this.icons.info}</div>
            <div class="toast-content">
                <p class="toast-title">${config.title}</p>
                <p class="toast-message">${config.message}</p>
            </div>
            ${config.dismissible ? '<button class="toast-close">&times;</button>' : ""}
        `;

        // if the toast is new, we hide it first for animate it in later;
        // otherwise we don't need to hide it
        toast.className = `toast ${config.type} ${isNew ? "hide" : ""}`;

        // Add toast to the container
        this.#container.append(toast);

        // Animate in if it's a new toast
        if (isNew) {
        setTimeout(() => {
                toast.classList.remove("hide");
            toast.classList.add("show");
        }, 100); // Small delay to allow CSS transition
        }

        // Auto-dismiss functionality
        if (config.durationMs !== Infinity) {
            // clean up existing timeout
            clearTimeout(this.toastTimeoutMap.get(id));
            this.toastTimeoutMap.set(
                id,
                setTimeout(() => this.dismiss(id), config.durationMs),
            );
        }

        // Handle manual closing
        if (config.dismissible) {
            const closeButton = toast.querySelector(".toast-close");
            closeButton!.addEventListener("click", () => this.dismiss(id));
        }

        return id;
    }

    // Function to hide and remove a toast
    dismiss(toastId: string) {
        const toast = this.#findToastEl(toastId);
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

    #createWithType(type: ToastType, options: ToastOptionsWithMessage) {
        return this.#createToast({
            ...options,
            type: type,
            title: options?.title ?? type[0].toUpperCase() + type.slice(1),
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

}
