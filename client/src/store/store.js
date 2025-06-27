import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";
import AdminProductsSlice from "./admin/products-slice";
import AdminCategorySlice from "./admin/category-slice";
import ShopProductsSlice from "./shop/products-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice,
    adminCategories: AdminCategorySlice,
    shopProducts: ShopProductsSlice,
    // Add other reducers here as needed
  },
});

export default store;
