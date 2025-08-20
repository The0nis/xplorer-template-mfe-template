// import React from "react";
// import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from "./App";
// import ErrorBoundary from "./helper/ErrorBoundary";

// // Define the type for the mount function options
// interface MountOptions {
//   initialEntries: string[];
//   onNavigate?: (path: string) => void;
// }

// // Mount function to start up the app
// const mount = (
//   el: HTMLElement,
//   options: MountOptions = { initialEntries: ["/"] }
// ) => {
//   const root = createRoot(el);
//   console.log("Mounting app with options request:", options);
//   root.render(
//     <ErrorBoundary>
//       <App initialEntries={options.initialEntries || ["/"]} onNavigate={options.onNavigate} isStandalone={!!options.initialEntries} />
//     </ErrorBoundary>
//   );
// };

// // If we are in development and in isolation, call mount immediately
// if (process.env.NODE_ENV === "development") {
//   const devRoot = document.getElementById("_component-dev-root") as HTMLElement;

//   if (devRoot) {
//     mount(devRoot, { initialEntries: ["/"] });
//   }
// }

// // We are running through container and we should export the mount function
// export { mount };


import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import ErrorBoundary from "./helper/ErrorBoundary";

interface MountOptions {
    initialEntries: string[];
    onNavigate?: (path: string) => void;
}

const mount = (el: HTMLElement, options: MountOptions = { initialEntries: ["/"] }) => {
    const root = createRoot(el);
    root.render(
        <ErrorBoundary>
            <App initialEntries={options.initialEntries || ["/"]} onNavigate={options.onNavigate} isStandalone={!!options.initialEntries} />
        </ErrorBoundary>
    );
};

if (process.env.NODE_ENV === "development") {
    const devRoot = document.getElementById("_component-dev-root") as HTMLElement;
    if (devRoot) {
        mount(devRoot);
    }
}

export { mount };
