import { closeIcon, typeIcons } from "../core/icons";
import type { ToastOptionsFull } from "../core/types";

export class Toast extends HTMLElement {
    config: ToastOptionsFull;
    constructor(config: ToastOptionsFull) {
        super();
        this.config = config;
    }

    render() {
        const { type, title, message, dismissible, classes, unstyled, id } =
            this.config;
        this.className = `toast ${type || ""} ${classes?.toast || ""} `;
        this.dataset.styled = unstyled ? "false" : "true";
        this.style.cssText = this.config.style || "";

        if (id) this.id = id;

        this.innerHTML = String.raw`
            ${type ? `<div class="toast-icon">${typeIcons[type]}</div>` : ""}
            <div class="toast-content">
                ${title ? `<p class="toast-title ${classes?.title || ""}">${title}</p>` : ""}
                <p class="toast-message ${classes?.message || ""}">${message}</p>
            </div>
        `;
        if (dismissible) this.append(this.dismissButton);
    }

    // Lifecycle method called when the element is added to the DOM
    connectedCallback() {
        this.render();
        // Add the "visible" class with setTimeout to trigger CSS transitions
        setTimeout(() => this.classList.add("visible"), 0);
    }

    update(newConfig: Partial<ToastOptionsFull>) {
        this.config = { ...this.config, ...newConfig };
        this.render();
        // since the element is already in the DOM, we can just readd the "visible" class without transition
        this.classList.add("visible");
    }

    removeAfterAnimation() {
        this.classList.remove("visible");
        // Remove the element after the animation completes
        this.addEventListener("transitionend", () => this.remove(), {
            once: true,
        });
    }

    get dismissButton() {
        const button = document.createElement("button");
        button.className = "toast-close";
        button.ariaLabel = "Close toast";
        button.innerHTML = closeIcon;
        button.addEventListener("click", () =>
            this.dispatchEvent(
                new CustomEvent("dismiss", {
                    bubbles: true,
                    composed: true,
                }),
            ),
        );
        return button;
    }
}
