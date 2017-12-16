import { persistReducer } from 'redux-persist'
import { reducer as formReducer  } from 'redux-form';
import { authReducer } from './auth';
import CookieStorage from 'redux-persist-cookie-storage'

const config = {
    key: 'auth',
    storage: new CookieStorage({
        expiration: {
            'default': 30 * 86400,
            'persist:auth': 10 * 86400
        }
    }),
};

export default { auth: persistReducer(config, authReducer), form: formReducer };