import { defineConfig, loadEnv } from "vite";
import federation from "@originjs/vite-plugin-federation";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd());

  return {
    base: "/",
    plugins: [
      react(),
      federation({
        name: "container",
        filename: "remoteEntry.js",
        exposes: {
          "./store": "./src/store.ts", // Expose the store module
        },
        remotes: {
          customers: `${env.VITE_CUSTOMERS_URL}/assets/remoteEntry.js`,
          dashboard: `${env.VITE_DASHBOARD_URL}/assets/remoteEntry.js`,
          request: `${env.VITE_REQUEST_URL}/assets/remoteEntry.js`,
          auth: `${env.VITE_AUTH_URL}/assets/remoteEntry.js`,
          // auth: `http://localhost:4004/assets/remoteEntry.js`,
          cases: `${env.VITE_CASES_URL}/assets/remoteEntry.js`,
          services: `${env.VITE_SERVICES_URL}/assets/remoteEntry.js`,
          activities: `${env.VITE_ACTIVITIES_URL}/assets/remoteEntry.js`,
          transactions: `${env.VITE_TRANSACTIONS_URL}/remoteEntry.js`,
          bvn: `${env.VITE_BVN_URL}/remoteEntry.js`,
          accountstatement: `${env.VITE_ACCOUNT_STATEMENT_URL}/assets/remoteEntry.js`,
          knowledgearticle: `${env.VITE_KNOWLEDGE_ARTICLE_URL}/assets/remoteEntry.js`,
          ccms: `${env.VITE_CCMS_URL}/assets/remoteEntry.js`,
          component: `${env.VITE_COMPONENT_URL}/assets/remoteEntry.js`,
          settings: `${env.VITE_SETTINGS_URL}/assets/remoteEntry.js`,
          usermanagement: `${env.VITE_USERMANAGT_URL}/assets/remoteEntry.js`,
          casestructure: `${env.VITE_CASESTRUCTURE_URL}/assets/remoteEntry.js`,
          gensettings: `${env.VITE_GENSET_URL}/assets/remoteEntry.js`,
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
  };
});

