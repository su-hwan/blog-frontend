import { call, put } from 'redux-saga/effects';
import { startLoading, finishLoading } from '../modules/loadingReducer';

export const createRequestActionTypes = (type) => {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return [type, SUCCESS, FAILURE];
};

/**
 * 백엔드서버 통신
 * @param {*} type : Reducer action type
 * @param {*} callAPI : 서버호출 함수형 파라미터(ex: apiAuth.login)
 * @returns
 */
export default function createRequestSaga(type, callAPI) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  /* yield */
  return function* (action) {
    //put -> action를 dispatch 한다
    yield put(startLoading(type)); //로딩시작
    try {
      const response = yield call(callAPI, action.payload);
      //put -> 익명 dispatch
      yield put({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (error) {
      yield put({
        type: FAILURE,
        payload: error,
        error: true,
      });
    }
    yield put(finishLoading(type)); //로딩 끝
  };
}
