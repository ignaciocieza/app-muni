import { takeLatest, take, call, all, put } from 'redux-saga/effects';
import merge from 'deepmerge';
import { fetchUsersStart, fetchUserStart, deleteUserStart } from '../user/userActions';
import { fetchAgentesStart, fetchAgenteStart, deleteAgenteStart, setAgenteValuesStart } from '../agente/agenteActions';
import { fetchUsersAgentesSuccess, fetchUserAgenteSuccess, deleteUserAgenteSuccess, editUserAgenteSuccess } from './mergeActions';
import { fetchPescasStart, fetchPescaStart, deletePescaStart, setPescaValuesStart } from '../pesca/pescaActions';
import history from '../../history';
import mergeTypeActions from './mergeTypeActions';
import userTypeActions from "../user/userTypeActions";
import agenteTypeActions from '../agente/agenteTypeActions';
import pescaTypeActions from '../pesca/pescaTypeActions';
import { setError } from '../commonActions';
import { sinEspecificar } from '../../../constants';

/**
 * Uso tabla "users" como tabla que siempre va a existir
 * Otra funcion de Merge --> "info.txt" -> "Otras funciones"
 */
export function* fetchUsersAgentes() {
    try {
        let users, agentes, pescas, error = 1;
        //En ultimo lugar la tabla "user", ya que siempre tiene que existir
        yield put(fetchPescasStart());
        yield put(fetchAgentesStart());
        yield put(fetchUsersStart());

        yield take((action) => {
            if (action.type === pescaTypeActions.FETCH_PESCAS_SUCCESS) {
                pescas = action.payload;
            }
            if (action.type === agenteTypeActions.FETCH_AGENTES_SUCCESS) {
                agentes = action.payload;
            };
            if (action.type === userTypeActions.FETCH_USERS_SUCCESS) {
                users = action.payload;
            }
            //---!!!PROBAR QUE CARGE LAS BASES CORRESPONDIENTES!!!
            // if (action.type === commonTypes.SET_ERROR) {
            //     error = true;
            // }
            error++;
            //!!!error -> fijarse la cantida de errores con:
            // !!!!console.log(action) y console.log(error)  !!!!
            if ((users && agentes && pescas) || error === 4) {
                return 'ok';
            }
        });

        if (users) {
            /**Prioridad de derecha a izq */
            const objReturn = yield call(merge.all, [(agentes ? agentes : {}), (pescas ? pescas : {}), users]);
            yield put(fetchUsersAgentesSuccess(objReturn));
        } else {
            yield put(setError('No existe el usuario'))
        }
        //} else if (users) {
        //    yield put(fetchUsersAgentesSuccess(users));
        //}
        // } else if (pescas) {
        //     yield put(fetchUsersAgentesSuccess(pescas));
        // }
        // else if (agentes) {
        //     yield put(fetchUsersAgentesSuccess(agentes));

    } catch (err) {
        console.error(err);
        yield put(setError('No se pudo obtener informacion de la base de datos.'))
    }
}

export function* fetchUserAgente({ payload }) {
    try {
        let user, agente, pesca, error = 1;
        
        yield put(fetchPescaStart(payload));
        yield put(fetchAgenteStart(payload));
        yield put(fetchUserStart(payload));

        yield take(action => {
            if (action.type === pescaTypeActions.FETCH_PESCA_SUCCESS) {
                pesca = action.payload;
            }
            if (action.type === agenteTypeActions.FETCH_AGENTE_SUCCESS) {
                agente = action.payload;
            };
            if (action.type === userTypeActions.FETCH_USER_SUCCESS) {
                user = action.payload;
            }
            // if (action.type === commonTypes.SET_ERROR) {
            //     error = true;
            // }
            error++;
            //!!!error -> fijarse la cantida de errores con:
            // !!!!console.log(action) y console.log(error)  !!!!
            if ((user && agente && pesca) || error === 4) {
                return 'ok';
            }
            // if ((agente && user) || (agente && error) || (user && error)) {
            //     return 'ok'
            // }
        });
        if (user) {
            const objReturn = yield call(merge.all, [(agente ? agente : {}), (pesca ? pesca : {}), user]);
            yield put(fetchUserAgenteSuccess(objReturn));
            // } else if (agente) {
            //     yield put(fetchUserAgenteSuccess(agente));
            // } else if (user) {
            //     yield put(fetchUserAgenteSuccess(user));
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
        yield put(deleteAgenteStart(payload));
        yield put(deletePescaStart(payload));
        yield put(deleteUserAgenteSuccess(payload));
    } catch (err) {
        console.error(err);
        yield put(setError('No se puede borrar usuario. Reintente!'));
    }
}

/**
 * https://stackoverflow.com/questions/37689562/cancel-a-saga-when-an-action-is-dispatched-with-redux-saga
 * @param {*} param0 
 */
export function* editUserAgente({ payload }) {
    try {
        let user; //pesca, agente, error = 1;

        if (payload.fechaPesca && (payload.fechaPesca !== sinEspecificar)) {
            yield put(setPescaValuesStart(payload))
        } else {
            //yield put(setAgenteValuesStart({ ...payload, image: false }));
            //yield put(setUserStart(payload));
            yield put(setAgenteValuesStart(payload));
        }

        yield take((action) => {
            // if (action.type === pescaTypeActions.SET_PESCA_VALUES_SUCCESS) {
            //     pesca = true;
            // }
            // if (action.type === agenteTypeActions.SET_AGENTE_VALUES_SUCCESS) {
            //     agente = true;
            // };
            if (action.type === userTypeActions.SET_USER_SUCCESS) {
                user = true;
                return 'ok';
            }
            //---!!!PROBAR QUE CARGE LAS BASES CORRESPONDIENTES!!!
            // if (action.type === commonTypes.SET_ERROR) {
            //     error = true;
            // }
            // error++;
            // console.log(action) 
            // console.log(error)

            //!!!error -> fijarse la cantida de errores con:
            // !!!!console.log(action) y console.log(error)  !!!!
            // if ((user && agente && pesca)) {
            //     return 'ok';
            // }
        });

        if (user) {
            /**Prioridad de derecha a izq */
            //const objReturn = yield call(merge.all, [(agente ? agente : {}), (pesca ? pesca : {}), user])
            yield put(editUserAgenteSuccess(payload))
            history.push(`/detail/${payload.dni}`);
        }
        else {
            yield put(setError('No se pudieron modificar los datos. Reintente!'))
        }
        //     if (action.type === agenteTypeActions.SET_AGENTE_VALUES_SUCCESS) {
        //         agente = action.payload;
        //     };
        //     if (action.type === userTypeActions.SET_USER_SUCCESS) {
        //         user = action.payload;
        //     }
        //     // if (action.type === commonTypes.SET_ERROR) {
        //     //     error = true;
        //     // }
        //     // if ((agente && user) || (agente && error) || (user && error)) {
        //     //     return 'ok'
        //     // }
        //     error++
        //     //!!!error -> debe tener esta cantidad de "put" (linea 24)!!!!            
        //     if ((user && agente && pesca) || error === 4) {
        //         return 'ok';
        //     }
        // });
        // if (agente || user) {
        //     yield put(editUserAgenteSuccess(payload))
        //     history.push(`/detail/${payload.dni}`);
        // } else {
        //     yield put(setError('No existe el usuario'))
        // }
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