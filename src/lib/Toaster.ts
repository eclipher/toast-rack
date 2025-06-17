export type ToastPosition =
    | "top-start"
    | "top-center"
    | "top-end"
    | "bottom-start"
    | "bottom-center"
    | "bottom-end";

export type ToastType = "info" | "success" | "error" | "warning";

interface ToastOptions {
    id: string | (() => string);
    title: string;
    message: string;
    type: ToastType;
    duration: number;
    position: ToastPosition;
    dismissible: boolean;
}

export class Toaster {
    defaultOptions: ToastOptions = {
        id: () => `toast` + crypto.randomUUID(),
        title: "Notification",
        message: "This is a default toast message.",
        type: "info",
        duration: 5000,
        dismissible: true,
        position: "top-end",
    };

    // Icons for different toast types
    icons: Record<ToastType, string> = {
        success: "✓",
        error: "✖",
        info: "ℹ",
        warning: "⚠",
    };

    container: HTMLElement | null;

    constructor(options: Partial<ToastOptions>) {
        this.defaultOptions = { ...this.defaultOptions, ...options };
        this.container = document.getElementById("toast-container");

        if (!this.container) {
            throw new Error(
                "Toast container not found! Please create a element with id `toast-container` in your document first.",
            );
        }
    }

    // The main function to create and show a toast
    show(options: Partial<ToastOptions> = {}): string {
        const config: ToastOptions = { ...this.defaultOptions, ...options };

        // Create toast element
        const toast = document.createElement("div");
        const id = typeof config.id === "function" ? config.id() : config.id;
        toast.className = `toast ${config.type}`;
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

        // Add toast to the container
        this.container?.appendChild(toast);

        // Animate in
        setTimeout(() => {
            toast.classList.add("show");
        }, 100); // Small delay to allow CSS transition

        // Auto-dismiss functionality
        const dismissTimeout = setTimeout(() => {
            this.dismiss(id);
        }, config.duration);

        // Handle manual closing
        if (config.dismissible) {
            const closeButton = toast.querySelector(".toast-close");
            closeButton!.addEventListener("click", () => {
                clearTimeout(dismissTimeout);
                this.dismiss(id);
            });
        }

        return id;
    }

    // Function to hide and remove a toast
    dismiss(toastId: string) {
        const toast = document.getElementById(toastId);
        if (!toast) {
            console.error("No toast found to dismiss");
            return;
        }
        toast.classList.remove("show");
        toast.classList.add("hide");
        // Remove the element after the animation completes
        toast.addEventListener(
            "transitionend",
            () => {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            },
            { once: true },
        );
    }

    #showWithType(type: ToastType, options: Partial<ToastOptions>) {
        this.show({
            ...options,
            type: type,
            title: options.title ?? type[0].toUpperCase() + type.slice(1),
        });
    }

    success(options: Partial<ToastOptions>) {
        this.#showWithType("success", options);
    }

    error(options: Partial<ToastOptions>) {
        this.#showWithType("error", options);
    }

    info(options: Partial<ToastOptions>) {
        this.#showWithType("info", options);
    }

    warning(options: Partial<ToastOptions>) {
        this.#showWithType("warning", options);
    }
}
