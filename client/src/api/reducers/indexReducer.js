import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import userReducer from './user/userReducer';
import accesoReducer from './agente/agenteReducer';
import mergeReducer from './merge/mergeReducer';
import pescaReducer from './pesca/pescaReducer';
import rafamReducer from './rafam/rafamReducer';

const persistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ['user', 'merge', 'agente']
}

const rootReducer = combineReducers({
    user: userReducer,
    agente: accesoReducer,
    merge: mergeReducer,
    pesca : pescaReducer,
    rafam: rafamReducer,
});

export default persistReducer(persistConfig, rootReducer);;

