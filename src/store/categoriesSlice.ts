
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Category } from '../types/todo';
import { api } from '../api';
import { toast } from 'sonner';

interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const response = await api.getCategories();
  return response;
});

export const addCategoryAsync = createAsyncThunk('categories/addCategory', async (category: Omit<Category, 'id'>) => {
  const response = await api.createCategory(category);
  return response;
});

export const deleteCategoryAsync = createAsyncThunk('categories/deleteCategory', async (id: string) => {
  await api.deleteCategory(id);
  return id;
});

const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch categories';
        toast.error(state.error);
      })
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.items.push(action.payload);
        toast.success('Category added successfully');
      })
      .addCase(deleteCategoryAsync.fulfilled, (state, action) => {
        state.items = state.items.filter((category) => category.id !== action.payload);
        toast.success('Category deleted successfully');
      });
  },
});

export default categoriesSlice.reducer;
