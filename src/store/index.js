import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {  persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from '../store/reducers';
import logger from 'redux-logger';
import { offline } from '@redux-offline/redux-offline';
import offlineConfig from '@redux-offline/redux-offline/lib/defaults';
import createSagaMiddleware from 'redux-saga'
import appSaga from './sagas';
import { createOffline } from "@redux-offline/redux-offline";
import config from "@redux-offline/redux-offline/lib/defaults";
// create the saga middleware
// const sagaMiddleware = createSagaMiddleware()

// const persistConfig = {
//     key: 'root',
//     storage: AsyncStorage,
//     // stateReconciler: autoMergeLevel2,
//     // whitelist: ['auth'],
//     timeout: null,
// }

// const pReducer = persistReducer(persistConfig, rootReducer);
// const store = createStore(
//     pReducer, 
//     compose(
//         applyMiddleware(
//             thunk,
//             sagaMiddleware
//         ),
//         offline(offlineConfig)
//     )
// );



// export default store;


const sagaMiddleware = createSagaMiddleware();
const { middleware, enhanceReducer, enhanceStore } = createOffline(config);
const store = createStore(
  enhanceReducer(rootReducer),
  compose(applyMiddleware(thunk, middleware, sagaMiddleware), enhanceStore)
);
sagaMiddleware.run(appSaga)

export default store;