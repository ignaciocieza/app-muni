import { combineReducers } from 'redux';
import {persistReducer} from 'redux-persist';
//import storage from 'redux-persist/lib/storage';
import storageSession from 'redux-persist/lib/storage/session';
import userReducer from './userReducer';
import commerceReducer from './commerceReducer';

const persistConfig={
    key: 'root',
    storage: storageSession, 
    whitelist: ['user']
}

const rootReducer = combineReducers({
    user: userReducer,
    commerce: commerceReducer
});

export default persistReducer(persistConfig,rootReducer);;

