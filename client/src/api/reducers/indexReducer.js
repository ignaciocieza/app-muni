import {
    SET_USER,
    SET_CURRENT_IMG,
    SET_CURRENT_USER,
    RESET_CURRENTS,
    FETCH_USERS,
    FETCH_USER,
    DELETE_USER
} from '../actions/typeAction';
import {deleteAuser} from './helperFunction.js';

const INITIAL_STATE = {
    users: [],
    currentUser: '',
    currentImage: {},
};

const indexReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return ({
                ...state,
                users: { ...state.users, [action.payload.id]: action.payload },
                currentUser: action.payload
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
            })
        case RESET_CURRENTS:
            return ({
                ...state,
                currentUser: {},
                currentImage: '',
            })
        case FETCH_USERS:
            return ({
                ...state,
                users: action.payload
            })
        case FETCH_USER:
            return ({
                ...state,
                currentUser: action.payload
            })
            case DELETE_USER:
                return({
                    ...state,
                    users: deleteAuser(state.users, action.payload),
                })
        default:
            return state;
    }
}

export default indexReducer;