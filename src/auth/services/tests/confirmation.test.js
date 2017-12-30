const factory = (err, result) => ({
    CognitoUserPool: jest.fn(),
    CognitoUser: jest.fn(() => ({
        confirmRegistration: (code, forceAliasCreation, callback) => {
            callback(err, result);
        }
    }))
});

describe("test confirmation", () => {
    const subject = () => (require("../confirmation").default);
    const expectCallbacks = (mock) => {
        expect(mock.CognitoUserPool).toHaveBeenCalled();
        expect(mock.CognitoUser).toHaveBeenCalled();
    };

    beforeEach(() => {
        jest.resetModules();
    });

    it ('confirms the user registration successfully', () => {
        const mock = factory(null, { success: 'success'});
        jest.doMock("amazon-cognito-identity-js", () => (mock));

        expect(subject()({ username: "user", code: "code"})).resolves.toEqual({ success: 'success'});
        expectCallbacks(mock);
    });

    it ('raises an error when the confirmation fails', () => {
        const mock = factory({ error: 'error'}, null);
        jest.doMock("amazon-cognito-identity-js", () => (mock));

        expect(subject()({ username: "user", code: "code"})).rejects.toEqual({ error: 'error'});
        expectCallbacks(mock);
    });
});