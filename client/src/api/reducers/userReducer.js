import {
    SET_USER,
    SET_CURRENT_IMG,
    SET_CURRENT_USER,
    SET_IS_HEADER,
    RESET_CURRENTS,
    FETCH_USERS,
    FETCH_USER,
    DELETE_USER,
    SET_ADMIN,
    IS_FETCHING,
    IS_FETCHED,
    FIND_USER,
    SET_ERROR
} from '../actions/typeAction';
import { deleteAuser, addUser, findUserValue } from './helperFunction.js';

const INITIAL_STATE = {
    users: [],
    currentUser: '',
    currentImage: false,
    admin: false,
    isFetching: false,
    isFetched: false,
    isHeader: true,
    error: '',
    //isGenerated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return ({
                ...state,
                users: addUser(state.users, action.payload),
                currentUser: action.payload,
                isFetching: false,
                isFetched: true,
                //isGenerated: action.payload.generate,
            });
        case SET_CURRENT_IMG:
            return ({
                ...state,
                currentImage: action.payload
            });
        case SET_CURRENT_USER:
            return ({
                ...state,
                currentUser: action.payload,
                currentImage: action.payload.image
            });
        case SET_ADMIN:
            return ({
                ...state,
                admin: action.payload
            });
        case SET_ERROR:
            return ({
                ...state,
                error: action.payload,
                isFetching: false,
            });
        case SET_IS_HEADER:
            return({
                ...state,
                isHeader:action.payload
            })
        case RESET_CURRENTS:
            return ({
                ...state,
                currentUser: '',
                currentImage: '',
                isFetching: false,
                isFetched: false,
                error: false,
                users: []
            });
        case FETCH_USERS:
            return ({
                ...state,
                users: action.payload,
                isFetching: false,
                isFetched: true,
            });
        case FETCH_USER:
            return ({
                ...state,
                currentUser: action.payload,
            });
        case DELETE_USER:
            return ({
                ...state,
                users: deleteAuser(state.users, action.payload),
            });
        case IS_FETCHING:
            return ({
                ...state,
                isFetching: action.payload,
                isFetched: false,
                error: false,
            });
        case IS_FETCHED:
            return ({
                ...state,
                isFetched: action.payload
            });
        case FIND_USER:
            return ({
                ...state,
                currentUser: findUserValue(state.users, action.payload)
            });
        default:
            return state;
    }
}

export default userReducer;