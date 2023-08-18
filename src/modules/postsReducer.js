import { createAction, handleActions } from 'redux-actions';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import * as postsApi from '../lib/api/posts';

const [LIST_POSTS, LIST_POSTS_SUCCESS, LIST_POSTS_FAILURE] =
  createRequestActionTypes('posts/LIST_POSTS');

export const listPosts = createAction(
  LIST_POSTS,
  ({ page, username, tag }) => ({ page, username, tag }),
);

const listPostsSaga = createRequestSaga(LIST_POSTS, postsApi.listPosts);

export function* postsSaga() {
  yield takeLatest(LIST_POSTS, listPostsSaga);
}

const initialState = {
  posts: null,
  error: null,
  lastPage: 1,
};

const postsReducer = handleActions(
  {
    [LIST_POSTS_SUCCESS]: (state, { payload: posts, meta }) => {
      return {
        ...state,
        posts,
        lastPage: parseInt(meta.headers['last-page'], 10),
      };
    },
    [LIST_POSTS_FAILURE]: (state, { palyload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default postsReducer;
