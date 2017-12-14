import { push } from 'react-router-redux';
import { call, put, take } from 'redux-saga/effects';

import * as types from '../reducers/types';

import {
    loginSuccess,
    loginFailure
} from '../reducers';

function* loginRequestSaga() {
    const showLock = () => ({ 'profile': { 'username': 'test' } });

    try {
        const { profile } = yield call(showLock);

        yield put(loginSuccess(profile));
        yield put(push('/private'));
    } catch (error) {
        yield put(loginFailure(error));
        yield put(push('/'));
    }
}

export function* watchLoginRequest() {
    while (true) {
        yield take(types.LOGIN_REQUEST);
        yield call(loginRequestSaga);
    }
}

export function* watchLoginSuccess() {
    while (true) {
        const { profile } = yield take(types.LOGIN_SUCCESS);

        localStorage.setItem('AUTH', JSON.stringify({ profile }));
    }
}

export function* watchLoginFailure() {
    while (true) {
        yield take(types.LOGIN_ERROR);

        localStorage.removeItem('AUTH');
    }
}

export function* watchLogout() {
    while (true) {
        yield take(types.LOGOUT_SUCCESS);

        localStorage.removeItem('AUTH');

        yield put(push('/'));
    }
}