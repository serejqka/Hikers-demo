/* eslint-disable react/jsx-no-bind */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { Card, Text, Divider } from '@geist-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Button from 'react-bootstrap/Button';
import {
  deleteFavPlaceThunk, selectorFavourites
  // eslint-disable-next-line import/no-useless-path-segments
} from './favouritesSlice';
import TodoList from '../todoList/TodoList';

export default function FavPlaces({ favPlace }) {
  // const favPlaces = useSelector(selectorFavourites);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleDeleteClick(event) {
    const favPlaceID = {
      id: event.target.id
    };
    dispatch(deleteFavPlaceThunk(favPlaceID));
  }

  return (
    <div>
      <Card className="favDescription" id="favPhoto" onClick={() => navigate(`/categories/${favPlace['Place.category_id']}/places/${favPlace.place_id}`)}><img src={`${favPlace.photos[0]}`} alt="" /></Card>
      <Card className="favDescription" id="favDescription">
        <div className="favCardTop">
          <p className="favPlaceTitle" onClick={() => navigate(`/categories/${favPlace['Place.category_id']}/places/${favPlace.place_id}`)}>
            {favPlace && favPlace['Place.title']}
          </p>
        </div>
        <p className="favPlaceDesc">{favPlace['Place.description'] && `${favPlace['Place.description'].slice(0, 100)}......`}</p>
        <div className="favPlaceDesc">
          Рейтинг: {favPlace && favPlace['Place.rating'] ? Array.from({ length: favPlace['Place.rating'] }, (_, i) => <img key={uuidv4()} src="/images/icon/star.png" style={{ maxWidth: 25 }} alt="" />) : 'У места нет отзывов'}
        </div><br />
        <TodoList place={favPlace} />
        <Button variant="outline-secondary" id={favPlace.id} onClick={handleDeleteClick} className="delPlaceBtn">Удалить</Button>
      </Card>
    </div>
  );
}
