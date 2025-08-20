import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import json from "@rollup/plugin-json";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd());

  return {
    base: "/",
    plugins: [
      react(),
      federation({
        name: "gensettings",
        filename: "remoteEntry.js",
        remotes: {
          component: `${env.VITE_COMPONENT_URL}/assets/remoteEntry.js`,
          // container: "http://localhost:4000/assets/remoteEntry.js",
        },
        exposes: {
          "./genSettingsApp": "./src/App.tsx",
          "./gensettingsSlice":
            "./src/features/genSettings/gensettingsSlice.ts",
            "./routingRuleSlice":
            "./src/features/genSettings/routingRuleSlice.ts",
        },
        shared: [
          {
            react: { singleton: true },
            "react-dom": { singleton: true },
            "react-redux": { singleton: true },
            "@reduxjs/toolkit": {
              singleton: true,
            },
          },
        ],
      }),
    ],
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
      rollupOptions: {
        external: ["container/store"],
      },
    },
    optimizeDeps: {
      exclude: ["component"],
    },
    server: {
      port: env.VITE_PORT || 4015,
      strictPort: true,
      cors: true, // Enable CORS for all origins
    },
  };
});
