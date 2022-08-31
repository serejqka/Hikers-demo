/* eslint-disable react/jsx-no-useless-fragment */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Text, Divider, Button, Loading } from '@geist-ui/core';
import init from './apiMap';
import {
  categoryThunk, selectorCategory
} from './categorySlice';
import { categoriesThunk, selectorCategories } from '../main/mainPageSlice';
import {
  placeThunk, selectorPlaces
} from './placesSlice';
import Place from './Place';

import './category.css';

export default function Category() {
  const { id } = useParams();

  const places = useSelector(selectorPlaces);
  // console.log(places);
  const allCategories = useSelector(selectorCategories);
  const categories = allCategories ? allCategories.find((el) => el.id === Number(id)) : null;

  const [load, setLoad] = useState(false);

  const dispatch = useDispatch();
  // Функция ymaps.ready() будет вызвана, когда
  // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
  useEffect(() => {
    window.scrollTo(0, 0);
    async function winFunc() {
      await window.ymaps.ready(init);
    }
    setTimeout(() => {
      const daddy = document.querySelector('#map').closest('#daddy');
      document.querySelector('#map').remove();
      const newMap = document.createElement('div');
      newMap.id = 'map';
      newMap.style.width = '100%';
      newMap.style.height = '700px';
      newMap.style.marginTop = '-40px';
      daddy.insertAdjacentElement('afterBegin', newMap);
      winFunc();
    }, 1000);
    // console.log(456789098765);
    dispatch(categoriesThunk());
    dispatch(placeThunk(id));
  }, [dispatch, id]);

  useEffect(() => {
    setTimeout(() => {
      setLoad(() => true);
    }, 1500);
  }, []);

  return (
    <>
      {!load && <Loading style={{ width: '100%', position: 'absolute', minHeight: '83vh', Height: '100%', backgroundColor: 'white' }}>Loading</Loading>}
      <div
        className={load ? 'categoriesBox' : 'bad'}
        style={{
          position: 'relative',
          minHeight: '83vh',
          maxHeight: '100%',
        }}
      >
        <div className="placeTitleBox" style={{ boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
          {categories && <h1 id={id} className="category">{categories.title}</h1>}
        </div>
        <div id="daddy">
          <div id="map" style={{ width: 500, height: 600 }} />
          <div id="placeFilter">
            <div className="placesContainer" id="placesContainer" style={{ boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}>
              {
                places &&
                places.map((place, i) => <Place key={`${i + 1}`} place={place} placeID={place.id} />)
              }
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
