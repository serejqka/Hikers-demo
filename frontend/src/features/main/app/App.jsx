import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Provider, useDispatch } from 'react-redux';
import Category from '../../Category/Category';
import './App.css';
import MainPage from '../MainPage';
import Navbar from '../navbar/Navbar';
import PlacePage from '../../placePage/PlacePage';
import Registration from '../registration/Registration';
import Login from '../login/Login';
import { categoriesThunk } from '../mainPageSlice';
import { auth } from '../authSlice';
import store from '../../../store';
import TodoList from '../../todoList/TodoList';
import Profile from '../../profile/Profile';
import Favourites from '../../Favourites/Favourites';
import Footer from '../footer/Footer';
import init from '../../Category/apiMap';
import Chat from '../../chat/Chat';
import Friends from '../../friends/Friends';
import Subscribers from '../../friends/Subscribers';
import { getFriendsThunk } from '../../friends/friendsSlice';
import Users from '../../users/Users';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(auth());
    dispatch(categoriesThunk());
    dispatch(getFriendsThunk());
  }, [dispatch]);

  useEffect(() => {
    async function winFunc() {
      await window.ymaps.ready(init);
    }
    winFunc();
    dispatch(categoriesThunk());
  }, [dispatch]);

  return (
    <Provider store={store}>
      <Navbar />
      <Routes>
        <Route>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/categories/:id" element={<Category />} />
          <Route path="/categories/:id/places/:placeid" element={<PlacePage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/categories/:id/places/:placeid/todo" element={<TodoList />} />
          <Route path="/profile/:id/chat" element={<Chat />} />
          <Route path="/profile/:id/friends" element={<Friends />} />
          <Route path="/profile/:id/subscribers" element={<Subscribers />} />
          <Route path="/users" element={<Users />} />
        </Route>
      </Routes>
      <Footer />
    </Provider>
  );
}

export default App;
