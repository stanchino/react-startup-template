import { call, put, select } from "redux-saga/effects";
import { formError } from "./index";
import { signInRoutine, confirmationRoutine } from "../actions";
import { confirmationRequest } from "../services";

export const getProfile = state => ({ ...state.auth.signUp.profile });

export function* handleConfirmationSaga({ payload: { values: { code } } }) {
    try {
        const { email } = yield select(getProfile);
        yield put(confirmationRoutine.request());
        yield call(confirmationRequest, email, code);
        yield put(confirmationRoutine.success());
        yield put(signInRoutine.success({ email: email }));
    } catch (error) {
        yield formError(confirmationRoutine, {
            code: "Invalid code",
            _error: error.message
        });
    } finally {
        yield put(confirmationRoutine.fulfill());
    }
}