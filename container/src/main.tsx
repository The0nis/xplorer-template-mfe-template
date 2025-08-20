import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store, { injectReducer } from "./store";
import ErrorBoundary from "./helper/ErrorBoundary";

// Injecting reducers globally
async function addMfeReducers() {
  // Each reducer import is wrapped in its own try/catch to prevent one failure from breaking the app
  // and to log the exact error for each slice.
  try {
    let authReducer;
    try {
      authReducer = await import("auth/authSlice").then(
        (module) => module.default || module.authReducer
      );
      if (authReducer) {
        injectReducer("auth", authReducer);
        console.log("Injected authReducer");
      } else {
        console.error("auth/authSlice loaded but no reducer found.");
      }
    } catch (error) {
      console.error("Error loading auth/authSlice:", error);
    }

    let customersReducer;
    try {
      customersReducer = await import("customers/accountSlice").then(
        (module) => module.default || module.authReducer
      );
      if (customersReducer) {
        injectReducer("account", customersReducer);
        console.log("Injected customersReducer");
      } else {
        console.error("customers/accountSlice loaded but no reducer found.");
      }
    } catch (error) {
      console.error("Error loading customers/accountSlice:", error);
    }

    let casesReducer;
    try {
      casesReducer = await import("cases/caseSlice").then(
        (module) => module.default || module.casesReducer
      );
      if (casesReducer) {
        injectReducer("case", casesReducer);
        console.log("Injected casesReducer");
      } else {
        console.error("cases/caseSlice loaded but no reducer found.");
      }
    } catch (error) {
      console.error("Error loading cases/caseSlice:", error);
    }

    let activityReducer;
    try {
      activityReducer = await import("activities/activitySlice").then(
        (module) => module.default || module.activityReducer
      );
      if (activityReducer) {
        injectReducer("activity", activityReducer);
        console.log("Injected activityReducer");
      } else {
        console.error("activities/activitySlice loaded but no reducer found.");
      }
    } catch (error) {
      console.error("Error loading activities/activitySlice:", error);
    }

    let ccmsReducer;
    try {
      ccmsReducer = await import("ccms/ccmsSlice").then(
        (module) => module.default || module.ccmsReducer
      );
      if (ccmsReducer) {
        injectReducer("ccms", ccmsReducer);
        console.log("Injected ccmsReducer");
      } else {
        console.error("ccms/ccmsSlice loaded but no reducer found.");
      }
    } catch (error) {
      console.error("Error loading ccms/ccmsSlice:", error);
    }

    let dashboardReducer;
    try {
      dashboardReducer = await import("dashboard/dashboardSlice").then(
        (module) => module.default || module.dashboardReducer
      );
      if (dashboardReducer) {
        injectReducer("dashboard", dashboardReducer);
        console.log("Injected dashboardReducer");
      } else {
        console.error("dashboard/dashboardSlice loaded but no reducer found.");
      }
    } catch (error) {
      console.error("Error loading dashboard/dashboardSlice:", error);
    }

    let casestructureReducer;
    try {
      casestructureReducer = await import("casestructure/caseStructureSlice").then(
        (module) => module.default || module.casestructureReducer
      );
      if (casestructureReducer) {
        injectReducer("casestructure", casestructureReducer);
        console.log("Injected casestructureReducer");
      } else {
        console.error("casestructure/caseStructureSlice loaded but no reducer found.");
      }
    } catch (error) {
      console.error("Error loading casestructure/caseStructureSlice:", error);
    }

    let gensettingsReducer;
    try {
      console.log("injecting gensettingsReducer");
      gensettingsReducer = await import("gensettings/gensettingsSlice").then(
        module => module.default || module.gensettingsReducer
      );
      if (gensettingsReducer) {
        injectReducer("gensettings", gensettingsReducer);
        console.log("Injected gensettingsReducer");
      } else {
        console.error("gensettings/gensettingsSlice loaded but no reducer found.");
      }
    } catch (error) {
      console.error("Error loading gensettings/gensettingsSlice:", error);
    }

    let routingRulesReducer;
    try {
      console.log("injecting routingRulesReducer");
      routingRulesReducer = await import("gensettings/routingRuleSlice").then(
        (module) => module.default || module.routingRuleReducer
      );

      if (routingRulesReducer) {
        injectReducer("routingRuleForm", routingRulesReducer);
        console.log("Injected routingRulesReducer");
      } else {
        console.error("gensettings/routingRuleSlice loaded but no reducer found.");
      }
    } catch (error) {
      console.error("Error loading gensettings/routingRuleSlice:", error);
    }


    try {
      const userManagmtReducer = await import("usermanagement/usermanagtSlice").then(
        (module) => {
          console.log("Received module:", module);
          return module.default || module.usermanagtReducer;
        }
      );
      if (userManagmtReducer) {
        injectReducer("usermanagement", userManagmtReducer);
        console.log("Injected userManagmtReducer");
      } else {
        console.error("usermanagement/usermanagtSlice loaded but no reducer found.");
      }
    } catch (error) {
      console.error("Error loading usermanagement/usermanagtSlice:", error);
    }

  } catch (error) {
    // This should rarely be hit, as all imports are individually wrapped
    console.error("Unexpected error in addMfeReducers:", error);
  }
}

// Dynamically add the reducers before rendering
addMfeReducers().then(() => {
  // Get the root element and ensure it is not null
  const rootElement = document.getElementById("root") as HTMLElement;

  if (rootElement) {
    ReactDOM.createRoot(rootElement).render(
      <ErrorBoundary>
        <Provider store={store}>
          <App />
        </Provider>
      </ErrorBoundary>
    );
  } else {
    console.error(
      "Root element not found. Make sure the element with id 'root' exists in index.html."
    );
  }
});



// import React from "react";
// import ReactDOM from "react-dom/client";
// import { Provider } from "react-redux";
// import App from "./App";
// import store, { injectReducer } from "./store";
// import ErrorBoundary from "./helper/ErrorBoundary";
// import "./index.css";

// // Define the structure for MFE reducer configurations
// interface MfeReducerConfig {
//   name: string;
//   remoteModule: string;
//   reducerKey: string;
// }

// // Configuration for all MFE reducers
// const mfeReducers: MfeReducerConfig[] = [
//   { name: "Auth", remoteModule: "auth/authSlice", reducerKey: "auth" },
//   { name: "Customers", remoteModule: "customers/accountSlice", reducerKey: "account" },
//   { name: "Cases", remoteModule: "cases/caseSlice", reducerKey: "case" },
//   { name: "Activities", remoteModule: "activities/activitySlice", reducerKey: "activity" },
//   { name: "CCMS", remoteModule: "ccms/ccmsSlice", reducerKey: "ccms" },
//   { name: "Dashboard", remoteModule: "dashboard/dashboardSlice", reducerKey: "dashboard" },
//   { name: "Settings", remoteModule: "settings/settingsSlice", reducerKey: "settings" },
//   { name: "User Management", remoteModule: "usermanagement/usermanagtSlice", reducerKey: "usermanagt" }
// ];

// // Helper function to import and inject a single reducer
// async function importAndInjectReducer(config: MfeReducerConfig): Promise<void> {
//   try {
//     // Using @vite-plugin-federation dynamic import syntax
//     const module = await import(/* @vite-ignore */ config.remoteModule);
//     const reducer = module.default || module[`${config.reducerKey}Reducer`];

//     if (reducer) {
//       console.log(`Injecting ${config.name} reducer...`);
//       injectReducer(config.reducerKey, reducer);
//     } else {
//       console.error(`Failed to load the ${config.name} reducer from the ${config.name} MFE.`);
//     }
//   } catch (error) {
//     console.error(`Error loading ${config.name} reducer:`, error);
//     // Continue with other reducers even if one fails
//   }
// }

// // Main function to add all MFE reducers
// async function addMfeReducers(): Promise<void> {
//   // Load reducers sequentially to ensure proper initialization
//   for (const config of mfeReducers) {
//     await importAndInjectReducer(config);
//   }
// }

// // Initialize the application
// async function initializeApp(): Promise<void> {
//   // Ensure Vite MFE modules are loaded before initialization
//   // @ts-ignore - Vite federation types
//   await __federation_method_ensure();

//   await addMfeReducers();

//   const rootElement = document.getElementById("root");

//   if (!rootElement) {
//     throw new Error("Root element not found. Make sure the element with id 'root' exists in index.html.");
//   }

//   ReactDOM.createRoot(rootElement).render(
//     <ErrorBoundary>
//       <Provider store={store}>
//         <App />
//       </Provider>
//     </ErrorBoundary>
//   );
// }

// // Start the application
// initializeApp().catch(error => {
//   console.error('Failed to initialize application:', error);
// });