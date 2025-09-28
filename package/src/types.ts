import type { StyleInfo } from "lit/directives/style-map.js";

export type ToastPosition =
    | "top-left"
    | "top-center"
    | "top-right"
    | "bottom-left"
    | "bottom-center"
    | "bottom-right";

export type ToastType = "Info" | "Success" | "Error" | "Warning" | "Loading";

// user facing
export type ToastData = {
    id?: string;
    title?: string;
    icon?: string;
    style?: StyleInfo;
    dismissible?: boolean;
    durationMs?: number;
};

// everything about a toast, for state management
export type ToastDataFull = ToastData & {
    id: string;
    message: string;
};

export type ToasterOptions = Omit<ToastData, "id"> & {
    position?: ToastPosition;
};
