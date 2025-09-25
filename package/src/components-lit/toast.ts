import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, ref } from "lit/directives/ref.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import { styleMap } from "lit/directives/style-map.js";
import type { ToastDataFull } from "../core-lit/toaster";

@customElement("toast-el")
export class Toast extends LitElement {
    @property({ attribute: false })
    data: Omit<ToastDataFull, "id"> = {
        message: "",
    };

    toastRef = createRef<HTMLElement>();

    render() {
        return html`<article
            class="toast"
            style=${this.data.style ? styleMap(this.data.style) : ""}
            ${ref(this.toastRef)}
            data-styled="true"
        >
            ${this.data.icon
                ? html`<span class="toast-icon"
                      >${unsafeSVG(this.data.icon)}</span
                  >`
                : ""}
            <div class="toast-content">
                <p class="toast-title">${this.data.title}</p>
                <p class="toast-message">${this.data.message}</p>
            </div>
        </article>`;
    }

    connectedCallback(): void {
        super.connectedCallback();
        // Add the "visible" class with setTimeout to trigger CSS transitions
        setTimeout(() => this.toastRef.value?.classList.add("visible"), 0);
    }

    static styles = css`
        * {
            box-sizing: border-box;
            margin: 0;
            padding: 0;
        }

        .toast {
            opacity: 0;
            transition: all 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
            transform: var(--toast-initial-transform);
            height: 0;
            overflow: hidden;
            /* gap is not animatable in css, so we use margin */
            margin-bottom: 0;
            filter: blur(10px);
        }

        .toast.visible {
            opacity: 1;
            transform: translateY(0);
            height: auto;
            filter: none;
            overflow: visible;

            margin-bottom: 12px;
        }

        .toast[data-styled="true"] {
            display: flex;
            align-items: center;
            gap: 12px;

            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            border-left: 4px solid var(--accent-color);

            --background-color: white;
            --message-color: #333333;
            background-color: var(--background-color);
            color: var(--message-color);

            @media (prefers-color-scheme: dark) {
                --background-color: #333333;
                --message-color: #f0f0f0;
            }

            &.visible {
                padding: 12px 16px;
            }

            .toast-icon {
                color: var(--accent-color);
                width: 1.5rem;
                height: 1.5rem;
                flex: none;
            }

            .toast-title {
                color: var(--accent-color);
                font-weight: 600;
                font-size: 1.125rem;
            }

            .toast-close {
                background: none;
                border: none;
                color: #999;
                cursor: pointer;
                line-height: 1;
                width: 1.5rem;
                height: 1.5rem;
                flex: none;
            }
        }

        .toast-content {
            flex-grow: 1;
        }
    `;
}
