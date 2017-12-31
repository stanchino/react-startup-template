import { call, put } from "redux-saga/effects";
import { signUpRequest } from "../../services";
import { signUpRoutine, signInRoutine } from "../../actions";

import { handleSignUpSaga } from "../signUp";

import { finalizeSaga, setupSaga, testServiceFailure } from "./shared-examples";

const values = { email: "john@doe.com", password: "pass" };
const payload = { payload: { values: values } };
const profile = { email: "john@doe.com"};

const initializeSaga = () => (
    setupSaga(handleSignUpSaga, payload, signUpRoutine)
);

const callsActionOnError = (description, code, action) => {
    describe(description, () => {
        const it = initializeSaga();

        it("calls signUpRequest", result => {
            let error = new Error(`Error ${code}`);
            error.code = code;
            expect(result).toEqual(call(signUpRequest, values.email, values.password));
            return error;
        });

        it("and triggers the action", result => {
            expect(result).toEqual(put(action));
        });

        finalizeSaga(it, signUpRoutine);
    });
};

describe("handleSignUpSaga", () => {
    describe("When the registration is successful", () => {
        const it = initializeSaga();

        it("calls signUpRequest", result => {
            expect(result).toEqual(call(signUpRequest, values.email, values.password));
        });

        it("and triggers the signUp success action", result => {
            expect(result).toEqual(put(signUpRoutine.success(profile)));
        });

        finalizeSaga(it, signUpRoutine);
    });

    testServiceFailure(initializeSaga, signUpRequest, signUpRoutine, [values.email, values.password]);
    callsActionOnError("When the user already exists", "UsernameExistsException", signInRoutine.trigger({ payload: { values: { username: "john@doe.com", password: "pass" } } }));
    callsActionOnError("When the user is not confirmed", "UserNotConfirmedException", signUpRoutine.success(profile));
});