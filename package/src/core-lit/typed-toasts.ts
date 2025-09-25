import type { ToastType } from "../core/types";
import {
    errorIcon,
    infoIcon,
    loadingIcon,
    successIcon,
    warningIcon,
} from "../utils-lit/icons";
import { basicToast, dispatchToast, type ToastData } from "./toaster";

function createTypeDispatcher(
    type: ToastType,
    icon: string,
    accentColor: string,
) {
    return (message: string, options?: ToastData) =>
        dispatchToast(message, {
            ...options,
            title: options?.title ?? type,
            icon: options?.icon ?? icon,
            style: { "--accent-color": accentColor, ...options?.style },
        });
}

export const toastFull = Object.assign(basicToast, {
    success: createTypeDispatcher("Success", successIcon, "#4caf50"),
    error: createTypeDispatcher("Error", errorIcon, "#f44336"),
    info: createTypeDispatcher("Info", infoIcon, "#2196f3"),
    warning: createTypeDispatcher("Warning", warningIcon, "#ff9800"),
    loading: createTypeDispatcher(
        "Loading",
        loadingIcon,
        "var(--message-color)",
    ),
});
