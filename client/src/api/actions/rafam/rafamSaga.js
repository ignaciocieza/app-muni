import { takeLatest, call, all, put } from 'redux-saga/effects';
import axios from 'axios';
import { searchByFieldSuccess } from './rafamActions';
import rafamTypes from './rafamTypes';


export function* searchByField({ payload }) {
    let response;

    try {
        response = yield axios.post("/rafam", { type: payload.type, data: { nro: payload.value }, subType: payload.subType });
        yield put(searchByFieldSuccess(response.data))
    } catch (err) {
        console.error(err);
        //yield put(setAgenteError('No se encontro usuario, o error en la base de datos'))
    }
};

export function* onSearchByField() {
    yield takeLatest(rafamTypes.SEARCH_BY_FILED_START, searchByField);
};


export default function* rafamSagas() {
    yield all([
        call(onSearchByField),
    ])
}