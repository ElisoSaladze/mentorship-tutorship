import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
import pluginEslint from "@nabla/vite-plugin-eslint";
import pluginTsconfigPaths from "vite-tsconfig-paths";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react({
            /**
             * Use the `@emotion/react` and `@emotion/babel-plugin` options if you use emotion as your style engine. For example, emotion is the default engine in MUI.
             */
            jsxImportSource: "@emotion/react",
            jsxRuntime: "automatic",
            babel: {
                plugins: ["@emotion/babel-plugin"],
            },
        }),
        checker({
            // e.g. use TypeScript check
            typescript: true,
        }),
        pluginTsconfigPaths(),
        pluginEslint(),
    ],
    resolve: {
        alias: {
            src: "/src",
            components: "/src/components",
        },
    },
    server: {
        open: true,
        port: 3000,
        allowedHosts: ["d1f444012e80.ngrok-free.app"],
    },
});
