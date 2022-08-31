/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Card, Text, User, Divider } from '@geist-ui/core';
import { v4 as uuidv4 } from 'uuid';
import { selectorUserSession } from '../../main/authSlice';
import { loadReview, selectReview, selectReviewPhoto } from './reviewSlice';
import ReviewForm from './ReviewForm';
import '../PlacePage.css';
import { getProfileThunk } from '../../profile/profileSlice';

function ReviewList() {
  const user = useSelector(selectorUserSession);
  const { id, placeid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadReview(placeid));
  }, [placeid, dispatch]);

  const review = useSelector(selectReview);
  console.log('review', review);
  const reviewPhotos = useSelector(selectReviewPhoto);

  return (
    <div id="reviews-container">
      {user && <ReviewForm />}
      <div className="reviews-list-container">
        {review.map((el) => (
          <Card key={uuidv4()} width="700px">
            <div className="user-name-img">
              <img
                src={`/images/${el['User.ava']}`}
                alt="ava"
                id="user-ava"
                onClick={() => {
                  dispatch(getProfileThunk(Number(el['User.id'])));
                  setTimeout(() => {
                    navigate(`/profile/${el['User.id']}`);
                  }, 1000);
                }}
              />
              <h5>{el['User.user_name']}</h5>
            </div>
            {/* <User name={el['User.user_name']} /> */}
            <Text>{el.title}</Text>

            <Text>{el.description}</Text>
            <Text>Дата поездки: {el.date.slice(0, 10)}</Text>
            <Divider />
            <div id="gallery">
              {reviewPhotos && reviewPhotos
                .filter((photo) => photo.review_id === el.id)
                .map((ph) =>
                  // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                  <img key={uuidv4()} className="review-img" tabIndex="0" src={ph.title} alt="some" />
                )}

            </div>
            <Card.Footer>
              <div>
                {Array.from({ length: el.rating }, (_, i) => <img key={uuidv4()} src="/images/icon/star.png" style={{ maxWidth: 40 }} alt="" />)}
              </div>
            </Card.Footer>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default ReviewList;
