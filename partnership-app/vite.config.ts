import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

import { ViteMarkdownLoader } from "./src/plugins/RegisterInfoDocsLoader";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), ViteMarkdownLoader()] as PluginOption[],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@mosu/partnership-docs": path.resolve(__dirname, "../docs"),
        },
    },
});
