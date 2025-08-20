import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
// import store from "./redux/store";
import App from "./App";
import "./index.css";

import { configureStore, Store } from "@reduxjs/toolkit";

import usermanagtReducer from "./features/settings/userManagementSlice"

const createStandaloneStore = (): Store => {
  return configureStore({
    reducer: {
      usermanagt: usermanagtReducer,
    },
  });
};

const renderApp = async () => {
  let store; 

  try {
    // Try to load the store from the container
    const storeModule = await import("container/store");
    store = storeModule.default || storeModule.store;
    console.log("Store loaded from container successfully.", store, storeModule);
  } catch (error) {
    console.warn(
      "Could not load container store, using standalone store",
      error
    );
    store = createStandaloneStore();
    console.log("Standalone store created.");
  }

  if (store) {
    console.log("Store structure:", store.getState());
    // Should show { usermanagt: ... } when using container store
  }

  const rootElement = document.getElementById("_usermanagement-dev-root");

  if (rootElement && store) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <Provider store={store}>
          <App />
        </Provider>
      </React.StrictMode>
    );
  } else {
    console.error("Root element not found or store is undefined.");
  }
};

renderApp().catch((error) => {
  console.error("Failed to render app:", error);
});

