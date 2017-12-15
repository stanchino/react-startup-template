import { fork } from 'redux-saga/effects';
import { formActionSaga } from 'redux-form-saga';

import { loginWatcherSaga } from '../auth/sagas';

export default function* rootSaga() {
    yield [
        fork(loginWatcherSaga),
        fork(formActionSaga)
    ];
}