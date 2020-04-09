import { combineReducers } from 'redux';
import userReducer from './userReducer';
import commerceReducer from './commerceReducer';

const rootReducer = combineReducers({
    user: userReducer,
    commerce: commerceReducer
});

export default rootReducer;