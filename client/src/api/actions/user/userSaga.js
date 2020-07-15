import { takeLatest, call, all, put } from 'redux-saga/effects';
import { normalize, schema } from 'normalizr';
import history from '../../history';
import axios from 'axios';
import QRCode from 'qrcode';
import { customAlphabet } from 'nanoid';
import {
    fetchUsersSuccess,
    fetchUserSuccess,
    setUserSuccess,
    deleteUserSuccess,
    setAdminSuccess,
} from './userActions';
import { setAgenteSuccess } from '../agente/agenteActions';
import { setAlerts, setError } from '../commonActions';
import { bufferToImage, imageToBuffer } from '../herlperFunction';
import userTypeActions from './userTypeActions';

//---"simple" generator functions------//

export function* fetchUsers() {
    let respData, auxResponse, returnObj, auxUser;

    try {
        respData = yield axios.post('/mariadb', { type: 'get' });
        auxResponse = respData.data;
        auxUser = new schema.Entity('users', {}, {
            idAttribute: 'DNI',
            processStrategy: (value, parent, key) => {
                return ({
                    nombre: value.nombre,
                    apellido: value.apellido,
                    permiso: value.permiso,
                    comentario: value.comentario,
                    image: bufferToImage(value.DNI_imagen),
                    dni: value.DNI,
                    numeroControl: value.num_control,
                    qrData: bufferToImage(value.imagen),
                    numeroTelefono: value.tel,
                    domicilio: value.dir,
                    nombreComercio: value.comercio,
                    email: value.correo,
                    permisoTipo: value.tipo_permiso,
                    fechaModificacion: value.fecha_mod,
                    fechaAlta: value.fecha_alta,
                    userDbType: value.userDbType
                })
            }
        });
        if (auxResponse.length) {
            returnObj = normalize(auxResponse, [auxUser]);
            yield put(fetchUsersSuccess(returnObj.entities.users));
        }
        else {
            yield put(setError('No se pudo obtener informacion de la base de datos.'))
        }
    } catch (err) {
        console.error(err);
        yield put(setError('No se pudo obtener informacion de la base de datos.'))
    }
};

export function* fetchUser({ payload }) {
    let response, auxResponse;

    try {
        response = yield axios.post('/mariadb', { type: 'findOne', data: { dni: payload } });
        const { nombre, apellido, permiso, comentario,
            DNI_imagen, DNI, num_control, imagen,
            tel, dir, comercio, correo, tipo_permiso, fecha_alta, fecha_mod
        } = response.data[0];

        auxResponse = {
            nombre: nombre,
            apellido: apellido,
            permiso: permiso,
            comentario: comentario,
            image: bufferToImage(DNI_imagen),
            dni: DNI,
            numeroControl: num_control,
            qrData: bufferToImage(imagen),
            numeroTelefono: tel,
            domicilio: dir,
            nombreComercio: comercio,
            email: correo,
            permisoTipo: tipo_permiso,
            fechaModificacion: fecha_mod,
            fechaAlta: fecha_alta
        };
        yield put(fetchUserSuccess(auxResponse))
    } catch (err) {
        console.error(err);
        yield put(setError('No se encontro usuario, o error en la base de datos'))
    }
};

export function* setUser({ payload }) {
    let newUser = payload;
    let qrCode, nanoid;
    let error = 'Error interno del sistema';
    let date, auxPost;

    try {
        newUser.image = ((payload.image) && (payload.image !== 'Sin especificar')) ? yield imageToBuffer(payload.image) : 'Sin especificar';
        newUser.nombreComercio = payload.nombreComercio ? payload.nombreComercio : 'Sin especificar';
        newUser.domicilio = payload.domicilio ? payload.domicilio : 'Sin especificar';
        newUser.email = payload.email ? payload.email : 'sin@especificar.com';
        //https://stackoverflow.com/questions/2013255/how-to-get-year-month-day-from-a-date-object
        //newUser.fechaAlta =  new Date().toLocaleString().split(' ')[0];
        date = new Date().toLocaleString();
        newUser.fechaAlta = payload.fechaAlta ? payload.fechaAlta : date;
        newUser.fechaModificacion = date;

        if (!payload.numeroControl) {
            nanoid = customAlphabet(payload.dni.toString(), 10);
            newUser.numeroControl = nanoid();
        }

        if (payload.permiso === 'PENDIENTE') {
            newUser.qrData = 'nodata';
        } else {
            qrCode = yield QRCode.toDataURL(`https://permiso.lasflores.gob.ar/detail/${newUser.dni}`);
            newUser.qrData = qrCode;
        }

        auxPost = yield axios.post('/mariadb', { type: 'patch', data: newUser });

        if (!auxPost.data.affectedRows) {
            yield axios.post('/mariadb', { type: 'post', data: newUser });
        }

        if (payload.permiso === 'PENDIENTE') {
            history.push('/home');
        } else {
            history.push(`/detail/${newUser.dni}`);
        }

        yield put(setUserSuccess(newUser));
    } catch (err) {
        console.error(err);
        yield put(setError(error));
    }
};

export function* deleteUser({ payload }) {
    try {
        yield axios.post('/mariadb', { type: 'delete', data: payload });
        yield put(deleteUserSuccess(payload))
    } catch (err) {
        console.error(err);
        yield put(setError('No se puede borrar usuario. Reintente!'));
    }
};

export function* setAdmin({ payload }) {
    const { email, password, isSignUp, newPassword } = payload;
    let response;
    try {
        if (isSignUp) {
            response = yield axios.post('/mariadb/signup', { email, newPassword, password });
        } else {
            response = yield axios.post('/mariadb/login', { email, password });
        }
        if (response) {
            if (response.data.isUser) {
                if (email === 'agente@transito.com.ar') {
                    yield put(setAgenteSuccess(email));
                } else {
                    yield put(setAdminSuccess(email));
                }
                history.push('/home');
            }
            else {
                yield put(setAlerts('El email o la contraseña son incorrectos. Reintente!'));
            }
        }
    } catch (error) {
        console.log(error);
        yield put(setAlerts('El email o la contraseña son incorrectos. Reintente!'));
    }
}

//---"on" generator functions------//

export function* onFetchUsers() {
    yield takeLatest(userTypeActions.FETCH_USERS_START, fetchUsers);
};

export function* onFetchUser() {
    yield takeLatest(userTypeActions.FETCH_USER_START, fetchUser);
};

export function* onSetUser() {
    yield takeLatest(userTypeActions.SET_USER_START, setUser);
};

export function* onDeleteUser() {
    yield takeLatest(userTypeActions.DELETE_USER_START, deleteUser);
};

export function* onSetAdmin() {
    yield takeLatest(userTypeActions.SET_ADMIN_START, setAdmin);
};

//---"all" generator functions------//

export default function* userSagas() {
    yield all([
        call(onFetchUsers),
        call(onFetchUser),
        call(onSetUser),
        call(onDeleteUser),
        call(onSetAdmin)
    ])
}