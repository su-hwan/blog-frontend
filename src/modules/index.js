import { combineReducers } from 'redux';
import authReducer, { authSaga } from './authReducer';
import loadingReducer from './loadingReducer';
import userReducer, { userSaga } from './userReducer';
import writeReducer, { writeSaga } from './writeReducer';
import postReducer, { postSaga } from './postReducer';
import postsReducer, { postsSaga } from './postsReducer';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  authReducer,
  loadingReducer,
  userReducer,
  writeReducer,
  postReducer,
  postsReducer,
});
export function* rootSaga() {
  yield all([authSaga(), userSaga(), writeSaga(), postSaga(), postsSaga()]); //() -> 안 넣어서 ㅅㅅㅂㅂ~~ 원인 찾으려고 하루 보냄
}
export default rootReducer;
