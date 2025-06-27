import axios from "axios";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  categoryList: [],
};

export const addNewCategory = createAsyncThunk(
  "/categories/addNewcCategory",
  async (formData) => {
    const result = await axios.post(
      "http://localhost:4000/api/admin/categories/add",
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
export const fetchAllCategories = createAsyncThunk(
  "/categories/fetchAllCategories",
  async () => {
    const result = await axios.get(
      "http://localhost:4000/api/admin/categories/get"
    );
    return result?.data;
  }
);
export const editCategory = createAsyncThunk(
  "/categories/editCategory",
  async ({ id, formData }) => {
    const result = await axios.put(
      `http://localhost:4000/api/admin/categories/edit/${id}`,
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
export const deleteCategory = createAsyncThunk(
  "/categories/deleteCategory",
  async (id) => {
    const result = await axios.delete(
      `http://localhost:4000/api/admin/categories/delete/${id}`
    );
    return result?.data;
  }
);

const AdminCategorySlice = createSlice({
  name: "adminCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCategories.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchAllCategories.fulfilled, (state, action) => {
        state.isLoading = false;
        state.categoryList = action.payload.data;
      })
      .addCase(fetchAllCategories.rejected, (state, action) => {
        state.isLoading = false;
        state.categoryList = [];
      });
  },
});

export default AdminCategorySlice.reducer;
