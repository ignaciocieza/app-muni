import agenteTypeActions from '../actions/agente/agenteTypeActions';
import commonTypes from '../actions/commonTypes';
import { deleteAux } from './helperFunction';
/**
 * agentes --> db "acceso"
 */
const INITIAL_STATE = {
    agentes: false,
    agente: '',
    currenteAgente: '',
    isFetchingAgente: false,
    isFetchedAgente: false,
    error: '',
    alerts: '',
};

const accesoReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case commonTypes.SET_ALERTS:
            return ({
                ...state,
                alerts: action.payload
            });
        case agenteTypeActions.SET_AGENTE_SUCCESS:
            return ({
                ...state,
                agente: action.payload
            });
        case agenteTypeActions.SET_AGENTE_VALUES_SUCCESS:
            return ({
                ...state,
                agentes: { ...state.agentes, [action.payload.dni]: action.payload },
                isFetchingAgente: false,
                isFetchedAgente: true,
                error: '',
                alerts: ''
            });
        case commonTypes.IS_FETCHING:
            return ({
                ...state,
                isFetchingAgente: action.payload,
                isFetchedAgente: false,
                error: false,
                alerts: false
            });
        case agenteTypeActions.FETCH_AGENTES_SUCCESS:
            return ({
                ...state,
                agentes: action.payload,
                isFetchingAgente: false,
                isFetchedAgente: true,
                error: false,
            });
        case agenteTypeActions.FETCH_AGENTE_SUCCESS:
            return ({
                ...state,
                currenteAgente: action.payload,
                isFetchingAgente: false,
                isFetchedAgente: true,
                error: false,
            })

        case agenteTypeActions.RESET_CURRENTS:
            return ({
                ...state,
                currentUser: '',
                isFetchingAgente: false,
                isFetchedAgente: false,
                error: false,
                alerts: false,
            });
        case commonTypes.LOGOUT:
            return ({
                ...state,
                ...INITIAL_STATE
            });
        case agenteTypeActions.DELETE_AGENTE_SUCCESS:
            return ({
                ...state,
                agentes: deleteAux(state.agentes, action.payload)
            });
        case commonTypes.SET_ERROR:
            return ({
                ...state,
                error: action.payload,
                isFetchingAgente: false,
                isFetchedAgente: false,
            });
        default:
            return state;
    }
}

export default accesoReducer;