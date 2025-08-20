import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd());

  return {
    // base: env.VITE_BASE,
    base: "/",
    plugins: [
      react(),
      federation({
        name: "dashboard",
        filename: "remoteEntry.js",
        remotes: {
          component: `${env.VITE_COMPONENT_URL}/assets/remoteEntry.js`,
        },
        exposes: {
          "./DashboardApp": "./src/App.tsx",
          "./dashboardSlice": "./src/features/dashboard/dashboardSlice.ts",
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
      port: env.VITE_PORT || 4002,
      strictPort: true,
      cors: true, // Enable CORS for all origins
    },
  };
});
