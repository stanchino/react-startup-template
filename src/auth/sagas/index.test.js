import sagaHelper from "redux-saga-testing";
import { call, put } from "redux-saga/effects";
import { SubmissionError } from "redux-form";
import { signInRequest } from "../services";
import { signIn } from "../actions";

import { handleSignInSaga } from ".";

describe("handleLoginSaga", () => {
    describe("When authentication is successful", () => {
        const it = sagaHelper(handleSignInSaga({ payload: { username: "user", password: "pass" } }));

        it("calls loginRequest", result => {
            expect(result).toEqual(call(signInRequest, { username: "user", password: "pass" }));
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
        const it = sagaHelper(handleSignInSaga({ payload: { username: "user", password: "pass" } }));

        it("calls loginRequest", result => {
            expect(result).toEqual(call(signInRequest, { username: "user", password: "pass" }));
            return new Error("Error authenticating user.");
        });

        it("and triggers the login success action", result => {
            const formError = new SubmissionError({
                username: "User with this login is not found", // specific field error
                _error: "Login failed, please check your credentials and try again", // global form error
            });
            expect(result).toEqual(put(signIn.failure(formError)));
        });

        it("and then nothing", result => {
            expect(result).toBeUndefined();
        });
    });
});