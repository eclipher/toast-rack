export type ToastPosition =
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

export type ToastType = "info" | "success" | "error" | "warning" | "loading";

// public facing
export interface ToastOptions {
    id?: string;
    title?: string;
    durationMs: number;
    dismissible: boolean;
    unstyled?: boolean;
    style?: string;
}

export interface ToastOptionsFull extends ToastOptions {
    message: string;
    type?: ToastType;
}

export interface ToasterOptions extends Omit<ToastOptions, "id"> {
    position: ToastPosition;
}
