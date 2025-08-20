
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import { configureStore, Store } from "@reduxjs/toolkit";
import authReducer from './features/auth/authSlice';

// Define types
export interface StandaloneRootState {
    auth: ReturnType<typeof authReducer>;
}

// Create standalone store
const createStandaloneStore = () => {
    return configureStore({
        reducer: {
            auth: authReducer,
        },
    });
};

// Initialize store and root state types
let store: Store;
let RootState: any;

const initializeStore = async () => {
    try {
        // Try to import and use container store
        const containerModule = await import('container/store');
        store = containerModule.default;
        RootState = containerModule.RootState;
        console.log('Using container store');
    } catch (error) {
        // Fall back to standalone store
        store = createStandaloneStore();
        RootState = store.getState();
        console.log('Using standalone store');
    }
};

const mount = async () => {
    // Initialize store first
    await initializeStore();

    const rootElement = document.getElementById("_auth-dev-root");

    if (!rootElement) {
        console.error("Root element not found");
        return;
    }

    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <Provider store={store}>
                <App />
            </Provider>
        </React.StrictMode>
    );
};

// Handle any errors during mounting
mount().catch((error) => {
    console.error('Error mounting app:', error);
});

// Export for use in other parts of the application
export { store, RootState };
export type RootStateType = ReturnType<typeof store.getState>;