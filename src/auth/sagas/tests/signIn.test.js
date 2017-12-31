import {call, put } from "redux-saga/effects";
import { signInRoutine, signUpRoutine } from "../../actions";
import { signInRequest, userAttributes } from "../../services";
import { handleSignInSaga } from "../signIn";

import { finalizeSaga, setupSaga, testServiceFailure } from "./shared-examples";

const values = { username: "user", password: "pass" };
const payload = { payload: { values: values } };

const initializeSaga = () => (
    setupSaga(handleSignInSaga, payload, signInRoutine)
);

describe("handleSignInSaga", () => {
    describe("When authentication is successful", () => {
        const it = initializeSaga();
        const cognitoUser = jest.fn();

        it("calls loginRequest", result => {
            expect(result).toEqual(call(signInRequest, values.username, values.password));
            return { user: cognitoUser }
        });

        it("and then calls userAttributes", result => {
            expect(result).toEqual(call(userAttributes, cognitoUser));
            return 'profile';
        });

        it("and then triggers the login success action", result => {
            expect(result).toEqual(put(signInRoutine.success('profile')));
        });

        finalizeSaga(it, signInRoutine);
    });

    describe("When the user is not confirmed", () => {
        const it = initializeSaga();

        it("calls signInRequest", result => {
            let error = new Error("UserNotConfirmedException");
            error.code = "UserNotConfirmedException";
            expect(result).toEqual(call(signInRequest, values.username, values.password));
            return error;
        });

        it("and then triggers a signUp success action", result => {
            expect(result).toEqual(put(signUpRoutine.success({ email: values.username })));
        });

        finalizeSaga(it, signInRoutine);
    });

    testServiceFailure(initializeSaga, signInRequest, signInRoutine, [values.username, values.password]);
});