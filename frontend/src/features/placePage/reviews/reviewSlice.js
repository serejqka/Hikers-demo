import {
  createSlice,
  createAsyncThunk
} from '@reduxjs/toolkit';

const initialState = {
  reviewList: [],
  reviewPhoto: [],
  photo: [],
  error: [],
};

// экспорт санок для загрузки списка всех отзывов
export const loadReview = createAsyncThunk(
  'review/loadReview',
  async (id) => {
    const response = await fetch(`/api/place/${id}/review`);
    const data = await response.json();
    if (data.status) {
      const {
        error
      } = await data.json();
      throw error;
    } else {
      return data;
    }
  }
);

// экспорт санок для добавления отзыва
export const addReview = createAsyncThunk(
  'review/addReview',
  async (valueForm) => {
    const response = await fetch(`/api/place/${valueForm.placeId}/review`, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        valueForm
      })
    });
    const data = await response.json();
    return data;
  }
);

// санки для отправки фото
export const addPhoto = createAsyncThunk(
  'review/addPhotoReview',
  async (photos) => {
    const response = await fetch('/api/place/photo', {
      method: 'POST',
      body: photos
    });
    const data = await response.json();
    return data;
  }
);

const reviewSlice = createSlice({
  name: 'review',
  initialState,
  reducers: {
    // loadReview: (state, action) => {
    //   const newReview = action.payload;
    //   state.reviewList = newReview;
    // }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadReview.fulfilled, (state, action) => {
        state.reviewList = action.payload.review;
        state.reviewPhoto = action.payload.photos;
      })
      .addCase(loadReview.rejected, (state, action) => {
        state.error = action.error.message;
      })
      .addCase(addReview.fulfilled, (state, action) => {
        state.reviewList.unshift(action.payload.review);
        if (Array.isArray(action.payload.photos)) {
          action.payload.photos.map((photo) => state.reviewPhoto.push(photo));
        } else state.reviewPhoto.push(action.payload.photos);
      })
      .addCase(addPhoto.fulfilled, (state, action) => {
        state.photo = action.payload;
      });
  }
});

// экспорт функции селектора
export const selectReview = (state) => state.review.reviewList;
export const selectReviewPhoto = (state) => state.review.reviewPhoto;
export const selectPhoto = (state) => state.review.photo;

// экспорт функции редьюсера
export default reviewSlice.reducer;
