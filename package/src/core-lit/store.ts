import { signal } from "@lit-labs/preact-signals";
import type { ToastDataFull } from "./toaster";

export const toasts = signal<ToastDataFull[]>([]);
