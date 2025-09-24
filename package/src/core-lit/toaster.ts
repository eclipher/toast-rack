import { ToastContainer } from "../components-lit/toast-container";
import type { ToasterOptions } from "../core/types";
import { toasts } from "./store";

export function mountToaster(options?: ToasterOptions) {
    const existingContainer =
        document.querySelector<ToastContainer>("toast-rack-lit");
    if (existingContainer) {
        console.warn(
            "Toast container Lit already exists. Using the existing one.",
        );
        return existingContainer;
    }

    const container = new ToastContainer();
    if (options?.position) container.position = options.position;
    document.body.append(container);

    return container;
}

export function toast(message: string) {
    toasts.value = [...toasts.value, message];
}
