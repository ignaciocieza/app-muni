import pescaTypeActions from './pescaTypeActions';

export const setPescaValuesStart = (values) => ({
    type: pescaTypeActions.SET_PESCA_VALUES_START,
    payload: values
});

export const setPescaValuesSuccess = (values) => ({
    type: pescaTypeActions.SET_PESCA_VALUES_SUCCESS,
    payload: values
});

export const fetchPescasStart = () => ({
    type: pescaTypeActions.FETCH_PESCAS_START
});

export const fetchPescasSuccess = (Pesca) => ({
    type: pescaTypeActions.FETCH_PESCAS_SUCCESS,
    payload: Pesca
});

export const fetchPescaStart = (dni)=>({
    type: pescaTypeActions.FETCH_PESCA_START,
    payload: dni
});

export const fetchPescaSuccess=(user)=>({
    type: pescaTypeActions.FETCH_PESCA_SUCCESS,
    payload: user
});

export const deletePescaStart = (id)=>({
    type: pescaTypeActions.DELETE_PESCA_START,
    payload: id
});

export const deletePescaSuccess=(id)=>({
    type: pescaTypeActions.DELETE_PESCA_SUCCESS,
    payload: id
});