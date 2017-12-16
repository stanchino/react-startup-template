import { call } from 'redux-saga/effects';
import authSagas from '../auth/sagas';

export default function* rootSaga() {
    yield call(authSagas);
    yield [
        // project sagas go here,
    ];
}