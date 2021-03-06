const factory = assertion => ({
    AuthenticationDetails: jest.fn(),
    CognitoUserPool: jest.fn(),
    CognitoUser: jest.fn(() => ({
        authenticateUser: (data, callbacks) => {
            assertion(callbacks);
        }
    }))
});

describe("test signInRequest", () => {
    const subject = () => (require("../signIn").default);
    const session = jest.fn();
    const expectCallbacks = (mock) => {
        expect(mock.CognitoUserPool).toHaveBeenCalled();
        expect(mock.AuthenticationDetails).toHaveBeenCalledWith({Username: "user", Password: "pass"});
        expect(mock.CognitoUser).toHaveBeenCalled();
    };

    beforeEach(() => {
        jest.resetModules();
    });

    it ('signs the user successfully', () => {
        const mock = factory(callbacks => (
            callbacks.onSuccess(session)
        ));
        jest.doMock("amazon-cognito-identity-js", () => (mock));

        expect(subject()("user", "pass")).resolves.toHaveProperty('session', session);
        expectCallbacks(mock);
    });

    it ('rejects the promise whe authentication fails', () => {
        const mock = factory(callbacks => (
            callbacks.onFailure({ error: "error" })
        ));
        jest.doMock("amazon-cognito-identity-js", () => (mock));

        expect(subject()("user", "pass")).rejects.toEqual({ error: 'error' });
        expectCallbacks(mock);
    });
});