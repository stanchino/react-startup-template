import sagaHelper from "redux-saga-testing";
import { call, put, select } from "redux-saga/effects";
import { SubmissionError } from "redux-form";
import { confirmationRequest } from "../services";
import { confirmation } from "../actions";

import { handleConfirmationSaga, getProfile } from "./confirmation";

const payload = { code: "1234" };
const profile = { username: "user" };

describe("handleConfirmationSaga", () => {
    describe("When authentication is successful", () => {
        const it = sagaHelper(handleConfirmationSaga({ payload: payload }));

        it("retrieves the profile", result => {
            expect(result).toEqual(select(getProfile));
            return profile;
        });

        it("calls confirmationRequest", result => {
            expect(result).toEqual(call(confirmationRequest, { ...payload, ...profile }));
        });

        it("and triggers the confirmation success action", result => {
            expect(result).toEqual(put(confirmation.success(profile)));
        });

        it("and then nothing", result => {
            expect(result).toBeUndefined();
        });
    });

    describe("When confirmation fails", () => {
        const it = sagaHelper(handleConfirmationSaga({ payload: payload }));

        it("retrieves the profile", result => {
            expect(result).toEqual(select(getProfile));
            return { username: "user" };
        });

        it("calls confirmationRequest", result => {
            expect(result).toEqual(call(confirmationRequest, { ...payload, ...profile }));
            return new Error("Error in the confirmation request.");
        });

        it("and triggers the confirmation error action", result => {
            expect(result).toEqual(put(confirmation.failure(new SubmissionError())));
        });

        it("and then nothing", result => {
            expect(result).toBeUndefined();
        });
    });
});

describe("getProfile", () => {
   it("extracts the profile from the state", () => {
       const state = { auth: { profile: profile }};
       expect(getProfile(state)).toEqual(profile);
   });
});