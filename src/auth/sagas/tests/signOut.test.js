import { call } from "redux-saga/effects";
import { signOutRoutine } from "../../actions";
import { signOutRequest } from "../../services";
import { handleSignOutSaga, getProfile } from "../signOut";

import {finalizeSaga, setupSelectSaga, testSelector} from "./shared-examples";

const payload = {};
const profile = { sub: "user" };

const initializeSaga = () => (
    setupSelectSaga(handleSignOutSaga, payload, signOutRoutine, getProfile, profile)
);

describe("handleSignOutSaga", () => {
    describe("Signs the user out and always succeeds", () => {
        const it = initializeSaga();

        it("calls signOutRequest", result => {
            expect(result).toEqual(call(signOutRequest, profile.sub));
        });

        finalizeSaga(it, signOutRoutine);
    });
});

testSelector(getProfile, { auth: { signIn: { profile: profile } }}, profile);