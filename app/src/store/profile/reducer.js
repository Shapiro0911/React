import { SIGN_IN, SIGN_OUT, SIGN_UP } from "./actions";

const initialState = {
    authed: false,
    userID: '',
    username: '',
    userEmail: ''
}

export const profileReducer = (state = initialState, { payload, type }) => {
    switch (type) {
        case SIGN_IN:
            return {
                ...state,
                authed: true,
                userID: payload
            };
        case SIGN_UP:
            return {
                ...state,
                userID: payload.userID,
                username: payload.userInfo.username,
                userEmail: payload.userInfo.userEmail
            }
        case SIGN_OUT:
            return {
                ...state = { ...initialState }
            };
        default:
            return state;
    }
}