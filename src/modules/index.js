import { combineReducers } from 'redux';
import authReducer, { authSaga } from './authReducer';
import loadingReducer from './loadingReducer';
import { all } from 'redux-saga/effects';

const rootReducer = combineReducers({ authReducer, loadingReducer });
export function* rootSaga() {
  yield all([authSaga]);
}
export default rootReducer;
