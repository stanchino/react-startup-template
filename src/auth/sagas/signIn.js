import {call, put } from "redux-saga/effects";
import { signInRoutine, signUpRoutine } from "../actions";
import { signInRequest, userAttributes } from "../services";
import { formError } from ".";

export function* handleSignInSaga({ payload: { values: { username, password } } }) {
    try {
        yield put(signInRoutine.request());
        const { user } = yield call(signInRequest, username, password);
        const profile = yield call(userAttributes, user);
        yield put(signInRoutine.success(profile));
    } catch (error) {
        if ("UserNotConfirmedException" === error.code) {
            yield put(signUpRoutine.success({ email: username }));
        } else {
            yield formError(signInRoutine, {
                username: "Invalid user.",
                _error: error.message
            });
        }
    } finally {
        yield put(signInRoutine.fulfill())
    }
}