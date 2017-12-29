import { signIn, signUp, confirmation } from "../actions";
import * as types from "../actions/types";

const initialState = {
    isLoggedIn: false,
    isConfirmed: false,
    isRegistered: false,
    profile: null
};

export const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case signIn.SUCCESS:
            return { ...state, isLoggedIn: true, isRegistered: true, isConfirmed: true, profile: action.payload };
        case signUp.SUCCESS:
            return { ...state, isLoggedIn: false, isConfirmed: false, isRegistered: true, profile: action.payload };
        case confirmation.SUCCESS:
            return { ...state, isLoggedIn: true, isConfirmed: true, isRegistered: true };
        case confirmation.FAILURE:
            return { ...state, isLoggedIn: false, isConfirmed: false, isRegistered: true };
        case signIn.FAILURE:
        case signUp.FAILURE:
        case types.SIGN_OUT:
            return initialState;
        default:
            return state;
    }
};