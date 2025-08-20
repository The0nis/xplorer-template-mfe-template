import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// interface MountOptions {
//     initialEntries?: string[];
//     onNavigate?: (path: string) => void;
// }

import gensettingsReducer from "./features/genSettings/gensettingsSlice"
import { configureStore, Store } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import routingruleformSliceReducer from './features/genSettings/routingRuleSlice';

const createStandaloneStore = (): Store => {
    return configureStore({
        reducer: {
            gensettings: gensettingsReducer,
            routingRuleForm: routingruleformSliceReducer
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

    // Ensure the element with id "root" exists in your index.html
    const rootElement = document.getElementById("_gensettings-dev-root");

    if (rootElement && store) {
        ReactDOM.createRoot(rootElement).render(
            <React.StrictMode>
                <Provider store={store}>
                    <App standalone={true} />
                </Provider>
            </React.StrictMode>
        );
    } else {
        console.error("Root element not found. Make sure the element with id 'root' exists in index.html.");
    }
};

renderApp().catch(console.error);

