import React from 'react';
import { useSelector } from 'react-redux';
import Header from '../common/Header';

const HeaderContainer = () => {
  const { user } = useSelector(({ userReducer }) => ({
    user: userReducer.user,
  }));
  console.log('user:', user);
  return <Header user={user} />;
};

export default HeaderContainer;
