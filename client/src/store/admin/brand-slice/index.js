import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  brandList: [],
};

export const addNewBrand = createAsyncThunk(
  "/brands/addNewcBrand",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:4000/api/admin/brands/add",
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);
export const fetchAllBrands = createAsyncThunk(
  "/brands/fetchAllbrands",
  async () => {
    const result = await axios.get(
      "http://localhost:4000/api/admin/brands/get"
    );
    return result?.data;
  }
);
export const editBrand = createAsyncThunk(
  "/brands/editBrand",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:4000/api/admin/brands/edit/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return result?.data;
  }
);
export const deleteBrand = createAsyncThunk(
  "/brands/deleteBrand",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:4000/api/admin/brands/delete/${id}`
    );
    return result?.data;
  }
);

const AdminBrandSlice = createSlice({
  name: "adminBrand",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllBrands.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brandList = action.payload.data;
      })
      .addCase(fetchAllBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.brandList = [];
      });
  },
});

export default AdminBrandSlice.reducer;
