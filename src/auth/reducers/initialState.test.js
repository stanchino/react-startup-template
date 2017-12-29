import initialState from "./initialState";

it("sets the initial state", () => {
    expect(initialState.isLoggedIn).toBeFalsy();
    expect(initialState.isRegistered).toBeFalsy();
    expect(initialState.isConfirmed).toBeFalsy();
    expect(initialState.profile).toBeNull();
});