import { signInRoutine, signOutRoutine } from "../actions";

const initialState = {
    loading: false,
    isLoggedIn: false,
    profile: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case signInRoutine.REQUEST:
        case signOutRoutine.REQUEST:
            return { ...state, loading: true};
        case signInRoutine.SUCCESS:
            return { ...state, isLoggedIn: true, profile: action.payload };
        case signInRoutine.FAILURE:
            return { ...state, isLoggedIn: false, profile: null };
        case signInRoutine.FULFILL:
            return { ...state, loading: false};
        case signOutRoutine.FULFILL:
            return { ...state, isLoggedIn: false, profile: null, loading: false};
        default:
            return state;
    }
};