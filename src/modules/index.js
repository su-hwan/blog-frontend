import { combineReducers } from 'redux';
import authReducer, { authSaga } from './authReducer';
import loadingReducer from './loadingReducer';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({ authReducer, loadingReducer });
export function* rootSaga() {
  yield all([authSaga()]); //() -> 안 넣어서 ㅅㅅㅂㅂ~~ 원인 찾으려고 하루 보냄
}
export default rootReducer;
