import { SIGN_IN, SIGN_OUT } from "./actions";

const initialState = {
    authed: false,
    userID: '',
}

export const profileReducer = (state = initialState, { payload, type }) => {
    switch (type) {
        case SIGN_IN:
            return {
                ...state,
                authed: true,
                userID: payload
            };
        case SIGN_OUT:
            return {
                ...state,
                authed: false,
                userID: ''
            };
        default:
            return state;
    }
}