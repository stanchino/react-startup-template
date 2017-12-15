import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist'
import { reducer as form  } from 'redux-form';
import { routerReducer } from 'react-router-redux';
import session from 'redux-persist/lib/storage/session';

import auth from '../auth/reducers';

const config = {
    key: 'auth',
    storage: session,
};

export default combineReducers({ auth: persistReducer(config, auth), form, routerReducer });