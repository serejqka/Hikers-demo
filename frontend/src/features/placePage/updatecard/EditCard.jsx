import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '@geist-ui/core';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import css from './Edit.module.css';
import { editCardThunk, openEditCard, openUpdateCard, selectorUpdateCard } from '../../profile/cardSlice';

export default function EditCard({ place }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const editCard = useSelector(selectorUpdateCard);

  const handleEdit = (event) => {
    event.preventDefault();
    const { title, description, geo } = event.target;
    const form = {
      title: title.value,
      description: description.value,
      geo: geo.value,
      id: place.id,
    };
      dispatch(editCardThunk(form));
      dispatch(openUpdateCard());
      dispatch(openEditCard());
  };

  return (
    <Modal visible={editCard} onClose={() => dispatch(openUpdateCard())}>
      <form id={css.form} onSubmit={handleEdit}>
        <h6>Название:</h6>
        <input type="text" defaultValue={place.title} name="title" required />
        <h6>Описание:</h6>
        <input type="text" defaultValue={place.description} name="description" required />
        <h6>Координаты:</h6>
        <input type="text" defaultValue={place.geo} name="geo" required />
        <button className={css.button} passive="true" type="submit">Добавить</button>
      </form>
    </Modal>
  );
}
