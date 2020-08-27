import { takeLatest, call, all, put } from 'redux-saga/effects';
import { normalize, schema } from 'normalizr';
import axios from 'axios';
import {
    setAgenteValueSuccess,
    fetchAgentesSuccess,
    fetchAgenteSuccess,
    deleteAgenteSuccess,
    setAgenteError
} from './agenteActions';
import { setUserStart } from '../user/userActions';
import agenteTypeActions from './agenteTypeActions';
import { sinEspecificar, oneLeter } from '../../../constants';
import history from '../../history';

//---"simple" generator functions------//
export function* setAgenteValues({ payload }) {
    //!!!!newAgente = {...payload} --> 'deep copy', 
    //!!!para evitar que al copiar objetos, se copie el puntero( valor por fererencia)
    let auxPost, newAgente = { ...payload };

    try {
        // date = new Date().toLocaleString();
        // newAgente.fechaAlta = payload.fechaAlta ? payload.fechaAlta : date;
        newAgente.image = false;
        newAgente.qrData = false;
        newAgente.entraCuarentena = payload.entraCuarentena ? payload.entraCuarentena : oneLeter;
        newAgente.cantidadPasajeros = payload.cantidadPasajeros ? payload.cantidadPasajeros : oneLeter;
        [
            'dniPasajeros', 'otroDestinoViaje', 'patente',
            'otroAcceso', 'otroMotivoViaje', 'destinoViaje',
            'otroResidencia', 'otroTiempoDestino', 'tiempoDestino',
            'registro', 'motivo', 'origen', 'destino',
            'pantente', 'cuarentena', 'observaciones',
            'acceso', 'residencia', 'domicilio',
            'motivoViaje', 'otroMotivoViaje', 'numeroTelefono', 'fechaAlta'
        ].forEach(item => newAgente[item] = payload[item] ? payload[item] : sinEspecificar)

        auxPost = yield axios.post('/mariadb/acceso', { type: 'patch', data: newAgente });

        if (!auxPost.data.affectedRows) {
            yield axios.post('/mariadb/acceso', { type: 'post', data: newAgente })
        }
        if (payload.isRedirect) {
            history.push('/home');
        }
        yield put(setAgenteValueSuccess(newAgente));
        yield put(setUserStart({ ...payload, isRedirect: false, permisoTipo: payload.permisoTipo ? payload.permisoTipo : 'INGRESO EGRESO' }));
    } catch (err) {
        console.error(err);
        yield put(setAgenteError('Error al cargar el formulario de ingreso y egreso!'));
    }
};

export function* fetchAgentes() {
    let response, auxResponse, returnObj, auxUser;

    try {
        response = yield axios.post('/mariadb/acceso', { type: 'get' });
        auxResponse = response.data;

        if (auxResponse.length) {
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
                        //esAgente: 'si'
                    })
                }
            });
            returnObj = normalize(auxResponse, [auxUser]);
            yield put(fetchAgentesSuccess(returnObj.entities.users));
        }
        else {
            yield put(setAgenteError('No se pudo obtener informacion de la base de datos.'))
        }
    } catch (err) {
        console.error(err);
        yield put(setAgenteError('No se pudo obtener informacion de la base de datos.'))
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
        } = response.data[0] ? response.data[0] : '';

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
            //esAgente: 'si'
        };
        yield put(fetchAgenteSuccess(auxResponse))
    } catch (err) {
        console.error(err);
        yield put(setAgenteError('No se encontro usuario, o error en la base de datos'))
    }
}

export function* deleteAgente({ payload }) {
    try {
        yield axios.post('/mariadb/acceso', { type: 'delete', data: payload });
        yield put(deleteAgenteSuccess(payload))
    } catch (err) {
        console.error(err);
        yield put(setAgenteError('No se puede borrar usuario. Reintente!'));
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