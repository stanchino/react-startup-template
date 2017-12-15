import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import { reducer as form  } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import CookieStorage from 'redux-persist-cookie-storage'

import auth from '../auth/reducers';

const config = {
    key: 'auth',
    storage: new CookieStorage({
        expiration: {
            default: 30 * 86400,
            'persist:auth': 10 * 86400
        }
    }),
};

export default combineReducers({ auth: persistReducer(config, auth), form, routerReducer });