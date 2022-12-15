import { SIGN_IN, SIGN_OUT, SET_PROFILE_INFO } from "./actions";

const initialState = {
    authed: false,
    userInfo: {
        userID: '',
        username: '',
        userEmail: ''
    },
    friends: []
}

export const profileReducer = (state = initialState, { payload, type }) => {
    switch (type) {
        case SIGN_IN:
            return {
                ...state,
                authed: true,
                userInfo: {
                    ...state.userInfo,
                    userID: payload
                }
            };
        case SIGN_OUT:
            return {
                ...state = { ...initialState }
            };
        case SET_PROFILE_INFO:
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    username: payload.userInfo.username,
                    userEmail: payload.userInfo.userEmail
                }
            }
        default:
            return state;
    }
}