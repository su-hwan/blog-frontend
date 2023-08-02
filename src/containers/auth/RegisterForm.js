import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeFiled,
  initializeForm,
  register,
} from '../../modules/authReducer';
import AuthForm from '../../auth/AuthForm';

const RegisterForm = () => {
  const dispatch = useDispatch();
  const { form, auth, authError } = useSelector(({ authReducer }) => {
    return {
      form: authReducer.register,
      auth: authReducer.auth,
      authError: authReducer.authError,
    };
  });

  const onChange = (e) => {
    const { name, value } = e.target;
    dispatch(
      changeFiled({
        form: 'register',
        key: name,
        value,
      }),
    );
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { username, password, passwordConfirm } = form;
    if (password !== passwordConfirm) {
      //TODO 오류처리
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
      return;
    }
    if (auth) {
      console.log('회원가입 성공');
      console.log(auth);
    }
  }, [auth, authError]);

  return (
    <AuthForm
      type="register"
      onChange={onChange}
      onSubmit={onSubmit}
      form={form}
    />
  );
};

export default RegisterForm;
