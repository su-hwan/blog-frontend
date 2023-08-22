import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import * as postsAPI from '../lib/api/posts';
import { takeLatest } from 'redux-saga/effects';

const INITIALIZE = 'write/INITIALIZE'; //모든 내용 초기화
const CHANGE_FIELD = 'write/CHANGE_FIELD'; //input form key value
const SET_ORIGINAL_POST = 'write/SET_ORIGINAL_POST';

export const initialize = createAction(INITIALIZE);
export const changeField = createAction(CHANGE_FIELD, ({ key, value }) => ({
  key,
  value,
}));
export const setOriginalPost = createAction(SET_ORIGINAL_POST, (post) => post);

const [WRITE_POST, WRITE_POST_SUCCESS, WRITE_POST_FAILURE] =
  createRequestActionTypes('write/WRITE_POST'); //포스트 작성

export const writePost = createAction(WRITE_POST, ({ title, body, tags }) => ({
  title,
  body,
  tags,
}));

const [UPDATE_POST, UPDATE_POST_SUCCESS, UPDATE_POST_FAILURE] =
  createRequestActionTypes('update/UPDATE_POST'); //포스트 작성

export const updatePost = createAction(
  UPDATE_POST,
  ({ id, title, body, tags }) => ({
    id,
    title,
    body,
    tags,
  }),
);

//사가생성
const writePostSaga = createRequestSaga(WRITE_POST, postsAPI.writePost);
const updatePostSaga = createRequestSaga(UPDATE_POST, postsAPI.updatePost);
export function* writeSaga() {
  yield takeLatest(WRITE_POST, writePostSaga);
  yield takeLatest(UPDATE_POST, updatePostSaga);
}

const initialState = {
  id: null,
  title: '',
  body: '',
  tags: [],
  post: null,
  postError: null,
  originalPostId: null,
};

const writeReducer = handleActions(
  {
    [INITIALIZE]: (state) => initialState,
    [CHANGE_FIELD]: (state, { payload: { key, value } }) => ({
      ...state,
      [key]: value,
    }),
    [WRITE_POST]: (state) => ({
      ...state,
      post: null,
      postError: null,
    }),
    [WRITE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [WRITE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
    [UPDATE_POST_SUCCESS]: (state, { payload: post }) => ({
      ...state,
      post,
    }),
    [UPDATE_POST_FAILURE]: (state, { payload: postError }) => ({
      ...state,
      postError,
    }),
    [SET_ORIGINAL_POST]: (state, { payload: post }) => {
      const { title, body, tags, _id } = post;
      return {
        ...state,
        title,
        body,
        tags,
        originalPostId: _id,
      };
    },
  },
  initialState,
);

export default writeReducer;
