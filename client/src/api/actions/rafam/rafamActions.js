import axios from 'axios';
import { normalize, schema } from 'normalizr';
import rafamTypeActions from './rafamTypes';


export const searchByFieldStart = (fieldAndType) => ({
    type: rafamTypeActions.SEARCH_BY_FILED_START,
    payload: fieldAndType
});

export const searchByFieldSuccess = (array) => ({
    type: rafamTypeActions.SEARCH_BY_FILED_SUCCESS,
    payload: array
});

export const setIsFetchingRafam = (value) => ({
    type: rafamTypeActions.IS_FETCHING_RAFAM,
    payload: value
});

export const setErrorRafam = (error) => ({
    type: rafamTypeActions.SET_ERROR_RAFAM,
    payload: error
});

export const setDataQuery = (dataQuery) => ({
    type: rafamTypeActions.SET_DATA_QUERY,
    payload: dataQuery
});

export const searchByFieldStartThunk = ( payload ) => async dispatch => {
    let auxUser, returnObj, auxIdAttribute;
    const response = await axios.post(
        `/rafam/${payload.type}/${payload.subType}`
        ,
        {
            data: { nro: payload.value }
        },
        {
            cancelToken: payload.signal.token,
        });
    console.dir(response.data)

    switch (payload.type) {
        case 'comercios':
            auxIdAttribute = 'nro_comercio'
            break;
        case 'inmuebles':
            auxIdAttribute = 'nro_inmueble'
            break;
        case 'rodados':
            auxIdAttribute = 'nro_rodado'
            break;
        case 'contribuyentes':
            auxIdAttribute = 'nro_contrib'
            break;
        default:
            break;
    };

    auxUser = new schema.Entity('users', {}, {
        idAttribute: auxIdAttribute,
    });
    returnObj = normalize(response.data, [auxUser]);

    dispatch(searchByFieldSuccess({ key: payload.type, data: returnObj.entities.users }));
}