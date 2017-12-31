export const testAction = (reducer, action, expectedState) => {
    it(`should handle ${action.type}`, () => {
        expect(reducer({}, action)).toEqual(expectedState);
    });
};