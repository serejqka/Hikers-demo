import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import {
  favouritesThunk, selectorFavourites
  // eslint-disable-next-line import/no-useless-path-segments
} from './favouritesSlice';
// eslint-disable-next-line import/extensions
import FavPlace from './favPlace.jsx';
import './favourites.css';

export default function Favourites() {
  const dispatch = useDispatch();
  const favPlaces = useSelector(selectorFavourites);

  // console.log('favourites', favPlaces);

  useEffect(() => {
    dispatch(favouritesThunk());
  }, [dispatch]);

  return (
    <div
      className="favouritesBox"
      style={{
        position: 'relative',
        minHeight: '83vh',
        maxHeight: '100%',
        marginBottom: '100px'
      }}
    >
      <h1>Избранное</h1>
      {
        favPlaces &&
        favPlaces.map((favPlace, i) => <FavPlace key={uuidv4()} favPlace={favPlace} />)
      }
    </div>
  );
}
