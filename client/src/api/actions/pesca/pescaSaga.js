import { takeLatest, call, all, put } from 'redux-saga/effects';
import { normalize, schema } from 'normalizr';
import axios from 'axios';
import { setPescaValuesSuccess, fetchPescasSuccess, fetchPescaSuccess, deletePescaSuccess } from './pescaActions';
import pescaTypeActions from './pescaTypeActions';
//import { setUserStart } from '../user/userActions';
import { setAgenteValuesStart } from '../agente/agenteActions';
import { setError } from '../commonActions';
import { sinEspecificar } from '../../../constants';
import history from '../../history';

//---"simple" generator functions------//

export function* setPescaValues({ payload }) {
    let auxPost, objToDB;

    try {
        objToDB = {
            dni: payload.dni,
            fecha: payload.fechaPesca ? payload.fechaPesca : sinEspecificar,
            lugarPesca: payload.lugarPesca ? payload.lugarPesca : sinEspecificar
        }

        auxPost = yield axios.post('/mariadb/pesca', { type: 'patch', data: objToDB });

        if (!auxPost.data.affectedRows) {
            yield axios.post('/mariadb/pesca', { type: 'post', data: objToDB })
        }
        if (payload.isRedirect) {
            history.push('/home');
        }
        yield put(setPescaValuesSuccess(payload));
        yield put(setAgenteValuesStart({ ...payload, permisoTipo: payload.permisoTipo ? payload.permisoTipo : 'PESCA', isRedirect: false }));
        //yield put(setUserStart({ ...payload, isRedirect: false, permisoTipo: payload.permisoTipo ? payload.permisoTipo : 'PESCA' }));
    } catch (err) {
        console.error(err);
        yield put(setError('Error al cargar el formulario de Pesca!'));
    }
}

export function* fetchPescas() {
    let respData, auxResponse, returnObj, auxPesca;

    try {
        respData = yield axios.post('/mariadb/pesca', { type: 'get' });
        auxResponse = respData.data;

        if (auxResponse.length) {
            auxPesca = new schema.Entity('users', {}, {
                idAttribute: 'DNI',
                processStrategy: (value, parent, key) => {
                    return ({
                        dni: value.DNI,
                        lugarPesca: value.lugardepesca,
                        fechaPesca: value.fecha
                    })
                }
            });
            returnObj = normalize(auxResponse, [auxPesca]);
            yield put(fetchPescasSuccess(returnObj.entities.users));
        }
        else {
            yield put(setError('No se pudo obtener informacion de la base de datos.'))
        }
    } catch (err) {
        console.error(err);
        yield put(setError('No se pudo obtener informacion de la base de datos.'))
    }
};

export function* fetchPesca({ payload }) {
    let response, auxResponse;

    try {
        response = yield axios.post('/mariadb/pesca', { type: 'findOne', data: { dni: payload } });
        const { fecha, lugardepesca, DNI } = response.data[0] ? response.data[0] : '';

        auxResponse = {
            dni: DNI,
            lugarPesca: lugardepesca,
            fechaPesca: fecha
        };
        yield put(fetchPescaSuccess(auxResponse))
    } catch (err) {
        console.error(err);
        yield put(setError('No se encontro usuario, o error en la base de datos.'))
    }
};

export function* deletePesca({ payload }) {
    try {
        yield axios.post('/mariadb/pesca', { type: 'delete', data: payload });
        yield put(deletePescaSuccess(payload))
    } catch (err) {
        console.error(err);
        yield put(setError('No se puede borrar usuario. Reintente!'));
    }
};

//---"on" generator functions------//

export function* onSetPescaValues() {
    yield takeLatest(pescaTypeActions.SET_PESCA_VALUES_START, setPescaValues);
};

export function* onFetchPescas() {
    yield takeLatest(pescaTypeActions.FETCH_PESCAS_START, fetchPescas);
};

export function* onFetchPesca() {
    yield takeLatest(pescaTypeActions.FETCH_PESCA_START, fetchPesca);
};

export function* onDeletePesca() {
    yield takeLatest(pescaTypeActions.DELETE_PESCA_START, deletePesca);
};

//---"all" generator functions------//
export default function* pescaSagas() {
    yield all([
        call(onSetPescaValues),
        call(onFetchPescas),
        call(onFetchPesca),
        call(onDeletePesca),
    ])
}