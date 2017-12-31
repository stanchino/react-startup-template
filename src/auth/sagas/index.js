import {takeEvery, put } from "redux-saga/effects";
import { SubmissionError } from "redux-form";

import { routinePromiseWatcherSaga } from "redux-saga-routines";

import { signInRoutine, signUpRoutine, confirmationRoutine, signOutRoutine } from "../actions";
import { handleSignInSaga } from "./signIn";
import { handleSignUpSaga } from "./signUp";
import { handleConfirmationSaga } from "./confirmation";
import { handleSignOutSaga } from "./signOut";

function* signInWatcher() {
    yield takeEvery(signInRoutine.TRIGGER, handleSignInSaga);
}

function* signUpWatcher() {
    yield takeEvery(signUpRoutine.TRIGGER, handleSignUpSaga);
}

function* confirmationWatcher() {
    yield takeEvery(confirmationRoutine.TRIGGER, handleConfirmationSaga);
}

function* signOutWatcher() {
    yield takeEvery(signOutRoutine.TRIGGER, handleSignOutSaga);
}

export const formError = (action, errors) => (
    put(action.failure(new SubmissionError(errors)))
);

export default [routinePromiseWatcherSaga, signInWatcher, signUpWatcher, confirmationWatcher, signOutWatcher];