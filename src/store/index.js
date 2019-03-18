import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import {  persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import rootReducer from '../store/reducers';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // stateReconciler: autoMergeLevel2,
    // whitelist: ['auth'],
    timeout: null,
}

const pReducer = persistReducer(persistConfig, rootReducer);
export const store = createStore(pReducer, compose(applyMiddleware(thunk)));
export const persistor = persistStore(store);
