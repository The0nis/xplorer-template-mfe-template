import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore, Action, Store } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";

import accountReducer from "./features/account/accountSlice";

const createStandaloneStore = (): Store => {
  return configureStore({
    reducer: {
      account: accountReducer,
    },
  });
};

const renderApp = async () => {
  let store: Store;

  try {
    // Dynamically import container store
    const storeModule = await import('container/store');
    store = storeModule.default || storeModule.store;
  } catch (error) {
    console.warn('Could not load container store, using standalone store', error);
    store = createStandaloneStore();
  }

  const rootElement = document.getElementById("_customers-dev-root");

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