import { signUpRoutine, confirmationRoutine } from "../actions";

const initialState = {
    loading: false,
    isRegistered: false,
    isConfirmed: false,
    profile: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case signUpRoutine.REQUEST:
        case confirmationRoutine.REQUEST:
            return { ...state, loading: true};
        case signUpRoutine.SUCCESS:
            return { ...state, isRegistered: true, isConfirmed: false, profile: action.payload };
        case signUpRoutine.FAILURE:
            return { ...state, isRegistered: false, isConfirmed: false, profile: null };
        case confirmationRoutine.SUCCESS:
            return { ...state, isConfirmed: true };
        case confirmationRoutine.FAILURE:
            return { ...state, isConfirmed: false };
        case signUpRoutine.FULFILL:
        case confirmationRoutine.FULFILL:
            return { ...state, loading: false};
        default:
            return state;
    }
};