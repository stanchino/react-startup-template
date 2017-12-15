import { persistCombineReducers } from 'redux-persist'
import { reducer as form  } from 'redux-form';
import storage from 'redux-persist/es/storage';

import auth from '../auth/reducers';

const config = {
    key: 'root',
    storage,
};

const rootReducer = persistCombineReducers(config, { auth, form });

export default rootReducer;