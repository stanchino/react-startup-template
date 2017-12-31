import { call, put } from "redux-saga/effects";
import { confirmationRoutine, signInRoutine } from "../../actions";
import { confirmationRequest } from "../../services";

import { handleConfirmationSaga, getProfile } from "../confirmation";

import { finalizeSaga, setupSelectSaga, testSelector, testServiceFailure } from "./shared-examples";

const values = { code: "1234" };
const payload = { payload: { values: values } };
const profile = { email: "john@doe.com" };

const initializeSaga = () => (
    setupSelectSaga(handleConfirmationSaga, payload, confirmationRoutine, getProfile, profile)
);

describe("handleConfirmationSaga", () => {
    describe("When confirmation is successful", () => {
        const it = initializeSaga();

        it("calls confirmationRequest", result => {
            expect(result).toEqual(call(confirmationRequest, profile.email, values.code));
        });

        it("and then triggers the confirmation success action", result => {
            expect(result).toEqual(put(confirmationRoutine.success()));
        });

        it("and then triggers the signin success action", result => {
            expect(result).toEqual(put(signInRoutine.success(profile)));
        });

        finalizeSaga(it, confirmationRoutine);
    });

    testServiceFailure(initializeSaga, confirmationRequest, confirmationRoutine, [profile.email, values.code]);
});

testSelector(getProfile, { auth: { signUp: { profile: profile } }}, profile);