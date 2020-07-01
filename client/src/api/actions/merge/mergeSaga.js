import { takeLatest, take, call, all, put } from 'redux-saga/effects';
import { fetchUsersStart, fetchUserStart, deleteUserStart, setUserStart } from '../user/userActions';
import { fetchAgentesStart, fetchAgenteStart, deleteAgenteStart, setAgenteValuesStart } from '../agente/agenteActions';
import { fetchUsersAgentesSuccess, fetchUserAgenteSuccess, deleteUserAgenteSuccess, editUserAgenteSuccess } from './mergeActions';
import { setError } from '../commonActions';
import history from '../../history';
import mergeTypeActions from './mergeTypeActions';
import userTypeActions from "../user/userTypeActions";
import agenteTypeActions from '../agente/agenteTypeActions';
import commonTypes from '../commonTypes';


function merge(firstArg, secondArg) {
    let a1 = Object.values(firstArg);
    let a2 = Object.values(secondArg);
    let hash = Object.create(null);
    a1.concat(a2).forEach(function (obj) {
        hash[obj.dni] = Object.assign(hash[obj.dni] || {}, obj);
    });
    // let a3 = Object.keys(hash).map(function (key) {
    //     return hash[key];
    // });
    //console.dir(hash)
    // console.dir(a1)
    // console.dir(a2)
    return hash
}

export function* fetchUsersAgentes() {
    try {
        let users, agentes, error;
        yield put(fetchUsersStart());
        yield put(fetchAgentesStart());
        yield take(action => {
            if (action.type === agenteTypeActions.FETCH_AGENTES_SUCCESS) {
                agentes = action.payload;
            };
            if (action.type === userTypeActions.FETCH_USERS_SUCCESS) {
                users = action.payload;
            }
            if (action.type === commonTypes.SET_ERROR) {
                error = true;
            }
            if ((agentes && users) || (agentes && error) || (users && error)) {
                return 'ok'
            }
        });
        if (agentes && users) {
            const objReturn = yield call(merge, users, agentes);
            yield put(fetchUsersAgentesSuccess(objReturn));
        } else if (agentes) {
            yield put(fetchUsersAgentesSuccess(agentes));
        } else if (users) {
            yield put(fetchUsersAgentesSuccess(users));
        } else {
            yield put(setError('No existe el usuario'))
        }
    } catch (err) {
        console.error(err);
        yield put(setError('No se pudo obtener informacion de la base de datos.'))
    }
}

export function* fetchUserAgente({ payload }) {
    try {
        let user, agente, error;
        yield put(fetchUserStart(payload));
        yield put(fetchAgenteStart(payload));
        yield take(action => {
            if (action.type === agenteTypeActions.FETCH_AGENTE_SUCCESS) {
                agente = action.payload;
            };
            if (action.type === userTypeActions.FETCH_USER_SUCCESS) {
                user = action.payload;
            }
            if (action.type === commonTypes.SET_ERROR) {
                error = true;
            }
            if ((agente && user) || (agente && error) || (user && error)) {
                return 'ok'
            }
        });
        if (agente && user) {
            yield put(fetchUserAgenteSuccess({ ...user, ...agente }));
        } else if (agente) {
            yield put(fetchUserAgenteSuccess(agente));
        } else if (user) {
            yield put(fetchUserAgenteSuccess(user));
        } else {
            yield put(setError('No existe el usuario'))
        }
    } catch (err) {
        console.error(err);
        yield put(setError('No se pudo obtener informacion de la base de datos.'))
    }
}

export function* deleteUserAgente({ payload }) {
    try {
        yield put(deleteUserStart(payload));
        yield put(deleteAgenteStart(payload))
        yield put(deleteUserAgenteSuccess(payload));
    } catch (err) {
        console.error(err);
        yield put(setError('No se puede borrar usuario. Reintente!'));
    }
}

export function* editUserAgente({ payload }) {
    try {
        let user, agente, error;
        yield put(setUserStart(payload));
        yield put(setAgenteValuesStart({...payload,image:''}));
        //dispatch(setAgenteValuesStart({ ...userValues, currentUser: !!currentUser, isPatch: true }));
        //dispatch(setUserStart({ ...userValues, image: currentImage, currentUser: !!currentUser,  isPatch: true }));
        yield take(action => {
            if (action.type === agenteTypeActions.SET_AGENTE_VALUES_SUCCESS) {
                agente = action.payload;
            };
            if (action.type === userTypeActions.SET_USER_SUCCESS) {
                user = action.payload;
            }
            if (action.type === commonTypes.SET_ERROR) {
                error = true;
            }
            if ((agente && user) || (agente && error) || (user && error)) {
                return 'ok'
            }
        });
        if (agente || user) {
            yield put(editUserAgenteSuccess(payload))
            history.push(`/detail/${payload.dni}`);
        } else {
            yield put(setError('No existe el usuario'))
        }
    } catch (err) {
        console.error(err);
        yield put(setError('No se pudo obtener informacion de la base de datos.'))
    }
}

//-------On functions---------//

export function* onFetchUsersAgentes() {
    yield takeLatest(mergeTypeActions.FETCH_USERS_AGENTES_START, fetchUsersAgentes)
};

export function* onFetchUserAgente() {
    yield takeLatest(mergeTypeActions.FETCH_USER_AGENTE_START, fetchUserAgente)
};

export function* onDeleteAgente() {
    yield takeLatest(mergeTypeActions.DELETE_USER_AGENTE_START, deleteUserAgente);
};

export function* onEditUserAgente() {
    yield takeLatest(mergeTypeActions.EDIT_USER_AGENTE_START, editUserAgente);
};

export default function* mergeSaga() {
    yield all([
        call(onFetchUsersAgentes),
        call(onFetchUserAgente),
        call(onDeleteAgente),
        call(onEditUserAgente),
    ])
}