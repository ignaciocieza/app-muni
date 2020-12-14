import { takeLatest, call, put } from 'redux-saga/effects';
import axios from 'axios';
import { normalize, schema } from 'normalizr';
import { searchByFieldSuccess, setErrorRafam } from './rafamActions';
import rafamTypes from './rafamTypes';

/**
 *https://redux-saga.js.org/docs/advanced/RacingEffects.html
 * https://decembersoft.com/posts/redux-saga-abort-controller-cancel-api-calls/
 * https://gist.github.com/adeelibr/d8f3f8859e2929f3f1adb80992f1dc09
 * https://github.com/redux-saga/redux-saga/issues/632
 * @param {*} param0 
 */
function* searchByField({ payload }) {
    let response, auxUser, auxIdAttribute, returnObj;


    try {
        //yield fork(cancelAllSagas);
        // const { posts, timeout } = yield race({
        //     posts: call(axios.post,
        //         `/rafam/${payload.type}/${payload.subType}`
        //         ,
        //         {
        //             data: { nro: payload.value }
        //         },
        //         {
        //             cancelToken: payload.signal.token,
        //         }),
        //     timeout: delay(5000)
        // })
        response = yield call(
            axios.post,
            `/rafam/${payload.type}/${payload.subType}`
            ,
            {
                data: { nro: payload.value }
            },
            {
                cancelToken: payload.signal.token,
            });

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
        //auxResp= { [payload.type]: returnObj?.entities?.users }
        //console.dir(auxResp)
        return yield put(searchByFieldSuccess({ key: payload.type, data: returnObj.entities.users }))
        // if (timeout) {
        //     console.log('timeout',timeout )
        //     payload.signal.cancel()
        // }

    } catch (err) {
        console.error(err);
        yield put(setErrorRafam('Error con la base de datos de Rafam'));
        return;
    }
};

export default function* onSearchByField() {
    yield takeLatest(rafamTypes.SEARCH_BY_FILED_START, searchByField);
};


// export default function* rafamSagas() {
//     yield all([
//         call(onSearchByField),
//     ])
// }