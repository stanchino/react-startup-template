import initialState from './initialState';
import * as types from './types';

export const logout = () => ({
    type: types.LOGOUT_SUCCESS,
});

export const loginRequest = () => ({
    type: types.LOGIN_REQUEST,
});

export const loginSuccess = (profile) => ({
    type: types.LOGIN_SUCCESS,
    profile
});

export const loginFailure = (error) => ({
    type: types.LOGIN_ERROR,
    error,
});

export default function (state = initialState, action) {
    switch (action.type) {
        case types.LOGIN_REQUEST:
            return { ...state, isLoggingIn: true, error: null, isLoggedIn: false, profile: null };
        case types.LOGIN_SUCCESS:
            return { ...state, isLoggingIn: false, error: null, isLoggedIn: true, profile: action.profile };
        case types.LOGIN_ERROR:
            return { ...state, isLoggingIn: false, error: action.error, isLoggedIn: false, profile: null };
        case types.LOGOUT_SUCCESS:
            return { ...state, isLoggingIn: false, error: null, isLoggedIn: false, profile: null };
        case types.LOGOUT:
            return initialState;
        default:
            return state;
    }
}