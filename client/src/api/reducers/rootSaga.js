import { all, call } from 'redux-saga/effects';
import userSaga from '../actions/user/userSaga';
import agenteSaga from '../actions/agente/agenteSaga';
import mergeSaga from '../actions/merge/mergeSaga';

export default function* rootSaga(){
    yield all([
        call(userSaga),
        call(agenteSaga),
        call(mergeSaga)
    ]);
}