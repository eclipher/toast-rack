import type { ToastPosition } from "../core/types";
import styles from "./style.css?inline";
import type { Toast } from "./toast";

export class ToastContainer extends HTMLElement {
    #container: HTMLDivElement;
    constructor(position: ToastPosition = "top-right") {
        super();
        this.#container = document.createElement("div");
        this.changePosition(position);
    }

    connectedCallback() {
        const shadow = this.attachShadow({ mode: "open" });
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
