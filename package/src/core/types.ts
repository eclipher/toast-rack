export type ToastPosition =
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

export type ToastType = "info" | "success" | "error" | "warning";

export interface ToastOptions {
    id: string;
    title: string;
    message: string;
    type: ToastType;
    duration: number;
    dismissible: boolean;
}

export interface ToasterOptions extends ToastOptions {
    position: ToastPosition;
}
