import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";
import { createRef, ref, type Ref } from "lit/directives/ref.js";

import type { ToastPosition } from "../core/types";
import { SignalWatcher } from "@lit-labs/preact-signals";
import { removeToast, toasts } from "../core-lit/store";

import "./toast";
import type { ToastData } from "../types";

@customElement("toast-rack-lit")
export class ToastContainer extends SignalWatcher(LitElement) {
    @property({ type: String })
    position: ToastPosition = "top-right";

    @property({ attribute: false })
    defaultToastOptions: Omit<ToastData, "id"> = { dismissible: true };

    containerRef: Ref<HTMLDivElement> = createRef();
    firstUpdated(): void {
        this.containerRef.value?.showPopover();
    }

    render() {
        const positionClasses = this.position.replace("-", " ");

        return html`<div
            class="toast-container ${positionClasses}"
            popover="manual"
            ${ref(this.containerRef)}
        >
            ${repeat(
                toasts.value,
                (toast) => toast.id,
                (toast) =>
                    html`<toast-el
                        .data=${{ ...this.defaultToastOptions, ...toast }}
                        .handleDismiss=${() => removeToast(toast.id)}
                    >
                    </toast-el>`,
            )}
        </div>`;
    }

    static styles = css`
        .toast-container {
            /* override popover style */
            inset: unset;
            border: none;
            background-color: transparent;
            overflow: clip;

            /* for toast shadow to show */
            overflow-clip-margin: 12px;

            display: flex;
            width: 100%;
            max-width: 360px;

            interpolate-size: allow-keywords;
            transition: 0.5s cubic-bezier(0.215, 0.61, 0.355, 1);
            transition-property: transform, translate;

            --space-to-screen: 20px;
        }

        .toast-container.top {
            /* vertical using transform, horizontal using translate directly,
            otherwise they will override each other and we cannot stack top and left together for example  */
            transform: translateY(var(--space-to-screen));
            flex-direction: column;

            --toast-initial-transform: translateY(-100%);
        }

        .toast-container.bottom {
            /* bottom doesn't need additional screen-to-space, because it will be handled by the margin-bottom of the individual toast */
            transform: translateY(calc(100vh - 100%));
            flex-direction: column-reverse;

            --toast-initial-transform: translateY(100%);
        }

        .toast-container.left {
            translate: calc(0% + var(--space-to-screen));
        }

        .toast-container.center {
            translate: calc(50vw - 50%);
        }

        .toast-container.right {
            translate: calc(100vw - 100% - var(--space-to-screen));
        }
    `;
}
