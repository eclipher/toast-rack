import type { ToastPosition } from "../core/types";
import styles from "./style.css?inline";
import type { Toast } from "./toast";

/**
 * This custom element `<toast-rack>` contains a shadow root and optionally other elements.
 * - The regular toasts reside in a container `<div>` inside the shadow root. they should be added using the `appendToast` method.
 * - The custom toasts should be directly appended to the `<toast-rack>` element with a slot attribute (via `append` method), and they will be displayed in the same container. This is so that the custom toasts can be styled by the user's CSS.
 */
export class ToastRack extends HTMLElement {
    #container: HTMLDivElement;
    constructor(position: ToastPosition = "top-right") {
        super();
        this.#container = document.createElement("div");
        this.changePosition(position);
    }

    connectedCallback() {
        const shadow = this.attachShadow({
            mode: "open",
            slotAssignment: "manual",
        });
        const styleEl = document.createElement("style");
        styleEl.textContent = styles;
        shadow.append(styleEl);

        this.#container.popover = "manual";
        shadow.append(this.#container);

        this.#container.showPopover();
    }

    changePosition(position: ToastPosition): void {
        this.#container.className = `toast-container ${position.replace("-", " ")}`;
    }

    appendToast(toast: Toast): void {
        this.#container.append(toast);
    }

    get toasts(): HTMLCollectionOf<Toast> {
        return this.#container.children as HTMLCollectionOf<Toast>;
    }
}
