import mergeTypeActions from '../../actions/merge/mergeTypeActions';
import commonTypes from '../../actions/commonTypes';
import { deleteAux } from '../helperFunction';

const INITIAL_STATE = {
    merge: [],
    currentMerge: false,
    isFetchingMerge: false,
    isFetchedMerge: false,
    isHeader: true,
    errorMerge: '',
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
                errorMerge: '',
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
                errorMerge: '',
                alerts: ''
            });
        case mergeTypeActions.IS_FETCHING_MERGE:
            return ({
                ...state,
                isFetchingMerge: action.payload,
                isFetchedMerge: false,
                errorMerge: false,
                alerts: false
            });
        case mergeTypeActions.SET_ERROR_MERGE:
            return ({
                ...state,
                errorMerge: action.payload,
                isFetchingMerge: false,
                isFetchedMerge: false,
            });
        case commonTypes.RESET_CURRENTS:
            return ({
                ...state,
                currentMerge: '',
                isFetchingMerge: false,
                isFetchedMerge: false,
                errorMerge: false,
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