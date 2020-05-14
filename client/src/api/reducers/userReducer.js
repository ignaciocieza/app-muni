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
    SET_ERROR,
    SET_ALERTS,
    LOGOUT,
    SET_TOGGLE_IMG
} from '../actions/typeAction';
import {deleteAux} from './helperFunction.js';

const INITIAL_STATE = {
    users: [],
    currentUser: '',
    currentImage: false,
    admin: false,
    isFetching: false,
    isFetched: false,
    isHeader: true,
    error: '',
    alerts: '',
    toggleImage: {
        imgData: '',
        toggle: false
    },
    //isGenerated: false,
};

const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SET_USER:
            return ({
                ...state,
                //users: addUser(state.users, action.payload),
                users:{ ...state.users, [action.payload.dni]: action.payload },
                currentUser: action.payload,
                isFetching: false,
                isFetched: true,
                error: '',
                alerts: ''
            });
        case SET_CURRENT_IMG:
            return ({
                ...state,
                currentImage: action.payload
            });
        case SET_CURRENT_USER:
            return ({
                ...state,
                currentUser: { ...action.payload, image: 'especificada en currentImage' },
                currentImage: action.payload.image
            });
        case SET_ADMIN:
            return ({
                ...state,
                admin: action.payload,
                alerts: '',
                isHeader: true
            });
        case SET_ERROR:
            return ({
                ...state,
                error: action.payload,
                isFetching: false,
                isFetched: false,
            });
        case SET_IS_HEADER:
            return ({
                ...state,
                isHeader: action.payload
            })
        case RESET_CURRENTS:
            return ({
                ...state,
                currentUser: '',
                currentImage: '',
                isFetching: false,
                isFetched: false,
                error: false,
                alerts: false,
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
                //users: deleteAuser(state.users, action.payload),
                users: deleteAux(state.users, action.payload)
                //users: delete state.users[action.payload]
            });
        case IS_FETCHING:
            return ({
                ...state,
                isFetching: action.payload,
                isFetched: false,
                error: false,
                alerts: false
            });
        case IS_FETCHED:
            return ({
                ...state,
                isFetched: action.payload
            });
        case FIND_USER:
            return ({
                ...state,
                //currentUser: findUserValue(state.users, action.payload)
                currentUser: state.users[action.payload]
            });
        case SET_ALERTS:
            return ({
                ...state,
                alerts: action.payload
            })
        case LOGOUT:
            return ({
                ...state,
                ...INITIAL_STATE
            })
        case SET_TOGGLE_IMG:
            return ({
                ...state,
                toggleImage: {
                    imgData: action.payload,
                    toggle: !state.toggleImage.toggle
                }
            })
        default:
            return state;
    }
}

export default userReducer;