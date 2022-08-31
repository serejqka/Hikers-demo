/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal } from '@geist-ui/core';
import Form from 'react-bootstrap/Form';
import css from './Edit.module.css';
import { addPhotoProfile, editProfile, newProfile, selectorEditProfile, selectorProfile } from '../profileSlice';
import { editProfileThunk, selectorUserSession } from '../../main/authSlice';

export default function EditProfile({ id }) {
  const dispatch = useDispatch();
  const profileData = useSelector(selectorEditProfile);
  const profile = useSelector(selectorProfile);
  const userSession = useSelector(selectorUserSession);
  const handleEdit = async (event) => {
    event.preventDefault();
    const { name, email, city, favorite, link } = event.target;
    const form = {
      id,
      name: name.value,
      email: email.value,
      city: city.value,
      favorite: favorite.value,
      link: link.value
    };
      dispatch(editProfileThunk(form));
      dispatch(newProfile(userSession));
      dispatch(editProfile());
  };
  const sendFiles = async (e) => {
    try {
      const picturesData = [...e.target.files];
      const data = new FormData();
      picturesData.forEach((img) => {
        data.append('profileImg', img);
      });
      dispatch(addPhotoProfile(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal visible={profileData} onClose={() => dispatch(editProfile())}>
      <form id={css.form} onSubmit={handleEdit}>
        <h6>Имя:</h6>
        <input type="text" defaultValue={profile.user_name} name="name" required />
        <h6>email:</h6>
        <input type="email" defaultValue={profile.email} name="email" required />
        <h6>Город:</h6>
        <input type="text" defaultValue={profile.city} name="city" required />
        <h6>Активность:</h6>
        <Form.Select style={{ height: 55, borderRadius: 3 }} name="favorite" aria-label="Default select example">
          <option>{profile.favorite_cat}</option>
          <option value="Сноуборд">Сноуборд</option>
          <option value="Рафтинг">Рафтинг</option>
          <option value="Кемпинг">Кемпинг</option>
          <option value="Альпинизм">Альпинизм</option>
          <option value="Хайкинг">Хайкинг</option>
          <option value="Даунхилл">Даунхилл</option>
        </Form.Select>
        {/* <input type="text" defaultValue={profile.favorite_cat} name="favorite" /> */}
        <h6>Соцсеть:</h6>
        <input type="select" defaultValue={profile.link} name="link" />
        <h6>Фото:</h6>
        <Form.Control type="file" name="photos" onChange={sendFiles} autoComplete="off" />
        <button className={css.button} passive="true" type="submit">Изменить</button>
      </form>
    </Modal>

  );
}
