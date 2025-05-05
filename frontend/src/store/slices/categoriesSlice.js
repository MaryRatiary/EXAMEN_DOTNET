import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { categoriesAPI } from '../../services/api';

// Async thunks
export const fetchCategories = createAsyncThunk(
  'categories/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      const response = await categoriesAPI.getAll();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors du chargement des catégories');
    }
  }
);

export const fetchCategoryProducts = createAsyncThunk(
  'categories/fetchProducts',
  async (categoryId, { rejectWithValue }) => {
    try {
      const response = await categoriesAPI.getProducts(categoryId);
      return { categoryId, products: response.data };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Erreur lors du chargement des produits');
    }
  }
);

const categoriesSlice = createSlice({
  name: 'categories',
  initialState: {
    items: [],
    categoryProducts: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handle fetchCategories
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      })
      // Handle fetchCategoryProducts
      .addCase(fetchCategoryProducts.fulfilled, (state, action) => {
        const { categoryId, products } = action.payload;
        state.categoryProducts[categoryId] = products;
      });
  },
});

export default categoriesSlice.reducer;