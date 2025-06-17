import { defineConfig } from "vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/lib/index.ts"),
            name: "ToastKit-JS",
            fileName: (format) => `toast-kit-js.${format}.js`,
        },
    },
});
