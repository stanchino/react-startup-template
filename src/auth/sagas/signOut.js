import { call, put, select } from "redux-saga/effects";
import { signOutRoutine } from "../actions";
import { signOutRequest } from "../services";

export const getProfile = state => ({ ...state.auth.signIn.profile });

export function* handleSignOutSaga() {
    try {
        const {sub} = yield select(getProfile);
        yield put(signOutRoutine.request());
        yield call(signOutRequest, sub);
    } finally {
        yield put(signOutRoutine.fulfill())
    }
}