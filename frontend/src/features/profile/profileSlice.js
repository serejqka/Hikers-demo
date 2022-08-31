import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  edit: false,
  profile: [],
  friends: [],
};

// получение данных пользователя

const getProfileThunk = createAsyncThunk(
  'profile/edit',
  async (id) => {
    const response = await fetch(`/api/profile/${id}`, {
      method: 'POST',
    });
    const data = await response.json();
    return data;
  }
  );

// получение списка всех подписок/подписчиков

const getSubscribeThunk = createAsyncThunk(
  'profile/subscribe',
  async () => {
    const response = await fetch('/api/profile/subscribe', { method: 'GET' });
    const data = await response.json();
    return data;
  }
  );

  // добавление подписки в базу

  const subscribeThunk = createAsyncThunk(
    'profile/friends',
    async ({ userId, friendId }) => {
      const response = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'Application/json'
        },
        body: JSON.stringify({
          userId,
          friendId,
        })
      });
      const data = await response.json();
      // console.log(data, 'subscribe thunk');
    return data;
  }
);

// отправка фото

export const addPhotoProfile = createAsyncThunk(
  'profile/addPhotoProfile',
  async (photos) => {
    const response = await fetch('/api/profile/photo', {
      method: 'PUT',
      body: photos
    });
    const data = await response.json();
    return data;
  }
);

const editProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    editProfile: (state) => {
      state.edit = !state.edit;
    },
    newProfile: (state, action) => {
      state.profile = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileThunk.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(addPhotoProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
      })
      .addCase(getSubscribeThunk.fulfilled, (state, action) => {
        state.friends = action.payload;
      })
      .addCase(subscribeThunk.fulfilled, (state, action) => {
        state.friends = action.payload;
      });
  }
});

export {
  getProfileThunk,
  getSubscribeThunk,
  subscribeThunk,
};

export const selectorEditProfile = (state) => state.profile.edit;
export const selectorProfile = (state) => state.profile.profile;
export const selectorFriends = (state) => state.profile.friends;

export const {
  editProfile,
  newProfile,
} = editProfileSlice.actions;

export default editProfileSlice.reducer;
