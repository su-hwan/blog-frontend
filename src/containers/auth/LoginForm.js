import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, login } from '../../modules/authReducer';
import AuthForm from '../../components/auth/AuthForm';
import { check as memberCheck } from '../../modules/userReducer';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [error, setError] = useState(null);
  const navigater = useNavigate();
  //reducer action
  const dispatch = useDispatch();
  //reducer state
  const { form, auth, authError, user } = useSelector(
    ({ authReducer, userReducer }) => ({
      form: authReducer.login,
      auth: authReducer.auth,
      authError: authReducer.authError,
      user: userReducer.user,
    }),
  );
  //input event handler
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'login',
        key: name,
        value,
      }),
    );
  };
  //form submit evnet handler
  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password } = form;
    dispatch(login({ username, password }));
  };

  //form 초기화
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);

  //로그인 결과
  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      setError('로그인 실패');
      return;
    }
    if (auth) {
      console.log('로그인 성공');
      console.log(auth);
      dispatch(memberCheck());
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      navigater('/');
    }
  }, [navigater, user]);

  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default LoginForm;
