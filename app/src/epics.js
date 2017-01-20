import { combineEpics } from 'redux-observable';
import { epicFetchGithubUser } from './containers/EpicContainer/actions';
export default combineEpics(epicFetchGithubUser);
