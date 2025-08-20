import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

interface MountOptions {
    initialEntries?: string[];
    onNavigate?: (path: string) => void;
}

// Ensure the element with id "root" exists in your index.html
const rootElement = document.getElementById("_knowledgearticle-dev-root");

if (rootElement) {
    // Create a root and render the App component inside it
    ReactDOM.createRoot(rootElement).render(
        <React.StrictMode>
            <App standalone={true} />
        </React.StrictMode>
    );
} else {
    console.error("Root element not found. Make sure the element with id 'root' exists in index.html.");
}