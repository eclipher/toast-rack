import { closeIcon, typeIcons } from "../core/icons";
import type { ToastOptionsFull } from "../core/types";
import type { ToastRack } from "./toast-container";

export class Toast extends HTMLElement {
    config: ToastOptionsFull;
    rack: ToastRack;

    constructor(config: ToastOptionsFull, rack: ToastRack) {
        super();
        this.config = config;
        this.rack = rack;
    }

    render() {
        const { type, title, message, dismissible, unstyled, id } = this.config;
        this.className = `toast ${type || ""}`;
        this.dataset.styled = unstyled ? "false" : "true";
        this.style.cssText = this.config.style || "";

        if (id) this.id = id;

        if (message instanceof HTMLElement) {
            const slot = document.createElement("slot");
            this.append(slot);
            this.rack.append(message);
            slot.assign(message);
        } else if (typeof message === "string") {
            this.innerHTML = String.raw`
            ${type ? `<div class="toast-icon">${typeIcons[type]}</div>` : ""}
            <div class="toast-content">
                ${title ? `<p class="toast-title">${title}</p>` : ""}
                <p class="toast-message">${message}</p>
            </div>
            `;
            if (dismissible) this.append(this.dismissButton);
        }
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
        const buttonTemplate = document.createElement("template");
        buttonTemplate.innerHTML = String.raw`<button class="toast-close" aria-label="Close toast" type="button" data-action="dismiss">${closeIcon}</button>`;
        const button = buttonTemplate.content
            .firstElementChild as HTMLButtonElement;
        return button;
    }
}
