const factory = (err, result) => ({
    CognitoUserPool: jest.fn(),
    CognitoUser: jest.fn(() => ({
        confirmRegistration: (code, forceAliasCreation, callback) => {
            callback(err, result);
        }
    }))
});

describe("test confirmation", () => {
    const subject = () => (require("./confirmation").default);
    const expectCallbacks = (mock) => {
        expect(mock.CognitoUserPool).toHaveBeenCalled();
        expect(mock.CognitoUser).toHaveBeenCalled();
    };

    it ('confirms the user registration successfully', async () => {
        const mock = factory(null, { success: 'success'});
        jest.doMock("amazon-cognito-identity-js", () => (mock));

        expect(await subject()({ username: "user", code: "code"})).toEqual({ success: 'success'});
        expectCallbacks(mock);
    });

    it ('raises an error when the confirmation fails', async () => {
        const mock = factory({ error: 'error'}, null);
        jest.doMock("amazon-cognito-identity-js", () => (mock));

        try {
            await subject()({ username: "user", code: "code"})
        } catch (e) {
            expect(e).toEqual({ error: 'error'});
            expectCallbacks(mock);
        }
    });
});