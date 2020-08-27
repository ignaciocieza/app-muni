import mergeTypeActions from './mergeTypeActions';


export const findUserAgenteMerge = (dni) => ({
    type: mergeTypeActions.FIND_USER_AGENTE,
    payload: dni
});

export const fetchUsersAgentesStart = ()=>({
    type: mergeTypeActions.FETCH_USERS_AGENTES_START
});

export const fetchUsersAgentesSuccess =(currentMerge)=>({
    type: mergeTypeActions.FETCH_USERS_AGENTES_SUCCESS,
    payload: currentMerge
})

export const fetchUserAgenteStart = (dni)=>({
    type: mergeTypeActions.FETCH_USER_AGENTE_START,
    payload: dni
});

export const fetchUserAgenteSuccess = (currentMerge)=>({
    type: mergeTypeActions.FETCH_USER_AGENTE_SUCCESS,
    payload: currentMerge
});

export const deleteUserAgenteStart = (id)=>({
    type:mergeTypeActions.DELETE_USER_AGENTE_START,
    payload: id
});

export const deleteUserAgenteSuccess = (id) => ({
    type: mergeTypeActions.DELETE_USER_AGENTE_SUCCESS,
    payload: id
});

export const setCurrentUserAgente = (user) => ({
    type: mergeTypeActions.SET_CURRENT_USER_AGENTE,
    payload: user
});

export const editUserAgenteStart = (userValues)=>({
    type: mergeTypeActions.EDIT_USER_AGENTE_START,
    payload: userValues
});

export const editUserAgenteSuccess = (userValues)=>({
    type: mergeTypeActions.EDIT_USER_AGENTE_SUCCESS,
    payload:userValues
});

export const endSagaTakeStart = ()=>({
    type: mergeTypeActions.END_SAGA_TAKE
});

export const setIsFetchingMerge=(value)=>({
    type: mergeTypeActions.IS_FETCHING_MERGE,
    payload: value
});

export const setErrorMerge = (error) => ({
    type: mergeTypeActions.SET_ERROR_MERGE,
    payload: error
});
