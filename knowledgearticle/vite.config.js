import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import federation from "@originjs/vite-plugin-federation";
import json from "@rollup/plugin-json";

const env = loadEnv(process.cwd(), "");

// https://vitejs.dev/config/
export default defineConfig({
  base: env.VITE_BASE,
  plugins: [
    react(),
    federation({
      name: "knowledgearticle",
      filename: "remoteEntry.js",
      remotes: {
        component: `${env.VITE_COMPONENT_URL}/assets/remoteEntry.js`,
      },
      exposes: {
        "./KnowledgearticleApp": "./src/App.tsx",
        // if main doesnt start the app try index.ts
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
  },
});
