import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";
import AdminProductsSlice from "./admin/products-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice,
    // Add other reducers here as needed
  },
});

export default store;
