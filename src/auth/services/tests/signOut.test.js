import { expectCallbacks } from "./shared-examples";

describe("test signOutRequest", () => {
    const subject = () => (require("../signOut").default);

    beforeEach(() => {
        jest.resetModules();
    });

    it ('signs the user out', () => {
        const mocks = {
            CognitoUserPool: jest.fn(),
            CognitoUser: jest.fn(() => ({
                signOut: jest.fn()
            }))
        };
        jest.doMock("amazon-cognito-identity-js", () => (mocks));

        expect(subject()({ sub: "userId" })).resolves.toEqual(undefined);
        expectCallbacks([mocks.CognitoUserPool, mocks.CognitoUser]);
    });
});