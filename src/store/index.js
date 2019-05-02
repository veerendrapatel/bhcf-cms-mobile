import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
// import {  persistStore, persistReducer } from 'redux-persist';
// import storage from 'redux-persist/lib/storage';
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from '../store/reducers';
// import logger from 'redux-logger';
// import { offline } from '@redux-offline/redux-offline';
// import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import createSagaMiddleware from 'redux-saga'
import appSaga from './sagas';
import { createOffline } from "@redux-offline/redux-offline";
import config from "@redux-offline/redux-offline/lib/defaults";

// AsyncStorage.clear();
const sagaMiddleware = createSagaMiddleware();
const { middleware, enhanceReducer, enhanceStore } = createOffline(config);
const store = createStore(
  enhanceReducer(rootReducer),
  compose(enhanceStore, applyMiddleware(middleware, thunk, sagaMiddleware))
);
sagaMiddleware.run(appSaga)

export default store;