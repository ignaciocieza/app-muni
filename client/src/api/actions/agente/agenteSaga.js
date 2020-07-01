import { takeLatest, call, all, put } from 'redux-saga/effects';
import { normalize, schema } from 'normalizr';
import axios from 'axios';
import { setAgenteValueSuccess, fetchAgentesSuccess, fetchAgenteSuccess, deleteAgenteSuccess } from './agenteActions';
import { setError } from '../commonActions';
import agenteTypeActions from './agenteTypeActions';
import history from '../../history';

//---"simple" generator functions------//
export function* setAgenteValues({ payload }) {
    let date, auxPost, newAgente = payload;

    try {
        date = new Date().toLocaleString();
        newAgente.fechaAlta = payload.fechaAlta ? payload.fechaAlta : date;
        newAgente.dniPasajeros = payload.dniPasajeros ? payload.dniPasajeros : 'Sin especificar';
        newAgente.observaciones = payload.observaciones ? payload.observaciones : 'Sin especificar';
        newAgente.otroDestinoViaje = payload.otroDestinoViaje ? payload.otroDestinoViaje : 'Sin especificar';
        newAgente.otroAcceso = payload.otroAcceso ? payload.otroAcceso : 'Sin especificar';
        newAgente.otroMotivoViaje = payload.otroMotivoViaje ? payload.otroMotivoViaje : 'Sin especificar';
        newAgente.otroResidencia = payload.otroResidencia ? payload.otroResidencia : 'Sin especificar';
        newAgente.otroTiempoDestino = payload.otroTiempoDestino ? payload.otroTiempoDestino : 'Sin especificar';

        auxPost = yield axios.post('/mariadb/acceso', { type: 'patch', data: newAgente });
    
        if (!auxPost.data.affectedRows) {
            yield axios.post('/mariadb/acceso', { type: 'post', data: newAgente })
        }

        // if (payload.isPatch && payload.currentUser) {
        //     yield axios.post('/mariadb/acceso', { type: 'patch', data: newAgente });
        // } else {
        //     yield axios.post('/mariadb/acceso', { type: 'post', data: newAgente })
        // }
        if (!payload.isPatch) {
            history.push('/home');
        }

        yield put(setAgenteValueSuccess(newAgente));
    } catch (err) {
        console.error(err);
        yield put(setError('Error al cargar el formulario de ingreso y egreso!'));
    }
};

export function* fetchAgentes() {
    let response, auxResponse, returnObj, auxUser;

    try {
        response = yield axios.post('/mariadb/acceso', { type: 'get' });
        auxResponse = response.data;
        auxUser = new schema.Entity('users', {}, {
            idAttribute: 'DNI',
            processStrategy: (value, parent, key) => {
                return ({
                    nombre: value.nombre,
                    apellido: value.apellido,
                    dni: value.DNI,
                    cantidadPasajeros: value.pasajeros,
                    dniPasajeros: value.DNI_pasajeros,
                    acceso: value.acceso_ciudad,
                    residencia: value.residencia,
                    domicilio: value.origen,
                    registro: value.registro,
                    motivoViaje: value.motivo,
                    numeroTelefono: value.numeroTelefono,
                    destinoViaje: value.destino,
                    tiempoDestino: value.tiempo_destino,
                    patente: value.patente,
                    entraCuarentena: value.cuarentena,
                    observaciones: value.observaciones,
                    fechaAlta: value.fecha_alta,
                    otroDestinoViaje: value.otroDestinoViaje,
                    otroAcceso: value.otroAcceso,
                    otroMotivoViaje: value.otroMotivoViaje,
                    otroResidencia: value.otroResidencia,
                    otroTiempoDestino: value.otroTiempoDestino,
                    //agenteDbType: value.agenteDbType,
                    esAgente: 'si'
                })
            }
        });
        if (auxResponse.length) {
            returnObj = normalize(auxResponse, [auxUser]);
            yield put(fetchAgentesSuccess(returnObj.entities.users));
        }
        else {
            yield put(setError('No se pudo obtener informacion de la base de datos.'))
        }
    } catch (err) {
        console.error(err);
        yield put(setError('No se pudo obtener informacion de la base de datos.'))
    }
}

export function* fetchAgente({ payload }) {
    let response, auxResponse;

    try {
        response = yield axios.post('/mariadb/acceso', { type: 'findOne', data: { dni: payload } });
        const {
            DNI, nombre, apellido, pasajeros, DNI_pasajeros,
            acceso_ciudad, residencia, origen,
            registro, motivo, dir_destino, destino,
            tiempo_destino, patente, cuarentena,
            observaciones
        } = response.data[0];

        auxResponse = {
            nombre: nombre,
            apellido: apellido,
            dni: DNI,
            cantidadPasajeros: pasajeros,
            dniPasajeros: DNI_pasajeros,
            acceso: acceso_ciudad,
            residencia: residencia,
            domicilio: origen,
            registro: registro,
            motivoViaje: motivo,
            numeroTelefono: dir_destino,
            destinoViaje: destino,
            tiempoDestino: tiempo_destino,
            patente: patente,
            entraCuarentena: cuarentena,
            observaciones: observaciones,
            esAgente: 'si'
        };
        yield put(fetchAgenteSuccess(auxResponse))
    } catch (err) {
        console.error(err);
        yield put(setError('No se encontro usuario, o error en la base de datos'))
    }

}

export function* deleteAgente({ payload }) {
    try {
        yield axios.post('/mariadb/acceso', { type: 'delete', data: payload });
        yield put(deleteAgenteSuccess(payload))
    } catch (err) {
        console.error(err);
        yield put(setError('No se puede borrar usuario. Reintente!'));
    }
};

//---"on" generator functions------//
export function* onSetAgenteValues() {
    yield takeLatest(agenteTypeActions.SET_AGENTE_VALUES_START, setAgenteValues);
};

export function* onFetchAgentes() {
    yield takeLatest(agenteTypeActions.FETCH_AGENTES_START, fetchAgentes);
};

export function* onFetchAgente() {
    yield takeLatest(agenteTypeActions.FETCH_AGENTE_START, fetchAgente);
};

export function* onDeleteAgente() {
    yield takeLatest(agenteTypeActions.DELETE_AGENTE_START, deleteAgente);
};


export default function* agenteSagas() {
    yield all([
        call(onSetAgenteValues),
        call(onFetchAgentes),
        call(onFetchAgente),
        call(onDeleteAgente),
    ])
}