import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  subscribers: null
};

// получение данных о всех юзерах и друзьях

const getFriendsThunk = createAsyncThunk(
  'profile/friends',
  async () => {
    const response = await fetch('/api/profile/friends', { method: 'GET' });
    const data = await response.json();
    console.log(data, 'THUNK');
    return data;
  }
);

// отписка от юзера в компоненте FRIENDS

const unSubscribeThunk = createAsyncThunk(
  'profile/unsubscribe',
  async ({ userId, friendId }) => {
    const response = await fetch('/api/profile/friends/unsubscribe', {
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
    console.log(data, 'UNsubscribe thunk');
  return data;
}
);

const getFriendsSlice = createSlice({
  name: 'friends',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(getFriendsThunk.fulfilled, (state, action) => {
      state.subscribers = action.payload;
    })
    .addCase(unSubscribeThunk.fulfilled, (state, action) => {
      state.subscribers = action.payload;
    });
  }
});
// allFr (7)[{…}, {…}, {…}, {…}, {…}, {…}, {…}]

export {
  getFriendsThunk,
  unSubscribeThunk,
};

export const selectorFriends = (state) => state.friends.subscribers;

export default getFriendsSlice.reducer;
