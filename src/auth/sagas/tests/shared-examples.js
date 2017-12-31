import {call, put, select} from "redux-saga/effects";
import { SubmissionError } from "redux-form";
import sagaHelper from "redux-saga-testing";

export const setupSaga = (saga, payload, routine, beforeRequest = undefined) => {
    const it = sagaHelper(saga(payload));

    beforeRequest && beforeRequest(it);

    it("triggers the request action", result => {
        expect(result).toEqual(put(routine.request()));
    });

    return it;
};

export const setupSelectSaga = (saga, payload, routine, selector, selection) => (
    setupSaga(saga, payload, routine, it => {
        it("retrieves the profile", result => {
            expect(result).toEqual(select(selector));
            return selection;
        });
    })
);

export const finalizeSaga = (it, routine) => {
    it("finally triggers the fulfill action", result => {
        expect(result).toEqual(put(routine.fulfill()));
    });

    it("and then nothing", result => {
        expect(result).toBeUndefined();
    });
};

export const testSelector = (selector, state, expectedResult) => {
    describe("test selection", () => {
        it("extracts the data from the state", () => {
            expect(selector(state)).toEqual(expectedResult);
        });
    });
};

export const testServiceFailure = (initialize, request, routine, args) => {
    describe("When saga fails", () => {
        const it = initialize();

        it("calls confirmationRequest", result => {
            expect(result).toEqual(call(request, ...args));
            return new Error("Error in the confirmation request.");
        });

        it("and then triggers the failure action", result => {
            expect(result).toEqual(put(routine.failure(new SubmissionError())));
        });

        finalizeSaga(it, routine);
    });
}