import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import json from "@rollup/plugin-json";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd());
  const isStandalone = mode === "standalone"; // Define your standalone mode

  return {
    // base: env.VITE_BASE,
    base: "/",
    plugins: [
      react(),
      federation({
        name: "auth",
        filename: "remoteEntry.js",
        remotes: {
          component: `${env.VITE_COMPONENT_URL}/assets/remoteEntry.js`,
          // container: `${env.VITE_CONTAINER_URL}/assets/remoteEntry.js`,
          container: "http://localhost:4000/assets/remoteEntry.js",
        },
        exposes: {
          "./AuthApp": "./src/App.tsx",
          "./authSlice": "./src/features/auth/authSlice.ts",
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
      assetsInlineLimit: 0, // Force all assets to be emitted as files
      rollupOptions: {
        external: ["container/store"], // Add this line
        output: {
          assetFileNames: "assets/[name].[ext]",
        },
      },
    },
  };
});

