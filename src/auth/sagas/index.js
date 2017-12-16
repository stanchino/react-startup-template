import { takeEvery, put, call, fork } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import { formActionSaga } from 'redux-form-saga';
import { loginRequest } from '../service';
import { login } from '../actions';

function* loginWatcherSaga() {
    yield takeEvery(login.REQUEST, handleLoginSaga);
}

function* handleLoginSaga(action) {
    const { username, password } = action.payload;

    try {
        let profile = yield call(loginRequest, { username, password });
        yield put(login.success(profile));
    } catch (error) {
        const formError = new SubmissionError({
            username: 'User with this login is not found', // specific field error
            _error: 'Login failed, please check your credentials and try again', // global form error
        });

        yield put(login.failure(formError));
    }
}

export default function* () {
    yield [fork(loginWatcherSaga), fork(formActionSaga)];
};