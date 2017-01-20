import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

/* GENERATOR: Import all of your reducers */
import githubReducer from './containers/EpicContainer/reducer';
import app from './containers/AppContainer/reducer';

const rootReducer = combineReducers({
  app,
  /* GENERATOR: Compile all of your reducers */
  githubReducer,
  routing: routerReducer,
});

export default rootReducer;
