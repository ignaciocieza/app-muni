import agenteTypeActions from './agenteTypeActions';

/**
 * Funcion que se encuentra en "user/userSaga.js"
 * @param {agente} email 
 */
export const setAgenteSuccess = (email) => ({
    type: agenteTypeActions.SET_AGENTE_SUCCESS,
    payload: email
});

export const setAgenteValuesStart = (agenteValues) => ({
    type: agenteTypeActions.SET_AGENTE_VALUES_START,
    payload: agenteValues
});

export const setAgenteValueSuccess = (agenteValues) => ({
    type: agenteTypeActions.SET_AGENTE_VALUES_SUCCESS,
    payload: agenteValues
});

export const fetchAgentesStart = () => ({
    type: agenteTypeActions.FETCH_AGENTES_START
});

export const fetchAgentesSuccess = (agentes) => ({
    type: agenteTypeActions.FETCH_AGENTES_SUCCESS,
    payload: agentes
});

export const fetchAgenteStart = (dni) => ({
    type: agenteTypeActions.FETCH_AGENTE_START,
    payload: dni
});

export const fetchAgenteSuccess = (agente) => ({
    type: agenteTypeActions.FETCH_AGENTE_SUCCESS,
    payload: agente
});

export const deleteAgenteStart = (id) => ({
    type: agenteTypeActions.DELETE_AGENTE_START,
    payload: id
})

export const deleteAgenteSuccess = (id) => ({
    type: agenteTypeActions.DELETE_AGENTE_SUCCESS,
    payload: id
})