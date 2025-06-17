export type ToastPosition =
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

export type ToastType = "info" | "success" | "error" | "warning" | "loading";

export interface ToastOptions {
    id: string;
    title: string;
    type: ToastType;
    durationMs: number;
    dismissible: boolean;
}

export interface ToasterOptions extends ToastOptions {
    position: ToastPosition;
}
