/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Outlet, useNavigate } from 'react-router-dom';
import { Loading } from '@geist-ui/core';
import { selectorCategories } from './mainPageSlice';
import css from './Main.module.css';

export default function MainPage() {
  // const memoCategories = useMemo(() => selectorCategories, [selectorCategories]);
  const categories = useSelector(selectorCategories);
  const navigate = useNavigate();

  const [getDownCat, setGetDownCat] = useState(5);
  const [getUpCat, setGetUpCat] = useState(0);
  const [titleUp, setTitleUp] = useState(1);
  const [trueCssUp, setTrueCssUp] = useState(false);
  const [trueCssDown, setTrueCssDown] = useState(false);

  if (!categories) return <Loading style={{ width: '100%', position: 'absolute', top: '50%' }}>Loading</Loading>;

  return (
    <div style={{
      position: 'relative',
      minHeight: '83vh',
      maxHeight: '100%',
      marginBottom: '100px'
      }}
    >
      <div id={css.main}>
        <span className={css.photo}>
          {trueCssUp && (
          <img
            className={trueCssUp ? `${css.photo} ${css.photoUpAnimation}` : css.photo}
            src={`/images/photo/${categories[getUpCat].photo}`}
            alt={categories[getUpCat].photo}
          />
          )}
          <img
            onClick={() => navigate(`/categories/${categories[getUpCat].id}`)}
            className={trueCssUp
              ? `${css.photo} ${css.photoUpMainA}`
              : trueCssDown
              ? `${css.photo} ${css.photoDownMainA}`
              : css.photo}
            key={categories[getUpCat].id + categories[getUpCat].photo}
            src={
              trueCssUp ?
              `/images/photo/${categories[getDownCat].photo}`
              : trueCssDown ?
              `/images/photo/${categories[getUpCat].photo}`
              : `/images/photo/${categories[getUpCat].photo}`
            }
            alt={categories[getUpCat].photo}
          />
          {trueCssDown && (
          <img
            className={trueCssDown ? `${css.photo} ${css.photoDownAnimation}` : css.photo}
            src={`/images/photo/${categories[titleUp].photo}`}
            alt={categories[getUpCat].photo}
          />
          )}
        </span>
        <span className={css.mainRight}>
          <div className={css.categoryChange}>
            <button
              className={css.buttonBack}
              type="button"
              onClick={() => {
                  setTrueCssUp(true);
                if (getUpCat > 4) {
                  setGetUpCat(0);
                  setGetDownCat(5);
                  setTitleUp((prev) => prev + 1);
                } else {
                  setGetUpCat((prev) => prev + 1);
                  setGetDownCat((prev) => prev + 1);
                  setTitleUp((prev) => prev + 1);
                  if (titleUp === 5) setTitleUp(0);
                  if (getDownCat === 5) setGetDownCat(0);
                  // setGetDownCat((prev) => prev + 1);
                }
                const interval = setTimeout(() => {
                  setTrueCssUp(false);
                  return clearInterval(interval);
                }, 1000);
              }}
            ><img
              className={css.iconMainUpDown}
              src="/images/icon/Up.png"
              alt="own"
            />
            </button>
            <button
              className={css.buttonNext}
              type="button"
              onClick={() => {
                  setTrueCssDown(true);
                if (getDownCat === 5) {
                  setGetUpCat(5);
                  setTitleUp(0);
                  setGetDownCat((prev) => prev - 1);
                } else {
                  if (titleUp === 0) {
                    setTitleUp(6);
                  }
                  if (getDownCat === 0) {
                    setGetDownCat(6);
                  }
                  setTitleUp((prev) => prev - 1);
                  setGetUpCat((prev) => prev - 1);
                  setGetDownCat((prev) => prev - 1);
                }
                const interval = setTimeout(() => {
                  setTrueCssDown(false);
                  return clearInterval(interval);
                }, 1000);
              }}
            ><img
              className={css.iconMainUpDown}
              src="/images/icon/Down.png"
              alt="up"
            />
            </button>

          </div>
          <div className={css.categoryDistraction}>
            <div>
              <div className={css.categoryDistractionTitle}>
                {categories[getUpCat].title}
              </div>
              <div className={css.categoryDistractionTitleDis}>
                {categories[getUpCat].description}
              </div>
              <button
                onClick={() => navigate(`/categories/${categories[getUpCat].id}`)}
                className={css.categoryDistractionButton}
                type="button"
              >Перейти
              </button>
            </div>
          </div>
        </span>
      </div>
      <Outlet />
    </div>
  );
}
