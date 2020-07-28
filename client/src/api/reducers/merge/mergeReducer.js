import mergeTypeActions from '../../actions/merge/mergeTypeActions';
import commonTypes from '../../actions/commonTypes';
import { deleteAux } from '../helperFunction';

const INITIAL_STATE = {
    merge: [],
    currentMerge: false,
    isFetchingMerge: false,
    isFetchedMerge: false,
    isHeader: true,
    error: '',
    alerts: '',
};

const mergeReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case mergeTypeActions.FETCH_USERS_AGENTES_SUCCESS:
            return ({
                ...state,
                merge: action.payload,
                isFetchingMerge: false,
                isFetchedMerge: true,
                error: '',
                alerts: '',
            });
        case mergeTypeActions.FETCH_USER_AGENTE_SUCCESS:
            return ({
                ...state,
                currentMerge: action.payload,
                isFetchingMerge: false,
                isFetchedMerge: true,
                error: '',
                alerts: '',
            });
        case mergeTypeActions.FIND_USER_AGENTE:
            return ({
                ...state,
                currentMerge: state.merge[action.payload]
            });
        case mergeTypeActions.DELETE_USER_AGENTE_SUCCESS:
            return ({
                ...state,
                merge: deleteAux(state.merge, action.payload)
            });
        case mergeTypeActions.SET_CURRENT_USER_AGENTE:
            return ({
                ...state,
                currentMerge: action.payload
            });
        case mergeTypeActions.EDIT_USER_AGENTE_SUCCESS:
            return ({
                ...state,
                currentMerge: action.payload,
                isFetchingMerge: false,
                isFetchedMerge: true,
                error: '',
                alerts: ''
            });
        case commonTypes.SET_ERROR:
            return ({
                ...state,
                error: action.payload,
                isFetchingMerge: false,
                isFetchedMerge: false,
            });
        case commonTypes.IS_FETCHING:
            return ({
                ...state,
                isFetchingMerge: action.payload,
                isFetchedMerge: false,
                error: false,
                alerts: false
            });
        case commonTypes.RESET_CURRENTS:
            return ({
                ...state,
                currentMerge: '',
                isFetchingMerge: false,
                isFetchedMerge: false,
                error: false,
            });
        case commonTypes.SET_ALERTS:
            return ({
                ...state,
                alerts: action.payload
            });
        case commonTypes.LOGOUT:
            return ({
                ...state,
                ...INITIAL_STATE
            });
        default:
            return state;
    }
};

export default mergeReducer;