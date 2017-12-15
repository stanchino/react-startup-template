import initialState from './initialState';
import { login } from '../actions';
import * as types from '../actions/types';

export default (state = initialState, action) => {
    switch (action.type) {
        case login.SUCCESS:
            return { ...state, isLoggedIn: true, profile: action.payload };
        case login.FAILURE:
            return { ...state, isLoggedIn: false, profile: null };
        case types.LOGOUT:
            return initialState;
        default:
            return state;
    }
};