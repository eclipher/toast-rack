import { Toast } from "../components-lit/toast";
import { ToastContainer } from "../components-lit/toast-container";

function getOrCreateContainer() {
    const existingContainer =
        document.querySelector<ToastContainer>("toast-rack-lit");
    if (existingContainer) {
        console.warn(
            "Toast container Lit already exists. Using the existing one.",
        );
        return existingContainer;
    }
    const container = new ToastContainer();
    document.body.append(container);

    return container;
}

const container = getOrCreateContainer();
export function toast(message: string) {
    const toast = new Toast();
    toast.message = message;

    container.addToast(toast);
}
