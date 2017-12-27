import { fork } from 'redux-saga/effects';
import authSagas from '../auth/sagas';

export default function* rootSaga() {
    yield fork(authSagas);
    /*
    yield [
        // project sagas go here,
    ];
    */
}