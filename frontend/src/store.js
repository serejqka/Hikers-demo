/* eslint-disable import/extensions */
import {
  configureStore
} from '@reduxjs/toolkit';
import navBarSlice from './features/main/authSlice.js';
import mainPage from './features/main/mainPageSlice.js';

import weatherSlice from './features/weather/weatherSlice.js';
import editProfileSlice from './features/profile/profileSlice.js';
import getFriendsSlice from './features/friends/friendsSlice.js';
import categorySlice from './features/Category/categorySlice.js';
import placeSlice from './features/Category/placesSlice.js';
import todoSlice from './features/todoList/todoSlice.js';
import favouritesSlice from './features/Favourites/favouritesSlice.js';
import reviewSlice from './features/placePage/reviews/reviewSlice.js';
import cardSlice from './features/profile/cardSlice.js';

const store = configureStore({
  reducer: {
    auth: navBarSlice,
    main: mainPage,
    category: categorySlice,
    places: placeSlice,
    review: reviewSlice,
    weather: weatherSlice,
    profile: editProfileSlice,
    favourites: favouritesSlice,
    todo: todoSlice,
    friends: getFriendsSlice,
    card: cardSlice,
  }
});

export default store;
