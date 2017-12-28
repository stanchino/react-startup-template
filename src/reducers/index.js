import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import authReducers from "../auth/reducers";

export default combineReducers({ ...authReducers, routerReducer });