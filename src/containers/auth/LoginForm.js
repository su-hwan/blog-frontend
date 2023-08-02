import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeFiled, initializeForm } from '../../modules/authReducer';
import AuthForm from '../../auth/AuthForm';

const LoginForm = () => {
  //reducer action
  const dispatch = useDispatch();
  //reducer state
  const { form } = useSelector(({ authReducer }) => ({
    form: authReducer.login,
  }));
  //input event handler
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeFiled({
        form: 'login',
        key: name,
        value,
      }),
    );
  };
  //form submit evnet handler
  const onSubmit = (e) => {
    e.preventDefault();
    //TODO
  };

  //form 초기화
  useEffect(() => {
    dispatch(initializeForm('login'));
  }, [dispatch]);
  //   console.log('form:', form);
  return (
    <AuthForm
      type="login"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
    />
  );
};

export default LoginForm;
