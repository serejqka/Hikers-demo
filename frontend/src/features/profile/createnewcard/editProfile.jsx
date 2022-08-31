import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '@geist-ui/core';
import Form from 'react-bootstrap/Form';
import css from './Edit.module.css';
import { newCardThunk, openAddNewCard, selectorAddNewCard } from '../cardSlice';

export default function NewCard() {
  const dispatch = useDispatch();
  const newCardModal = useSelector(selectorAddNewCard);

  const handleEdit = (event) => {
    event.preventDefault();
    const { title, description, geo, categoryid } = event.target;
    const form = {
      title: title.value,
      description: description.value,
      geo: geo.value,
      categoryid: Number(categoryid.value),
    };
      dispatch(newCardThunk(form));
      dispatch(openAddNewCard());
  };

  return (
    <Modal visible={newCardModal} onClose={() => dispatch(openAddNewCard())}>
      <form id={css.form} onSubmit={handleEdit}>
        <h6>Название:</h6>
        <input type="text" placeholder="Введите название" name="title" required />
        <h6>Категория:</h6>
        <Form.Select style={{ height: 55, borderRadius: 3 }} name="categoryid" aria-label="Default select example">
          <option value="1">Сноуборд</option>
          <option value="2">Рафтинг</option>
          <option value="3">Кемпинг</option>
          <option value="4">Даунхилл</option>
          <option value="5">Альпинизм</option>
          <option value="6">Хайкинг</option>
        </Form.Select>
        <h6>Описание:</h6>
        <input type="text" placeholder="Введите описание" name="description" required />
        <h6>Координаты:</h6>
        <input type="text" defaultValue="Пример(52.95323324715766,87.95602971466063)*" name="geo" required />
        <button className={css.button} passive="true" type="submit">Добавить</button>
      </form>
    </Modal>
  );
}
