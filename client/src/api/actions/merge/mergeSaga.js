import { takeLatest, take, call, all, put, delay, fork, cancel } from 'redux-saga/effects';
import merge from 'deepmerge';
import { fetchUsersStart, fetchUserStart, deleteUserStart } from '../user/userActions';
import { fetchAgentesStart, fetchAgenteStart, deleteAgenteStart, setAgenteValuesStart } from '../agente/agenteActions';
import {
    fetchUsersAgentesSuccess,
    fetchUserAgenteSuccess,
    deleteUserAgenteSuccess,
    editUserAgenteSuccess,
    endSagaTakeStart,
    setErrorMerge
} from './mergeActions';
import { fetchPescasStart, fetchPescaStart, deletePescaStart, setPescaValuesStart } from '../pesca/pescaActions';
import history from '../../history';
import mergeTypeActions from './mergeTypeActions';
import userTypeActions from "../user/userTypeActions";
import agenteTypeActions from '../agente/agenteTypeActions';
import pescaTypeActions from '../pesca/pescaTypeActions';
//import { setError } from '../commonActions';
import { sinEspecificar } from '../../../constants';

const delayTime = 5000;

/**
 * Funcion que despacha un actions
 * que detine el flujo de saga take
 * @param {MiliSec} delayValue 
 */
export function* endSagaTake(delayValue) {
    yield delay(delayValue);
    yield put(endSagaTakeStart())
}

/**
 * Uso tabla "users" como tabla que siempre va a existir
 * Otra funcion de Merge --> "info.txt" -> "Otras funciones"
 */
export function* fetchUsersAgentes() {
    try {
        let users, agentes, pescas, auxFork;
        //En ultimo lugar la tabla "user", ya que siempre tiene que existir
        yield put(fetchPescasStart());
        yield put(fetchAgentesStart());
        yield put(fetchUsersStart());
        auxFork = yield fork(endSagaTake, delayTime);

        yield take((action) => {
            switch (action.type) {
                case pescaTypeActions.FETCH_PESCAS_SUCCESS:
                    pescas = action.payload;
                    break;
                case agenteTypeActions.FETCH_AGENTES_SUCCESS:
                    agentes = action.payload;
                    break;
                case userTypeActions.FETCH_USERS_SUCCESS:
                    users = action.payload;
                    break;
                case mergeTypeActions.END_SAGA_TAKE:
                    return 'ok'
                default:
                    break;
            }
            if (users) {
                return 'ok';
            }
            // if (action.type === pescaTypeActions.FETCH_PESCAS_SUCCESS) {
            //     pescas = action.payload;
            // }
            // if (action.type === agenteTypeActions.FETCH_AGENTES_SUCCESS) {
            //     agentes = action.payload;
            // };
            // if (action.type === userTypeActions.FETCH_USERS_SUCCESS) {
            //     users = action.payload;
            // }
            // if (action.type === mergeTypeActions.END_SAGA_TAKE) {
            //     return 'ok';
            // }
            //---!!!PROBAR QUE CARGE LAS BASES CORRESPONDIENTES!!!
            // if (action.type === commonTypes.SET_ERROR) {
            //     error = true;
            // }
            //error++;
            //!!!error -> fijarse la cantida de errores con:
            // !!!!console.log(action) y console.log(error)  !!!!
        });

        yield cancel(auxFork);

        if (users) {
            /**Prioridad de derecha a izq */
            const objReturn = yield call(merge.all, [(agentes ? agentes : {}), (pescas ? pescas : {}), users]);
            yield put(fetchUsersAgentesSuccess(objReturn));
        } else {
            yield put(setErrorMerge('No existe el usuario'))
        }
    } catch (err) {
        console.error(err);
        yield put(setErrorMerge('No se pudo obtener informacion de la base de datos.'))
    }
}

export function* fetchUserAgente({ payload }) {
    try {
        let user, agente, pesca;

        yield put(fetchPescaStart(payload));
        yield put(fetchAgenteStart(payload));
        yield put(fetchUserStart(payload));
        //auxFork = yield fork(endSagaTake, delayTime);

        yield take(action => {
            switch (action.type) {
                case pescaTypeActions.FETCH_PESCA_SUCCESS:
                    pesca = action.payload;
                    break;
                case agenteTypeActions.FETCH_AGENTE_SUCCESS:
                    agente = action.payload;
                    break;
                case userTypeActions.FETCH_USER_SUCCESS:
                    user = action.payload;
                    break;
                // case mergeTypeActions.END_SAGA_TAKE:
                //     return 'ok'
                default:
                    break;
            }
            // if (user && agente && pesca) {
            //     return 'ok';
            // }
            if (user) {
                return 'ok'
            }
        });

        //yield cancel(auxFork);

        if (user) {
            const objReturn = yield call(merge.all, [(agente ? agente : {}), (pesca ? pesca : {}), user]);
            yield put(fetchUserAgenteSuccess(objReturn));
        } else {
            yield put(setErrorMerge('No existe el usuario'))
        }
    } catch (err) {
        console.error(err);
        yield put(setErrorMerge('No se pudo obtener informacion de la base de datos.'))
    }
}

export function* deleteUserAgente({ payload }) {
    try {
        yield put(deleteUserStart(payload));
        yield put(deleteAgenteStart(payload));
        yield put(deletePescaStart(payload));
        yield put(deleteUserAgenteSuccess(payload));
    } catch (err) {
        console.error(err);
        yield put(setErrorMerge('No se puede borrar usuario. Reintente!'));
    }
}

/**
 * 
 * @param {*} param0 
 */
export function* editUserAgente({ payload }) {
    try {
        let user;

        //auxFork = yield fork(endSagaTake, delayTime);

        if (payload.fechaPesca && (payload.fechaPesca !== sinEspecificar)) {
            yield put(setPescaValuesStart(payload))
        } else {
            yield put(setAgenteValuesStart(payload));
        }

        yield take((action) => {
            switch (action.type) {
                // case mergeTypeActions.END_SAGA_TAKE:
                //     return 'ok';
                case userTypeActions.SET_USER_SUCCESS:
                    user = true;
                    return 'ok';
                default:
                    break;
            }
        });

        //yield cancel(auxFork);

        if (user) {
            yield put(editUserAgenteSuccess(payload))
            history.push(`/detail/${payload.dni}`);
        }
        else {
            yield put(setErrorMerge('No se pudieron modificar los datos. Reintente!'))
        }
    } catch (err) {
        console.error(err);
        yield put(setErrorMerge('No se pudo obtener informacion de la base de datos.'))
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