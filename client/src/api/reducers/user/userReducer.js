import userTypeActions from '../../actions/user/userTypeActions';
import commonTypes from '../../actions/commonTypes';
import { deleteAux } from '../helperFunction.js';

/**
 * user--> db "persona"
 */
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
        case userTypeActions.SET_USER_SUCCESS:
            return ({
                ...state,
                //users: addUser(state.users, action.payload),
                users: { ...state.users, [action.payload.dni]: action.payload },
                currentUser: action.payload,
                isFetching: false,
                isFetched: true,
                error: '',
                alerts: ''
            });
        case userTypeActions.SET_CURRENT_IMG:
            return ({
                ...state,
                currentImage: action.payload
            });
        case userTypeActions.SET_CURRENT_USER:
            return ({
                ...state,
                currentUser: { ...action.payload, image: 'especificada en currentImage' },
                currentImage: action.payload.image
            });
        case userTypeActions.SET_ADMIN_SUCCESS:
            return ({
                ...state,
                admin: action.payload,
                alerts: '',
                isHeader: true
            });
        case commonTypes.SET_ERROR:
            return ({
                ...state,
                error: action.payload,
                isFetching: false,
                isFetched: false,
            });
        case commonTypes.SET_IS_HEADER:
            return ({
                ...state,
                isHeader: action.payload
            });
        case commonTypes.SET_ALERTS:
            return ({
                ...state,
                alerts: action.payload
            });
        case commonTypes.RESET_CURRENTS:
            return ({
                ...state,
                currentUser: '',
                currentImage: '',
                isFetching: false,
                isFetched: false,
                error: false,
                alerts: false,
            });
        case userTypeActions.FETCH_USERS_SUCCESS:
            return ({
                ...state,
                users: action.payload,
                isFetching: false,
                isFetched: true,
                error: false,
            });
        case userTypeActions.FETCH_USER_SUCCESS:
            return ({
                ...state,
                currentUser: action.payload,
                isFetching: false,
                isFetched: true,
                error: false,
            });
        case userTypeActions.DELETE_USER_SUCCESS:
            return ({
                ...state,
                //users: deleteAuser(state.users, action.payload),
                users: deleteAux(state.users, action.payload)
                //users: delete state.users[action.payload]
            });
        case commonTypes.IS_FETCHING:
            return ({
                ...state,
                isFetching: action.payload,
                isFetched: false,
                error: false,
                alerts: false
            });
        case commonTypes.IS_FETCHED:
            return ({
                ...state,
                isFetched: action.payload
            });
        case userTypeActions.FIND_USER:
            return ({
                ...state,
                //currentUser: findUserValue(state.users, action.payload)
                currentUser: state.users[action.payload]
            });
        case commonTypes.LOGOUT:
            return ({
                ...state,
                ...INITIAL_STATE
            });
        case userTypeActions.SET_TOGGLE_IMG:
            return ({
                ...state,
                toggleImage: {
                    imgData: action.payload,
                    toggle: !state.toggleImage.toggle
                }
            });
        default:
            return state;
    }
}

export default userReducer;