import { defineConfig } from "vite";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import dts from "unplugin-dts/vite";

const __dirname = dirname(fileURLToPath(import.meta.url));

export default defineConfig({
    build: {
        lib: {
            entry: resolve(__dirname, "src/index.ts"),
            name: "ToastKit",
            formats: ["es", "umd"],
            fileName: (format) => `toast-kit.${format}.js`,
        },
    },
    plugins: [dts()],
});
