import signUpRequest from "./signUp";
import userPool from "./config";

describe("test signUpRequest", () => {
    it ('registers the user successfully', async () => {
        const spy = jest.spyOn(userPool, "signUp").mockImplementation((username, password, attributes, validation, callback) => {
            callback(null, { success: 'success'});
        });
        expect(await signUpRequest({ email: "john@doe.com", username: "user", password: "pass"})).toEqual({ success: 'success' });
        expect(spy).toHaveBeenCalled();
    });

    it ('raises an error when the registration fails', async () => {
        const spy = jest.spyOn(userPool, "signUp").mockImplementation((username, password, attributes, validation, callback) => {
            callback({ error: 'error'});
        });
        try {
            await signUpRequest({email: "john@doe.com", username: "user", password: "pass"});
        } catch (e) {
            expect(e).toEqual({ error: 'error'});
            expect(spy).toHaveBeenCalled();
        }
    });
});