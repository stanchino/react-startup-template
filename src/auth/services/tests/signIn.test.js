const factory = assertion => ({
    AuthenticationDetails: jest.fn(),
    CognitoUserPool: jest.fn(),
    CookieStorage: jest.fn(),
    CognitoUser: jest.fn(() => ({
        authenticateUser: (data, callbacks) => {
            assertion(callbacks);
        }
    }))
});

describe("test signInRequest", () => {
    const subject = () => (require("../signIn").default);
    const expectCallbacks = (mock) => {
        expect(mock.CognitoUserPool).toHaveBeenCalled();
        expect(mock.AuthenticationDetails).toHaveBeenCalledWith({Username: "user", Password: "pass"});
        expect(mock.CognitoUser).toHaveBeenCalled();
    };

    beforeEach(() => {
        jest.resetModules();
    });

    it ('signs the user successfully', () => {
        const email = { email: "john@doe.com" };
        const mock = factory(callbacks => (
            callbacks.onSuccess({ idToken: email })
        ));
        jest.doMock("amazon-cognito-identity-js", () => (mock));

        expect(subject()({ username: "user", password: "pass"})).resolves.toEqual(email);
        expectCallbacks(mock);
    });

    it ('rejects the promise whe authentication fails', () => {
        const mock = factory(callbacks => (
            callbacks.onFailure({ error: "error" })
        ));
        jest.doMock("amazon-cognito-identity-js", () => (mock));

        expect(subject()({ username: "user", password: "pass"})).rejects.toEqual({ error: 'error' });
        expectCallbacks(mock);
    });
});