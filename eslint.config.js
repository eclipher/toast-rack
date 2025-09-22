import prettier from "eslint-config-prettier";
import js from "@eslint/js";
import { includeIgnoreFile } from "@eslint/compat";
import globals from "globals";
import { fileURLToPath } from "node:url";
import ts from "typescript-eslint";
import lit from "eslint-plugin-lit";
import webComponents from "eslint-plugin-wc";

const gitignorePath = fileURLToPath(new URL("./.gitignore", import.meta.url));

export default ts.config(
    includeIgnoreFile(gitignorePath),
    js.configs.recommended,
    ...ts.configs.recommended,
    prettier,
    lit.configs["flat/recommended"],
    webComponents.configs["flat/recommended"],

    {
        languageOptions: {
            globals: { ...globals.browser },
        },
        rules: { "no-undef": "off" },
    },
);
