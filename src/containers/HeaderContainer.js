import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/common/Header';
import { logout } from '../modules/userReducer';

const HeaderContainer = () => {
  const { user } = useSelector(({ userReducer }) => ({
    user: userReducer.user,
  }));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
  };
  // console.log('user:', user);
  return <Header user={user} onLogout={onLogout} />;
};

export default HeaderContainer;
