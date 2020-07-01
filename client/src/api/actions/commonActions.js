import commonTypes from './commonTypes';

export const setError = (error) => ({
    type: commonTypes.SET_ERROR,
    payload: error
});

export const resetCurrents = () => ({
    type: commonTypes.RESET_CURRENTS,
});

export const setIsHeader = (value) => ({
    type: commonTypes.SET_IS_HEADER,
    payload: value
});

export const setIsFetching = (value) => ({
    type: commonTypes.IS_FETCHING,
    payload: value
});

export const setIsFetched = (value) => ({
    type: commonTypes.IS_FETCHED,
    payload: value
});

export const setErrorDB = (value) => ({
    type: commonTypes.SET_ERROR,
    payload: value
})

/**
 * Puede introducudir un string, si es para una sola alerta.
 * O, un array para varias alertas.
 * @param {Array o String} values 
 */
export const setAlerts = (values) => ({
    type: commonTypes.SET_ALERTS,
    payload: values
});

export const logout = () => ({ type: commonTypes.LOGOUT });