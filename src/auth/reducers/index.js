import { persistCombineReducers } from "redux-persist";
import { reducer as formReducer  } from "redux-form";
import signIn from "./signIn";
import signUp from "./signUp";
import CookieStorage from "redux-persist-cookie-storage";

const config = {
    key: "auth",
    storage: new CookieStorage({
        expiration: {
            "default": 30 * 86400,
            "persist:auth": 10 * 86400
        }
    }),
};

const authReducers = { signIn, signUp };

export default {
    auth: persistCombineReducers(config, authReducers),
    form: formReducer
};