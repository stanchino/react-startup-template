import {call, put } from "redux-saga/effects";
import { signIn, signUp } from "../actions";
import { signInRequest } from "../services";
import { formError } from ".";

export function* handleSignInSaga(action) {
    const { username, password } = action.payload;

    let profile = { username: username };

    try {
        profile = yield call(signInRequest, { username, password });
        yield put(signIn.success(profile));
    } catch (error) {
        if ("UserNotConfirmedException" === error.code) {
            yield put(signUp.success(profile));
        } else {
            yield formError(signIn, {
                username: "Invalid username provided.",
                _error: error.message
            });
        }
    }
}