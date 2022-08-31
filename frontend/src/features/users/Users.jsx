/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectorFriends, getFriendsThunk } from '../friends/friendsSlice';
import { getProfileThunk } from '../profile/profileSlice';

import './Users.css';

function Users() {
  const users = useSelector(selectorFriends);
  const usersList = users && users.users;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log(usersList);

  useEffect(() => {
    dispatch(getFriendsThunk());
  }, []);

  if (!users) return <div>load</div>;

  return (
    <div
      style={{
      position: 'relative',
      minHeight: '83vh',
      maxHeight: '100%',
      marginBottom: '100px'
      }}
    >
      <div className="users-title">
        Все пользователи
      </div>
      <div className="all-users">
        {
        users && usersList && usersList.map((user) => (
          <div className="user-block" key={user.id}>
            <div className="user">
              <div>
                {/* <NavLink to="/">клик</NavLink> */}
                <img
                  src={`/images/${user.ava}`}
                  alt="img"
                  className="ava-img"
                  onClick={() => {
                    dispatch(getProfileThunk(user.id));
                    setTimeout(() => {
                      navigate(`/profile/${user.id}`);
                    }, 1000);
                  }}
                />
              </div>
              <div className="user-info">
                <div className="text-inf">
                  <div className="str-inf">{user.user_name}</div>
                  <div className="str-inf">Город: {user.city}</div>
                  <div className="str-inf">Активность: {user.favorite_cat}</div>
                </div>
                <div>
                  <div>
                    <img src="/images/icon/email.png" alt="email" className="icons" />
                    {user.email}
                  </div>
                  <div>
                    <img src="/images/icon/link.png" alt="" className="icons" />
                    <a href={user.link}>{user.link}</a>
                  </div>
                </div>
              </div>
            </div>

          </div>
      ))
    }
      </div>
    </div>
  );
}

export default Users;
