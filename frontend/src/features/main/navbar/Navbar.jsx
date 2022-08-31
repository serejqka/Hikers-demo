/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { ButtonDropdown, Loading, Spacer } from '@geist-ui/core';
import css from './Navbar.module.css';
import {
  selectorAuthLogin,
  booleanAuthLogin,
  authLogOut,
  selectorUserSession,
  selectorAuthReg,
  booleanAuthReg
} from '../authSlice';
import Login from '../login/Login';
import Registration from '../registration/Registration';
import { selectorCategories } from '../mainPageSlice';
import { getProfileThunk } from '../../profile/profileSlice';

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const url = window.location.href.slice(-13);

  const userSession = useSelector(selectorUserSession);
  const authLogin = useSelector(selectorAuthLogin);
  const authRegistration = useSelector(selectorAuthReg);
  const categories = useSelector(selectorCategories);

  const [getCat, setGetCat] = useState(null);

  useEffect(() => {
    const id = window.location.href.slice(-1);
    if (url === `/categories/${Number(id)}`) setGetCat(Number(id));
  }, [url]);

  if (!categories) return <div />;

  return (
    <div>
      {userSession ? (
        <nav id={css.navbar}>
          <div className={css.left}>
            <Spacer w={1} />
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setGetCat(null);
                navigate('/');
              }}
            ><img src="/images/icon/Hikers_logo.png" alt="logo" style={{ maxHeight: 60 }} />
            </div>
          </div>
          <div className={css.categoryMain}>
            {categories.map((icon, i) => (
              <img
                id={icon.id}
                key={`mainPhotoImgIcon${icon.id}`}
                onClick={(e) => {
                  setGetCat(Number(e.target.id));
                  navigate(`/categories/${Number(e.target.id)}`);
                }}
                className={url !== `/categories/${icon.id}`
                ? css.iconCategory
                : icon.id === getCat
                ? `${css.iconCategory} ${css.iconCategoryTake}`
                : css.iconCategory}
                src={`/images/icon/${icon.icon}`}
                alt={icon.icon}
              />
              )
            )}
          </div>
          <div className={css.right}>
            <div className={css.userName}>
              <ButtonDropdown
                type="secondary"
                scale={0.5}
              >
                <ButtonDropdown.Item
                  style={{ fontSize: 12, padding: 5 }}
                  onClick={() => {
                    dispatch(getProfileThunk(userSession.id));
                    setTimeout(() => {
                      navigate(`/profile/${userSession.id}`);
                    }, 1000);
                  }}
                  main
                >{userSession.user_name}
                </ButtonDropdown.Item>
                <ButtonDropdown.Item
                  style={{ fontSize: 12, padding: 5 }}
                  onClick={() => {
                    dispatch(getProfileThunk(userSession.id));
                    setTimeout(() => {
                      navigate(`/profile/${userSession.id}`);
                    }, 1000);
                  }}
                >Личный кабинет
                </ButtonDropdown.Item>

                <ButtonDropdown.Item
                  style={{ fontSize: 12, padding: 5 }}
                  onClick={() => navigate('/users')}
                >Пользователи
                </ButtonDropdown.Item>

                <ButtonDropdown.Item
                  style={{ fontSize: 12, padding: 5 }}
                  onClick={() => navigate('/favourites')}
                >Избранное
                </ButtonDropdown.Item>

                <ButtonDropdown.Item
                  style={{ fontSize: 12, padding: 5 }}
                  onClick={() => navigate(`/profile/${userSession.id}/friends`)}
                >Мои подписки
                </ButtonDropdown.Item>
                <ButtonDropdown.Item
                  style={{ fontSize: 12, padding: 5 }}
                  onClick={() => navigate(`/profile/${userSession.id}/subscribers`)}
                >Мои подписчики
                </ButtonDropdown.Item>
                <ButtonDropdown.Item
                  style={{ fontSize: 12, padding: 5 }}
                  onClick={() => navigate(`/profile/${userSession.id}/chat`)}
                >Сообщения
                </ButtonDropdown.Item>
                <ButtonDropdown.Item
                  style={{ fontSize: 12, padding: 5 }}
                  onClick={() => {
                    dispatch(authLogOut());
                    navigate('/');
                  }}
                >Выйти
                </ButtonDropdown.Item>
              </ButtonDropdown>
            </div>
          </div>
        </nav>
    )
    : (
      <nav id={css.navbar}>
        <div className={css.left}>
          <Spacer w={1} />
          <div
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setGetCat(null);
              navigate('/');
            }}
          ><img src="/images/icon/Hikers_logo.png" alt="logo" style={{ maxHeight: 60 }} />
          </div>
        </div>
        <div className={css.categoryMain}>
          {categories.map((icon, i) => (
            <img
              id={icon.id}
              key={`mainPhotoImgIcon${icon.id}`}
              onClick={(e) => {
                  setGetCat(Number(e.target.id));
                  navigate(`/categories/${Number(e.target.id)}`);
                }}
              className={url !== `/categories/${icon.id}`
                ? css.iconCategory
                : icon.id === getCat
                ? `${css.iconCategory} ${css.iconCategoryTake}`
                : css.iconCategory}
              src={`/images/icon/${icon.icon}`}
              alt={icon.icon}
            />
              )
            )}
        </div>
        <div className={css.right}>
          <button className={css.button} type="button" onClick={() => dispatch(booleanAuthLogin())}>Войти</button>
          <button className={css.button} type="button" onClick={() => dispatch(booleanAuthReg())}>Регистрация</button>
          {authLogin && <Login />}
          {authRegistration && <Registration />}
        </div>
      </nav>
  )}
    </div>
  );
}

 /* <div className={css.navbarCategory}>
            <div
              onClick={() => navigate('/favourites')}
              className={css.navbarCategoryClass}
            >
              Избранное
            </div>
            <div className={css.navbarCategoryClass}>
              Мои подписки
            </div>
            <div className={css.navbarCategoryClass}>
              Мои подписчики
            </div>
            <div
              onClick={() => navigate(`/profile/${userSession.id}/chat`)}
              className={css.navbarCategoryClass}
            >
              Сообщения
            </div>
          </div> */
