import { combineReducers } from 'redux';
import authReducer, { authSaga } from './authReducer';
import loadingReducer from './loadingReducer';
import userReducer, { userSaga } from './userReducer';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({
  authReducer,
  loadingReducer,
  userReducer,
});
export function* rootSaga() {
  yield all([authSaga(), userSaga()]); //() -> 안 넣어서 ㅅㅅㅂㅂ~~ 원인 찾으려고 하루 보냄
}
export default rootReducer;
