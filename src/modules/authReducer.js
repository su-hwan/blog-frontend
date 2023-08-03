import { produce } from 'immer';
import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';
import { takeLatest } from 'redux-saga/effects';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] =
  createRequestActionTypes('auth/REGISTER');

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] =
  createRequestActionTypes('auth/LOGIN');

//input filed값 저장 action
export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, //login, register form
    key, //username, password, passwordConfirm
    value, //key의 값
  }),
);
//form의 input filed 초기화 action
export const initializeForm = createAction(INITIALIZE_FORM, (form) => form);
//회원가입 action
export const register = createAction(REGISTER, ({ username, password }) => {
  console.log(REGISTER, username, password);
  return {
    username,
    password,
  };
});
//로그인 action
export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password,
}));

//Saga로 백엔드서버 통신
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);

//saga middleware
export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga); //takeLatest:기존작업 취소하고 마지막작업 수행
  yield takeLatest(LOGIN, loginSaga);
}
const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
  auth: null,
  authError: null,
};

const authReducer = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) => {
      //console.log(key, ':', value);
      //immer
      return produce(
        state,
        (draft) => {
          draft[form][key] = value;
        } /* ex) state.login.username */,
      );
    },
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
    }),
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
);

export default authReducer;
