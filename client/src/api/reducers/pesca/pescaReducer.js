import pescaTypeActions from '../../actions/pesca/pescaTypeActions';
import commonTypes from '../../actions/commonTypes';
import { deleteAux } from '../helperFunction';

const INITIAL_STATE = {
    pescaUsers: false,
    currentePescaUser: '',
    isFetchingPesca: false,
    isFetchedPesca: false,
    pescaError: '',
    alerts: '',
};

const pescaReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case pescaTypeActions.SET_PESCA_VALUES_SUCCESS:
            return ({
                ...state,
                pescaUsers: { ...state.pescaUsers, [action.payload.dni]: action.payload },
                isFetchingPesca: false,
                isFetchedPesca: true,
                pescaError: '',
                alerts: ''
            });
        case commonTypes.IS_FETCHING:
            return ({
                ...state,
                isFetchingPesca: action.payload,
                isFetchedPesca: false,
                pescaError: false,
                alerts: false
            });
        case commonTypes.SET_ALERTS:
            return ({
                ...state,
                alerts: action.payload
            });
        case pescaTypeActions.FETCH_PESCAS_SUCCESS:
            return ({
                ...state,
                pescaUsers: action.payload,
                isFetchingPesca: false,
                isFetchedPesca: true,
                pescaError: false,
            });
        case pescaTypeActions.FETCH_PESCA_SUCCESS:
            return ({
                ...state,
                currentePescaUser: action.payload,
                isFetchingPesca: false,
                isFetchedPesca: true,
                pescaError: false,
            });
        case pescaTypeActions.RESET_CURRENTS:
            return ({
                ...state,
                currentePescaUser: '',
                isFetchingPesca: false,
                isFetchedPesca: false,
                pescaError: false,
                alerts: false,
            });
        case pescaTypeActions.DELETE_PESCA_SUCCESS:
            return ({
                ...state,
                pescaUsers: deleteAux(state.pescaUsers, action.payload)
            });
        case pescaTypeActions.SET_PESCA_ERROR:
            return ({
                ...state,
                pescaError: action.payload,
                isFetchingPesca: false,
                isFetchedPesca: false,
            });
        case commonTypes.LOGOUT:
            return ({
                ...state,
                ...INITIAL_STATE
            });
        default:
            return state;
    }
}

export default pescaReducer;