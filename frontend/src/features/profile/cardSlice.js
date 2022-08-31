import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  addNewCard: false,
  updateCard: false,
  updateStatus: false,
  updateCardBack: null
};

const newCardThunk = createAsyncThunk(
  'card/push',
  async (form) => {
    const response = await fetch('/api/card/newcard', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        form,
      })
    });
    const data = await response.json();
  }
);

const editCardThunk = createAsyncThunk(
  'card/edit',
  async (form) => {
    const response = await fetch('/api/card/edit', {
      method: 'PUT',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        form,
      })
    });
    const data = await response.json();

    return data;
  }
);

const deleteCardThunk = createAsyncThunk(
  'card/delete',
  async (id) => {
    const response = await fetch('/api/card/deletecard', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json'
      },
      body: JSON.stringify({
        id,
      })
    });
    const data = await response.json();
  }
);

const cardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    openAddNewCard: (state) => {
      state.addNewCard = !state.addNewCard;
    },
    openUpdateCard: (state) => {
      state.updateCard = !state.updateCard;
    },
    openEditCard: (state) => {
      state.updateStatus = !state.updateStatus;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(editCardThunk.fulfilled, (state, action) => {
        state.updateCardBack = action.payload;
        state.updateStatus = !state.updateStatus;
      });
    }
});

export {
  newCardThunk,
  deleteCardThunk,
  editCardThunk
};

export const selectorAddNewCard = (state) => state.card.addNewCard;
export const selectorUpdateCard = (state) => state.card.updateCard;
export const selectorUpdateStatus = (state) => state.card.updateStatus;
export const selectorUpdateCardBack = (state) => state.card.updateCardBack;

export const {
  openAddNewCard,
  openUpdateCard,
  openEditCard
} = cardSlice.actions;

export default cardSlice.reducer;
