import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  categories: null,
};

const categoriesThunk = createAsyncThunk(
  'main/categories',
  async () => {
    const response = await fetch('/api/mainpage');

    const data = await response.json();

    return data;
  }
);

const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(categoriesThunk.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  }

});

export {
  categoriesThunk
};

export const selectorCategories = (state) => state.main.categories;

export default mainSlice.reducer;
