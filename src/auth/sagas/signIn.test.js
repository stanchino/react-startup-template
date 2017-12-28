import sagaHelper from "redux-saga-testing";
import { call, put } from "redux-saga/effects";
import { SubmissionError } from "redux-form";
import { signInRequest } from "../services";
import { signIn, signUp } from "../actions";

import { handleSignInSaga } from "./signIn";

const payload = { username: "user", password: "pass" };

describe("handleSignInSaga", () => {
    describe("When authentication is successful", () => {
        const it = sagaHelper(handleSignInSaga({ payload: payload }));

        it("calls loginRequest", result => {
            expect(result).toEqual(call(signInRequest, payload));
            return { profile: "blah" };
        });

        it("and triggers the login success action", result => {
            expect(result).toEqual(put(signIn.success({ profile: "blah" })));
        });

        it("and then nothing", result => {
            expect(result).toBeUndefined();
        });
    });

    describe("When authentication fails", () => {
        const it = sagaHelper(handleSignInSaga({ payload: payload }));

        it("calls loginRequest", result => {
            expect(result).toEqual(call(signInRequest, payload));
            return new Error("Error authenticating user.");
        });

        it("and triggers the login error action", result => {
            expect(result).toEqual(put(signIn.failure(new SubmissionError())));
        });

        it("and then nothing", result => {
            expect(result).toBeUndefined();
        });
    });

    describe("When the user is not confirmed", () => {
        const it = sagaHelper(handleSignInSaga({ payload: payload }));

        it("calls signInRequest", result => {
            let error = new Error("UserNotConfirmedException");
            error.code = "UserNotConfirmedException";
            expect(result).toEqual(call(signInRequest, payload));
            return error;
        });

        it("and triggers a signUp success action", result => {
            expect(result).toEqual(put(signUp.success({ username: payload.username })));
        });

        it("and then nothing", result => {
            expect(result).toBeUndefined();
        });
    });
});