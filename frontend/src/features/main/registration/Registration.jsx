import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Modal, Card, Text } from '@geist-ui/core';
import { useNavigate } from 'react-router-dom';
import css from './Reg.module.css';
import {
  authRegistration,
  booleanAuthReg,
  errorAuthReg,
  selectorAuthReg,
  selectorAuthRegError
} from '../authSlice';

export default function Registration() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector(selectorAuthReg);
  const authError = useSelector(selectorAuthRegError);

  const handlerModal = (event) => {
    event.preventDefault();
    const { login, email, password, password2 } = event.target;

    const form = {
      login: login.value,
      email: email.value,
      password: password.value,
      password2: password2.value,
    };

    dispatch(authRegistration(form));
    navigate('/');
  };

  return (
    <Modal visible={auth} onClose={() => dispatch(booleanAuthReg())}>
      <form id={css.form} onSubmit={handlerModal}>
        <div className={authError ? css.authError : css.auth}>Регистрация</div>
        {authError && (
          <Card width="100%" type={`${'error'}`} className={css.error}>
            <Text>{authError}</Text>
          </Card>
      )}
        <input type="text" name="login" defaultValue={`${''}`} placeholder="Введите имя" onChange={() => dispatch(errorAuthReg())} required />
        <input type="email" name="email" placeholder="Введите почту" onChange={() => dispatch(errorAuthReg())} required />
        <input type="password" name="password" placeholder="Введите пароль" onChange={() => dispatch(errorAuthReg())} required />
        <input type="password" name="password2" placeholder="Подтвердите пароль" onChange={() => dispatch(errorAuthReg())} required />
        {/* <Modal.Action>Войти</Modal.Action> */}
        <button className={css.button} passive="true" type="submit">Регистрация</button>
      </form>
    </Modal>
  );
}
