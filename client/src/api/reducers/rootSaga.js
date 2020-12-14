import { all, fork } from 'redux-saga/effects';
import userSaga from '../actions/user/userSaga';
import agenteSaga from '../actions/agente/agenteSaga';
import mergeSaga from '../actions/merge/mergeSaga';
import pescaSagas from '../actions/pesca/pescaSaga';
import rafamSagas from '../actions/rafam/rafamSaga';


export default function* rootSaga() {
    yield all([
        fork(rafamSagas),
        fork(userSaga),
        fork(agenteSaga),
        fork(mergeSaga),
        fork(pescaSagas),
    ]);
}