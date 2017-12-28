import { takeEvery, put, fork } from "redux-saga/effects";
import { SubmissionError } from "redux-form";
import { formActionSaga } from "redux-form-saga";
import { signIn, signUp, confirmation } from "../actions";
import { handleSignInSaga } from "./signIn";
import { handleSignUpSaga } from "./signUp";
import { handleConfirmationSaga } from "./confirmation";

function* signInWatcher() {
    yield takeEvery(signIn.REQUEST, handleSignInSaga);
}

function* signUpWatcher() {
    yield takeEvery(signUp.REQUEST, handleSignUpSaga);
}

function* confirmationWatcher() {
    yield takeEvery(confirmation.REQUEST, handleConfirmationSaga);
}

export const formError = (action, errors) => (
    put(action.failure(new SubmissionError(errors)))
);

export default function* () {
    yield [fork(signInWatcher), fork(signUpWatcher), fork(confirmationWatcher), fork(formActionSaga)];
};