import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore, Store } from "@reduxjs/toolkit";

// Import your local reducers
import ccmsReducer from "./features/ccms/ccmsSlice";

// Create a local store for standalone mode
const createStandaloneStore = (): Store => {
  return configureStore({
    reducer: {
      ccms: ccmsReducer,
    },
  });
};

const renderApp = async () => {
  let store;

  try {
    // Try to load the store from the container
    const storeModule = await import("container/store");
    store = storeModule.store;
  } catch (error) {
    console.warn(
      "Could not load container store, using standalone store",
      error
    );
    store = createStandaloneStore();
  }

  const rootElement = document.getElementById("_ccms-dev-root");

  if (rootElement && store) {
    ReactDOM.createRoot(rootElement).render(
      <React.StrictMode>
        <Provider store={store}>
          <App standalone={true} />
        </Provider>
      </React.StrictMode>
    );
  } else {
    console.error("Root element not found or store is undefined.");
  }
};

renderApp().catch(console.error);
