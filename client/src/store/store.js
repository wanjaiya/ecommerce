import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice/index.js";
import AdminProductsSlice from "./admin/products-slice";
import AdminCategorySlice from "./admin/category-slice";
import ShopProductsSlice from "./shop/products-slice";
import AdminBrandSlice from "./admin/brand-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    adminProducts: AdminProductsSlice,
    adminCategories: AdminCategorySlice,
    adminBrands: AdminBrandSlice,
    shopProducts: ShopProductsSlice,
    // Add other reducers here as needed
  },
});

export default store;
