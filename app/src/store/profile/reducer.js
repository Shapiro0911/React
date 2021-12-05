import { SIGN_IN, SIGN_OUT, TOGGLE_CHECKBOX } from "./actions";

const initialState = {
    checkbox: false,
    name: 'Checkbox',
    authed: false,
}

export const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_CHECKBOX:
            return {
                ...state,
                checkbox: !state.checkbox
            }
        case SIGN_IN:
            return {
                ...state,
                authed: true,
            };
        case SIGN_OUT:
            return {
                ...state,
                authed: false,
            };
        default:
            return state;
    }
}