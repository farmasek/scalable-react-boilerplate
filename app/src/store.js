import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore, routerActions, routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import { createEpicMiddleware } from 'redux-observable';
import rootEpics from '../src/epics';

import rootReducer from './reducers';
/* GENERATOR: Import all of your initial state */
import { initialState as githubReducer } from './containers/EpicContainer/reducer';
import { initialState as app } from './containers/AppContainer/reducer';

const initialState = {
  /* GENERATOR: Compile all of your initial state */
  githubReducer,
  app,
};

/* Commonly used middlewares and enhancers */
/* See: http://redux.js.org/docs/advanced/Middleware.html*/
const epicMiddleware = createEpicMiddleware(rootEpics);

const routingMiddleware = routerMiddleware(browserHistory);
const middlewares = [ routingMiddleware, epicMiddleware];

const isClient = typeof document !== 'undefined';
const isDeveloping = process.env.NODE_ENV !== 'production';

if (isDeveloping && isClient) {
  const createLogger = require('redux-logger'); // eslint-disable-line
  const loggerMiddleware = createLogger();
  middlewares.push(loggerMiddleware);
}

/* Everyone should use redux dev tools */
/* https://github.com/gaearon/redux-devtools */
/* https://medium.com/@meagle/understanding-87566abcfb7a */
const enhancers = [];
if (isClient && isDeveloping) {
  const devToolsExtension = window.devToolsExtension;
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers,
);

/* Hopefully by now you understand what a store is and how redux uses them,
 * But if not, take a look at: https://github.com/reactjs/redux/blob/master/docs/api/createStore.md
 * And https://egghead.io/lessons/javascript-redux-implementing-store-from-scratch
 */
const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers,
);

/* See: https://github.com/reactjs/react-router-redux/issues/305 */
export const history = isClient ?
  syncHistoryWithStore(browserHistory, store) : undefined;


/* Hot reloading of reducers.  How futuristic!! */
if (module.hot) {
  module.hot.accept('./reducers', () => {
    /*eslint-disable */ // Allow require
    const nextRootReducer = require('./reducers').default;
    /*eslint-enable */
    store.replaceReducer(nextRootReducer);
  });
}

export default store;
