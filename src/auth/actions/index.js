import { createFormAction } from 'redux-form-saga';

import * as types from './types';

export const logout = () => ({
    type: types.LOGOUT,
});

export const login = createFormAction(types.LOGIN);