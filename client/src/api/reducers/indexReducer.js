import { combineReducers } from 'redux';
import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './userReducer';
import commerceReducer from './commerceReducer';

const persistConfig={
    key: 'root',
    storage, 
    whitelist: ['user']
}

const rootReducer = combineReducers({
    user: userReducer,
    commerce: commerceReducer
});

export default persistReducer(persistConfig,rootReducer);;

