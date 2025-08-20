import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import json from "@rollup/plugin-json";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd());

  return {
    // base: env.VITE_BASE,
    base: env.VITE_BASE,
    plugins: [
      react(),
      federation({
        name: "usermanagement",
        filename: "remoteEntry.js",
        remotes: {
          component: `${env.VITE_COMPONENT_URL}/assets/remoteEntry.js`,
          container: "http://localhost:4000/assets/remoteEntry.js",
        },
        exposes: {
          "./userManagementApp": "./src/App.tsx",
          "./usermanagtSlice": "./src/features/settings/userManagementSlice.ts",
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
  };
});
