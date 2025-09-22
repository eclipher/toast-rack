import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("toast-lit")
export class Toast extends LitElement {
    @property({ type: String })
    message = "";

    render() {
        return html` <article class="toast">
            <div class="toast-content">
                <p class="toast-message">${this.message}</p>
            </div>
        </article>`;
    }
}
