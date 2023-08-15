import { combineReducers } from 'redux';
import authReducer, { authSaga } from './authReducer';
import loadingReducer from './loadingReducer';
import userReducer, { userSaga } from './userReducer';
import writeReducer, { writeSaga } from './writeReducer';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  authReducer,
  loadingReducer,
  userReducer,
  writeReducer,
});
export function* rootSaga() {
  yield all([authSaga(), userSaga(), writeSaga()]); //() -> 안 넣어서 ㅅㅅㅂㅂ~~ 원인 찾으려고 하루 보냄
}
export default rootReducer;
