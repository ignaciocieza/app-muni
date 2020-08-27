import rafamTypeActions from './rafamTypes';

export const searchByFieldStart = (fieldAndType) => ({
    type: rafamTypeActions.SEARCH_BY_FILED_START,
    payload: fieldAndType
});

export const searchByFieldSuccess = (array) => ({
    type: rafamTypeActions.SEARCH_BY_FILED_SUCCESS,
    payload: array
});

export const setIsFetchingRafam=(value)=>({
    type: rafamTypeActions.IS_FETCHING_RAFAM,
    payload: value
});