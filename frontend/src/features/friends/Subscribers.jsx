/* eslint-disable no-console */
/* eslint-disable max-len */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectorUserSession } from '../main/authSlice';
import { getSubscribeThunk, selectorFriends } from '../profile/profileSlice';
import { getFriendsThunk } from './friendsSlice';
import './Friends.css';

function Subscribers() {
  const dispatch = useDispatch();
  const { friends, users } = useSelector(selectorFriends);
  const userSession = useSelector(selectorUserSession);
  const userSubscribers = userSession && friends && friends.filter((el) => el.friend_id === userSession.id && el.status === true);
  const subscribersId = userSession && friends && userSubscribers.map((opt) => opt.user_id);
  // console.log(userSubscribers, 'мои подписчики');
  // console.log(subscribersId, 'мои подписчики ID');
  // console.log(users, 'все юзеры');
  const subscribers = [];
  const mySubscribers = userSession && friends && subscribersId.forEach((el) => {
    const filter = users.find((user) => user.id === el);
    subscribers.push(filter);
  });
  console.log(subscribers, 'мои подписчики');
  useEffect(() => {
    dispatch(getFriendsThunk(),);
  }, [userSession, dispatch]);
  return (
    <div
      className="friends"
      style={{
      position: 'relative',
      minHeight: '83vh',
      maxHeight: '100%',
      marginBottom: '100px'
      }}
    >
      <div className="friends-title">
        Мои подписчики
      </div>
      <div>
        {
          subscribers && subscribers.map((friend) => (
            <div key={friend.id} className="friend">
              <div>
                <img src={`/images/${friend.ava}`} alt="img" id="ava-img" />
              </div>
              <div className="friends-info">
                <div>
                  {friend.user_name}
                </div>
                <div>
                  {friend.city}
                </div>
                <div>
                  <img src="/images/icon/email.png" alt="email" className="icons" />

                  {friend.email}
                </div>
                <div>
                  <img src="/images/icon/link.png" alt="email" className="icons" />

                  <a href={friend.link}>{friend.link}</a>
                </div>
                <div>
                  {friend.favorite_cat}
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  );
}

export default Subscribers;
