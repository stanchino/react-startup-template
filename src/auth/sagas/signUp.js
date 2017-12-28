import { call, put } from "redux-saga/effects";
import { signUpRequest}  from "../services";
import { signIn, signUp } from "../actions";
import { formError } from "./index";

export function* handleSignUpSaga(action) {
    const { email, username, password } = action.payload;
    let profile = { email: email, username: username };

    try {
        yield call(signUpRequest, { email, username, password });
        yield put(signUp.success(profile));
    } catch (error) {
        if ("UsernameExistsException" === error.code) {
            yield put(signIn.request({ ...profile, password: password }));
        } else if ("UserNotConfirmedException" === error.code) {
            yield put(signUp.success(profile));
        } else {
            yield formError(signUp, {
                _error: error.message
            });
        }
    }
}