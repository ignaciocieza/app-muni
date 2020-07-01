import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import userReducer from './userReducer';
import accesoReducer from './agenteReducer';
import mergeReducer from './mergeReducer';

const persistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ['user', 'merge', 'agente']
}

const rootReducer = combineReducers({
    user: userReducer,
    agente: accesoReducer,
    merge: mergeReducer
});

export default persistReducer(persistConfig, rootReducer);;

