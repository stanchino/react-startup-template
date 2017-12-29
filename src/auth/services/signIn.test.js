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
    const subject = () => (require("./signIn").default);
    const expectCallbacks = (mock) => {
        expect(mock.CognitoUserPool).toHaveBeenCalled();
        expect(mock.AuthenticationDetails).toHaveBeenCalledWith({Username: "user", Password: "pass"});
        expect(mock.CognitoUser).toHaveBeenCalled();
    };

    it ('signs the user successfully', async () => {
        const email = { email: "john@doe.com" };
        const mock = factory(callbacks => (
            callbacks.onSuccess({ idToken: email })
        ));
        jest.doMock("amazon-cognito-identity-js", () => (mock));

        expect(await subject()({ username: "user", password: "pass"})).toEqual(email);
        expectCallbacks(mock);
    });

    it ('rejects the promise whe authentication fails', async () => {
        const mock = factory(callbacks => (
            callbacks.onFailure({ error: "error" })
        ));
        jest.doMock("amazon-cognito-identity-js", () => (mock));

        try {
            await subject()({ username: "user", password: "pass"});
        } catch (e) {
            expectCallbacks(mock);
            expect(e).toEqual({ error: 'error' });
        }
    });
});