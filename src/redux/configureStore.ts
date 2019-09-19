import thunk from 'redux-thunk'
import {
  applyMiddleware,
  compose,
  createStore,
} from 'redux';

import rootReducer from './reducers/index';

declare global {
  interface Window { __REDUX_DEVTOOLS_EXTENSION__: any; }
}


// Redux DevTools Extension for Chrome and Firefox
const reduxDevTool = () => {
  return typeof window === 'object'
  && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ? window.__REDUX_DEVTOOLS_EXTENSION__() : (f:any) => f;
};



export default function configureStore(initialState: any) {
  const middleware = applyMiddleware(thunk);

  const storeWithMiddleware = compose(middleware, reduxDevTool());

  const store = createStore(
    rootReducer,
    storeWithMiddleware
  )

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      store.replaceReducer(require('./reducers'));
    });
  }

  return store;
}
