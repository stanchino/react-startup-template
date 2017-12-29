import sagaHelper from "redux-saga-testing";
import { call, put } from "redux-saga/effects";
import { SubmissionError } from "redux-form";
import { signUpRequest } from "../../services/index";
import { signUp, signIn } from "../../actions/index";

import { handleSignUpSaga } from "../signUp";

const payload = { email: "john@doe.com", username: "user", password: "pass" };
const profile = { email: "john@doe.com", username: "user"};

const callsActionOnError = (description, code, action) => {
    describe(description, () => {
        const it = sagaHelper(handleSignUpSaga({ payload: payload }));

        it("calls signUpRequest", result => {
            let error = new Error(`Error ${code}`);
            error.code = code;
            expect(result).toEqual(call(signUpRequest, payload));
            return error;
        });

        it("and triggers the action", result => {
            expect(result).toEqual(put(action));
        });

        it("and then nothing", result => {
            expect(result).toBeUndefined();
        });
    });
};

describe("handleSignUpSaga", () => {
    describe("When the registration is successful", () => {
        const it = sagaHelper(handleSignUpSaga({ payload: payload }));

        it("calls signUpRequest", result => {
            expect(result).toEqual(call(signUpRequest, payload));
        });

        it("and triggers the signUp success action", result => {
            expect(result).toEqual(put(signUp.success(profile)));
        });

        it("and then nothing", result => {
            expect(result).toBeUndefined();
        });
    });

    describe("When the registration fails", () => {
        const it = sagaHelper(handleSignUpSaga({ payload: payload }));

        it("calls signUpRequest", result => {
            expect(result).toEqual(call(signUpRequest, payload));
            return new Error("Error in SignUp.");
        });

        it("and triggers the signUp success action", result => {
            const formError = new SubmissionError();
            expect(result).toEqual(put(signUp.failure(formError)));
        });

        it("and then nothing", result => {
            expect(result).toBeUndefined();
        });
    });

    callsActionOnError("When the user already exists", "UsernameExistsException", signIn.request(payload));
    callsActionOnError("When the user is not confirmed", "UserNotConfirmedException", signUp.success(profile));
});