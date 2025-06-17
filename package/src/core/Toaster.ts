import type {
    ToasterOptions,
    ToastOptions,
    ToastPosition,
    ToastType,
} from "./types";

export class Toaster {
    defaultOptions: Omit<ToasterOptions, "id"> = {
        title: "Notification",
        message: "This is a default toast message.",
        type: "info",
        duration: 5000,
        dismissible: true,
        position: "top-right",
    };

    // Icons for different toast types
    icons: Record<ToastType, string> = {
        success: "✓",
        error: "✖",
        info: "ℹ",
        warning: "⚠",
    };

    #container: HTMLDivElement;

    constructor(options?: Partial<ToasterOptions>) {
        this.defaultOptions = { ...this.defaultOptions, ...options };
        this.#container = this.#createContainer();
        this.positionContainer(this.defaultOptions.position);
    }

    count = 0;
    #generateId() {
        this.count++;
        return this.count.toString();
    }

    #createContainer() {
        const container = document.createElement("div");
        container.popover = "manual";
        document.body.append(container);
        container.showPopover();

        return container;
    }

    positionContainer(position: ToastPosition) {
        this.#container.className = `toast-container ${position.replace("-", " ")}`;
    }

    // The main function to create and show a toast
    show(options: Partial<ToastOptions> = {}): string {
        const config: Omit<ToastOptions, "id"> & { id?: string } = {
            ...this.defaultOptions,
            ...options,
        };

        // Create toast element
        const toast = document.createElement("div");
        const id = config.id ?? this.#generateId();
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
        this.#container.append(toast);

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
        toast.addEventListener("transitionend", () => toast.remove(), {
            once: true,
        });
    }

    #showWithType(type: ToastType, options: Partial<ToastOptions>) {
        return this.show({
            ...options,
            type: type,
            title: options.title ?? type[0].toUpperCase() + type.slice(1),
        });
    }

    success(options: Partial<ToastOptions>) {
        return this.#showWithType("success", options);
    }

    error(options: Partial<ToastOptions>) {
        return this.#showWithType("error", options);
    }

    info(options: Partial<ToastOptions>) {
        return this.#showWithType("info", options);
    }

    warning(options: Partial<ToastOptions>) {
        return this.#showWithType("warning", options);
    }
}
