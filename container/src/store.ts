import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import counterSlice from "./features/counter/counterSlice";

// Static reducers that are always present
const staticReducers = {
  // counter: counterSlice,
};

// Object to hold async (dynamically injected) reducers
let asyncReducers: Record<string, any> = {};

// Function to create the root reducer by combining static and async reducers
const createReducer = () => {
  console.log("Creating root reducer with:", {
    ...staticReducers,
    ...asyncReducers,
  });
  return combineReducers({
    ...staticReducers,
    ...asyncReducers,
  });
};

// Configure the store with the initial static reducers
const store = configureStore({
  reducer: createReducer(),
});

// Function to inject a new async reducer dynamically
export const injectReducer = (key: string, asyncReducer: any) => {
  if (!asyncReducers[key]) {
    console.log(`Injecting async reducer: ${key}`);
    asyncReducers[key] = asyncReducer; // Add the async reducer
    store.replaceReducer(createReducer()); // Replace the store's reducer with the updated one
  } else {
    console.log(`Reducer ${key} already exists.`);
  }
};

// Export types for usage in the app
export type StaticRootState = ReturnType<typeof store.getState>;
export type RootState = StaticRootState & {
  [key: string]: any; // Allows dynamic reducer injection
};
export type AppDispatch = typeof store.dispatch;

export default store;