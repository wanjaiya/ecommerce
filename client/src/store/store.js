import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Add other reducers here as needed
  },
});

export default store;
