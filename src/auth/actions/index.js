import { createFormAction } from 'redux-form-saga';

import * as types from './types';

export const logout = () => ({
    type: types.SIGN_OUT
});
export const signIn = createFormAction(types.SIGN_IN);
export const signUp = createFormAction(types.SIGN_UP);
export const confirmation = createFormAction(types.CONFIRM);