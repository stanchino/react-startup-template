import reducer from "../signIn";
import { signInRoutine, signOutRoutine } from "../../actions";

import { testAction } from "./shared-examples";

describe("signIn reducer", () => {
    it("should return the initial state", () => {
        expect(reducer(undefined, {})).toEqual({
            loading: false,
            isLoggedIn: false,
            profile: null
        });
    });

    describe("for the signInRoutine", () => {
        testAction(reducer, signInRoutine.request(), {
            loading: true
        });

        testAction(reducer, signInRoutine.success({ username: "user" }), {
            isLoggedIn: true,
            profile: { username: "user" }
        });

        testAction(reducer, signInRoutine.failure(), {
            isLoggedIn: false,
            profile: null
        });

        testAction(reducer, signInRoutine.fulfill(), {
            loading: false
        });
    });

    describe("for the signOutRoutine", () => {
        testAction(reducer, signOutRoutine.request(), {
            loading: true
        });

        testAction(reducer, signOutRoutine.fulfill(), {
            loading: false,
            isLoggedIn: false,
            profile: null
        });
    });

});