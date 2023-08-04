import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeField,
  initializeForm,
  register,
} from '../../modules/authReducer';
import { check as memberCheck } from '../../modules/userReducer';
import AuthForm from '../../components/auth/AuthForm';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { form, auth, authError, user } = useSelector(
    ({ authReducer, userReducer }) => {
      return {
        form: authReducer.register,
        auth: authReducer.auth,
        authError: authReducer.authError,
        user: userReducer.user,
      };
    },
  );

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      changeField({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;

    if ([username, password, passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력하세요');
      return;
    }
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      changeField({ form: 'register', key: 'password', value: '' });
      changeField({ form: 'register', key: 'passwordConfirm', value: '' });
      return;
    }
    dispatch(register({ username, password }));
  };

  //form 초기화
  useEffect(() => {
    dispatch(initializeForm('register'));
  }, [dispatch]);

  //회원가입 성공/실패 처리
  useEffect(() => {
    if (authError) {
      console.log('오류 발생');
      console.log(authError);
      if (authError.response.status === 409) {
        setError('이미 존재하는 계정명입니다.');
      } else {
        setError('회원 가입 실패');
      }
      return;
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
      dispatch(memberCheck()); //회원여부 체크
      // dispatch(initializeForm('register'));
    }
  }, [auth, authError, dispatch]);

  useEffect(() => {
    if (user) {
      console.log('check API 성공');
      console.log(user);
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <AuthForm
      type="register"
      onChange={onChange}
      onSubmit={onSubmit}
      form={form}
      error={error}
    />
  );
};

export default RegisterForm;
