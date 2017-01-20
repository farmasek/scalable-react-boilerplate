import * as types from './constants';
import { fromJS } from 'immutable';

export const initialState = fromJS({
  userInfo: '',
});

const githubReducer =
  (state = initialState, action) => {
    switch (action.type) {
      case types.CLEAN_USER_INFO:
        return state.set('userInfo', `Data cleared`);
      case types.FETCH_GITHUB_USER:
        return state.set('userInfo', `Finding user ${action.user}`);
      case `${types.FETCH_GITHUB_USER}_FULFILLED`:
        return state.set('userInfo', JSON.stringify(action.response, null, 2));
      case `${types.FETCH_GITHUB_USER}_REJECTED`:
        return state.set('userInfo', `Ops. Something went wrong :( ${action.error.message}`);
      default:
        return state;
    }
  };

export default githubReducer;
