import * as types from './constants';
import { Observable } from 'rxjs';
import { doIt, hosts } from '../../network';


export const fetchUserInfo = (user) => ({
  type: types.FETCH_GITHUB_USER,
  user,
});

export const epicFetchGithubUser = (action$) =>
  action$.ofType(types.FETCH_GITHUB_USER)
    .filter((action) => action.user !== '')
    .debounceTime(250)
    .switchMap((action) =>
      Observable
        .ajax(doIt(hosts.github, `users/${action.user}`, 'GET', {}, true))
        .switchMap((payload) => [{
          type: `${types.FETCH_GITHUB_USER}_FULFILLED`,
          response: payload.response,
        },
        ])
        .catch(error => Observable.of({
          type: `${types.FETCH_GITHUB_USER}_REJECTED`,
          error: error.xhr.response,
        }))
    );
export const clearUserInfo = () => ({
  type: types.CLEAN_USER_INFO,
});
