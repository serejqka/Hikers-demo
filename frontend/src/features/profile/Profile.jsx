/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@geist-ui/core';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

import { selectorEditProfile,
  editProfile,
  getProfileThunk,
  selectorProfile,
  subscribeThunk,
  selectorFriends,
  getSubscribeThunk, } from './profileSlice';
import EditProfile from './editProfile/editProfile';
import { selectorUserSession } from '../main/authSlice';
import './Profile.css';
import { getFriendsThunk } from '../friends/friendsSlice';
import { openAddNewCard, selectorAddNewCard } from './cardSlice';
import NewCard from './createnewcard/editProfile';

function Profile() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const profileData = useSelector(selectorEditProfile);
  const newCardModal = useSelector(selectorAddNewCard);
  const userSession = useSelector(selectorUserSession);
  const profile = useSelector(selectorProfile);

  const list = useSelector(selectorFriends);
  const follow = userSession && list && list.length && list.filter((el) =>
  (el.user_id === userSession.id && (el.friend_id === Number(id))));
  useEffect(() => {
    dispatch(getProfileThunk(id));
    return () => dispatch(getProfileThunk(id));
  }, [userSession, id]);

  useEffect(() => {
    dispatch(getSubscribeThunk());
    return () => dispatch(getFriendsThunk());
  }, []);

  if (!userSession) return <div>oops</div>;
  if (!list) return <div>oops</div>;

  return (
    <div
      style={{
      position: 'relative',
      minHeight: '83vh',
      maxHeight: '100%',
      marginBottom: '100px'
      }}
      className="profile-page"
    >
      <div className="profile-photo">
        <img src={`/images/${profile.ava}`} alt="img" id="profile-img" />
        {/* <Form.Control type="file" name="photos" onChange={sendFiles} autoComplete="off" /> */}
      </div>
      <div className="profile-block-btn">
        <div className="profile-info">
          {profile && (
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Имя
            </InputGroup.Text>
            <Form.Control
              disabled
              defaultValue={profile.user_name}
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          )}
          {profile && (
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Город
            </InputGroup.Text>
            <Form.Control
              disabled
              defaultValue={profile.city}
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          )}
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Любимая категория
            </InputGroup.Text>
            <Form.Control
              disabled
              defaultValue={profile && profile.favorite_cat ? profile.favorite_cat : 'не выбрано'}
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          {profile && (
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              <img src="/images/icon/email.png" alt="email" className="icons" />
            </InputGroup.Text>
            <Form.Control
              disabled
              defaultValue={profile.email}
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
          )}
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              <img src="/images/icon/link.png" alt="email" className="icons" />
            </InputGroup.Text>
            <Form.Control
              disabled
              defaultValue={profile.link}
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
            />
          </InputGroup>
        </div>
        <div className="edit-btn">
          {profile && userSession && (profile.id === userSession.id) ?
            <Button type="button" onClick={() => dispatch(editProfile())}>Редактировать</Button> : (
              <Button type="button" onClick={() => dispatch(subscribeThunk({ userId: userSession.id, friendId: profile.id }))}>
                {follow && follow.length && follow[0].status ?
                  <>Отписаться</>
                : <>Подписаться</>}
              </Button>
          )}
          {/* {userSession && userSession.admin && userSession.id === Number(id) && (
          <>
            <br />
            <br />
            <Button style={{ backgroundColor: '#bbd7f6' }}
            type="button" onClick={() => dispatch(openAddNewCard())}>Добавить карточку</Button>
          </>
        )} */}
        </div>
      </div>
      {profileData && <EditProfile id={id} />}
      {newCardModal && <NewCard />}
    </div>
  );
}

export default Profile;
