import { takeEvery, put, call, fork, select } from "redux-saga/effects";
import { SubmissionError } from "redux-form";
import { formActionSaga } from "redux-form-saga";
import { signInRequest, signUpRequest, confirmationRequest } from "../services";
import { signIn, signUp, confirmation } from "../actions";

function* signInWatcher() {
    yield takeEvery(signIn.REQUEST, handleSignInSaga);
}

function* signUpWatcher() {
    yield takeEvery(signUp.REQUEST, handleSignUpSaga);
}

function* confirmationWatcher() {
    yield takeEvery(confirmation.REQUEST, handleConfirmationSaga);
}

const getProfile = state => ({ ...state.auth.profile });

const formError = (action, errors) => (
    put(action.failure(new SubmissionError(errors)))
);

export function* handleSignInSaga(action) {
    const { email, username, password } = action.payload;

    let profile = { email: email, username: username };

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

export default function* () {
    yield [fork(signInWatcher), fork(signUpWatcher), fork(confirmationWatcher), fork(formActionSaga)];
};