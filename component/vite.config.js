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
        name: "component",
        filename: "remoteEntry.js",
        exposes: {
          "./Button": "./src/components/button/Button",
          "./Input": "./src/components/input/Input",
          "./Tabs": "./src/components/tab/Tabs",
          "./Tab": "./src/components/tab/Tab",
          "./Table": "./src/components/table/Table",
          "./ProgressBar": "./src/components/progress/ProgressBar",
          "./Card": "./src/components/card/Card",
          "./DoughnutChart": "./src/components/charts/DoughnutChart",
          "./Modal": "./src/components/modal/Modal",
          "./Loader": "./src/components/loader/Loader",
          "./CustomDatePicker":
            "./src/components/date_picker/DatePickerComponent",
             "./CustomDateTimePicker":
            "./src/components/date_picker/DateTimePickerComponent",
          "./SelectDropdown": "./src/components/dropdown/SelectDropdown",
          "./FullPageLoader": "./src/components/loader/FullPageLoader",
          "./InputAsync": "./src/components/input/InputAsync",
          "./CustomLoader": "./src/components/custom_loader/CustomLoader",
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
    server: {
      port: env.VITE_PORT,
      strictPort: true,
      cors: true, // Enable CORS for all origins
    },
    build: {
      modulePreload: false,
      target: "esnext",
      minify: false,
      cssCodeSplit: false,
    },
  };
});
