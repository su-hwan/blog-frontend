import { createAction, handleActions } from 'redux-actions';

const START_LOADING = 'loading/START_LOADING';
const FINISH_LOADING = 'loading/FINISH_LOADING';

//요청을 위한 액션타입을 payload로 설정(ex: "sample/GET_POST")
export const startLoading = createAction(
  START_LOADING,
  (resultType) => resultType,
);

export const finishLoading = createAction(
  FINISH_LOADING,
  (resultType) => resultType,
);

const initialState = {};

const loadingReducer = handleActions(
  {
    [START_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: true,
    }),
    [FINISH_LOADING]: (state, action) => ({
      ...state,
      [action.payload]: false,
    }),
  },
  initialState,
);

export default loadingReducer;
