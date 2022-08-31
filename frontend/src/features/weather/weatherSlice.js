import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  weather: null,
};

const getCoordinate = createAsyncThunk(
  'weather/coordinate',
  async (location) => {
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&&appid=7aa47db807150d867450e03bfa107b9e`;
    const response = await fetch(url);
    const data = await response.json();
    const arrDays = [];
    for (let i = 0; i < data.list.length; i += 8) {
        arrDays.push(data.list[i]);
      }
    return arrDays;
  }
);

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCoordinate.fulfilled, (state, action) => {
        state.weather = action.payload;
      });
  }
});

export {
  getCoordinate,
};

export const selectorWeather = (state) => state.weather.weather;
export default weatherSlice.reducer;
