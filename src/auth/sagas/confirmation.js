import { call, put, select } from "redux-saga/effects";
import { formError } from "./index";
import { confirmation } from "../actions";
import { confirmationRequest } from "../services";

export const getProfile = state => ({ ...state.auth.profile });

export function* handleConfirmationSaga(action) {
    const { code } = action.payload;

    let profile = yield select(getProfile);

    try {
        yield call(confirmationRequest, { ...profile, code });
        yield put(confirmation.success(profile));
    } catch (error) {
        yield formError(confirmation, {
            code: "Invalid code",
            _error: error.message
        });
    }
}