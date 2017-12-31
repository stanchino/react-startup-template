import { call, put } from "redux-saga/effects";
import { signInRoutine, signUpRoutine } from "../actions";
import { signUpRequest}  from "../services";
import { formError } from "./index";

export function* handleSignUpSaga({ payload: { values: { email, password } } }) {
    const profile = { email: email };
    try {
        yield put(signUpRoutine.request());
        yield call(signUpRequest, email, password);
        yield put(signUpRoutine.success(profile));
    } catch (error) {
        if ("UsernameExistsException" === error.code) {
            yield put(signInRoutine.trigger({ payload: { values: { username: email, password: password } } }));
        } else if ("UserNotConfirmedException" === error.code) {
            yield put(signUpRoutine.success(profile));
        } else {
            yield formError(signUpRoutine, {
                _error: error.message
            });
        }
    } finally {
        yield put(signUpRoutine.fulfill());
    }
}