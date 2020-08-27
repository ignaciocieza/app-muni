import rafamTypeActions from '../../actions/rafam/rafamTypes';

const INITIAL_STATE = {
    rafamData: [],
    isFetchingRafam: false,
    isFetchedRafam:false,
    errorRafam: false,
    alerts: false
};

const rafamReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case rafamTypeActions.SEARCH_BY_FILED_SUCCESS:
            return ({
                ...state,
                rafamData: action.payload,
                isFetchingRafam: false,
                isFetchedRafam: true,
                errorRafam: false,
                alerts: false
            });
        case rafamTypeActions.IS_FETCHING_RAFAM:
            return ({
                ...state,
                isFetchingRafam: action.payload,
                isFetchedRafam: false,
                errorRafam: false,
                alerts: false
            });
        default:
            return state;
    }
}

export default rafamReducer;