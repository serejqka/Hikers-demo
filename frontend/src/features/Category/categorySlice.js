import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';

const initialState = {
  categoryState: [],
};

const categoryThunk = createAsyncThunk(
  'choose/category',
  async (id) => {
    const response = await fetch(`/api/categories/${id}`);
    const data = await response.json();
    // console.log('data', data);
    return data;
    // if (data.status >= 400) {
    //   const {
    //     error
    //   } = await data.json();
    //   throw error;
    // } else {
    //   return console.log(data.json());
    // }
  },
);

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {

  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryThunk.fulfilled, (state, action) => {
        // console.log('payload', action.payload);
        state.categoryState = action.payload;
      });
  }
});

export {
  categoryThunk
};

export const selectorCategory = (state) => state.category.categoryState;

// экспорт reducer'a
export default categorySlice.reducer;
