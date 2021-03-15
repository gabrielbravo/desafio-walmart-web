import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'connected-react-router';
import createSagaMiddleware from 'redux-saga';
import createReducer from './reducers';
//import { loadState, saveState  } from './localStorage';
export default function configureStore(initialState = {}, history) {
  let composeEnhancers = compose;
  let reduxSagaMonitorOptions = {};

  if (process.env.NODE_ENV !== 'production' && typeof window === 'object') {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__)
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({});

     if (window.__SAGA_MONITOR_EXTENSION__)
     {
      reduxSagaMonitorOptions = {
        //sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
      }
     }
    //   reduxSagaMonitorOptions = {
    //     sagaMonitor: window.__SAGA_MONITOR_EXTENSION__,
    //   };
    /* eslint-enable */
  }

  const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
  const middlewares = [sagaMiddleware, routerMiddleware(history)];
  const enhancers = [applyMiddleware(...middlewares)];

  const persistedState = {}; //loadState();

  const store = createStore(
    createReducer(),
    persistedState,
    composeEnhancers(...enhancers),
  );

  store.runSaga = sagaMiddleware.run;
  store.injectedReducers =  (key, reducer) => {
    store.asyncReducers[key] = reducer;
    store.replaceReducer(createReducer(store.asyncReducers));
    return store;
  }; 
  store.injectedSagas = {};

//   store.subscribe(throttle(() => {
//     saveState(store.getState());
//   }, 1000));
  
  return store;
}

