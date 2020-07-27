import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import userReducer from './userReducer';
import accesoReducer from './agenteReducer';
import mergeReducer from './mergeReducer';
import pescaReducer from './pescaReducer';

const persistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ['user', 'merge', 'agente']
}

const rootReducer = combineReducers({
    user: userReducer,
    agente: accesoReducer,
    merge: mergeReducer,
    pesca : pescaReducer
});

export default persistReducer(persistConfig, rootReducer);;

