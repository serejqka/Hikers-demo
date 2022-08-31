/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import init from './apiMap';
import {
  categoryThunk, selectorCategory
} from './categorySlice';

export default function Categories() {
  const { id } = useParams();

  const categories = useSelector(selectorCategory);
  const dispatch = useDispatch();
  // Функция ymaps.ready() будет вызвана, когда
  // загрузятся все компоненты API, а также когда будет готово DOM-дерево.
  useEffect(() => {
    async function winFunc() {
      await window.ymaps.ready(init);
    }
    winFunc();
    // dispatch(categoryThunk());
  }, []);

  // console.log('na glavnoi', category);

  return (
    <>
      <h1 id={1} className="category">Все категории</h1>
      <div id="map" />

    </>
  );
}
