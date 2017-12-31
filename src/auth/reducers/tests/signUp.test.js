import reducer from "../signUp";
import { signUpRoutine, confirmationRoutine } from "../../actions";

import { testAction } from "./shared-examples";

describe("signUp reducer", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual({
            loading: false,
            isRegistered: false,
            isConfirmed: false,
            profile: null
        });
    });

    describe("for the signUpRoutine", () => {
        testAction(reducer, signUpRoutine.request(), {
            loading: true
        });

        testAction(reducer, signUpRoutine.success({ username: "user" }), {
            isRegistered: true,
            isConfirmed: false,
            profile: { username: "user" }
        });

        testAction(reducer, signUpRoutine.failure(), {
            isRegistered: false,
            isConfirmed: false,
            profile: null
        });

        testAction(reducer, signUpRoutine.fulfill(), {
            loading: false
        });
    });

    describe("for the confirmationRoutine", () => {
        testAction(reducer, confirmationRoutine.request(), {
            loading: true
        });

        testAction(reducer, confirmationRoutine.success({ username: "user" }), {
            isConfirmed: true
        });

        testAction(reducer, confirmationRoutine.failure(), {
            isConfirmed: false
        });

        testAction(reducer, confirmationRoutine.fulfill(), {
            loading: false
        });
    });
});