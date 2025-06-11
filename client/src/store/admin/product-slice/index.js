import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isLoading: false,
  productList: [],
};

export const addNewProduct = createAsyncThunk(
  "/products/addnewproduct",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:4000/api/admin/products/add",
      formData,
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );

    return result?.data;
  }
);

export const fetchAllProduct = createAsyncThunk(
  "/products/fetchAllproduct",
  async () => {
    const result = await axios.get(
      "http://localhost:4000/api/admin/products/get"
    );

    return result?.data;
  }
);

export const editProduct = createAsyncThunk(
  "/products/editproduct",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:4000/api/admin/products/edit/${id}`,
      formData,
      {
        headers: {
          "Content-type": "application/json",
        },
        withCredentials: true,
      }
    );

    return result?.data;
  }
);
export const deleteProduct = createAsyncThunk(
  "/products/deleteproduct",
  async (id) => {
    const result = await axios.post(
      `http://localhost:4000/api/admin/products/delete/${id}`
    );

    return result?.data;
  }
);

const adminProductsSlice = createSlice({
  name: "adminProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProduct.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchAllProduct.fulfilled, (state, action) => {
        console.log(action.payload);
        state.isLoading = false;
        state.productList = action.payload;
      })
      .addCase(fetchAllProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.productList = [];
      });
  },
});

export default adminProductsSlice.reducer;
