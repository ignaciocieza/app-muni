import rafamTypeActions from '../../actions/rafam/rafamTypes';
import commonTypes from '../../actions/commonTypes';

const INITIAL_STATE = {
    dataQuery:{},
    isFetchingRafam: false,
    isFetchedRafam: false,
    errorRafam: false,
    alerts: false,
    contribuyentes:{}
};

const rafamReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case rafamTypeActions.SEARCH_BY_FILED_SUCCESS:
            return ({
                ...state,
                [action.payload.key]:{...state[action.payload.key],...action.payload.data},
                isFetchingRafam: false,
                isFetchedRafam: true,
                errorRafam: false,
                alerts: false
            });
        case rafamTypeActions.SET_DATA_QUERY:
            return ({
                ...state,
                dataQuery: action.payload
            });
        case rafamTypeActions.IS_FETCHING_RAFAM:
            return ({
                ...state,
                isFetchingRafam: action.payload,
                isFetchedRafam: false,
                errorRafam: false,
                alerts: false
            });
        case rafamTypeActions.SET_ERROR_RAFAM:
            return ({
                ...state,
                errorRafam: action.payload,
                isFetchingRafam: false,
                isFetchedRafam: false,
            });
        case commonTypes.RESET_CURRENTS:
            return ({
                ...state,
                isFetchingRafam: false,
                isFetchedRafam: false,
                errorRafam: false,
            });
        default:
            return state;
    }
}

export default rafamReducer;