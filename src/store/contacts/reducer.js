import { SET_CONTACTS } from "./actions";

const initialState = [];

export const contactsReducer = (state = initialState, { payload, type }) => {
    switch (type) {
        case SET_CONTACTS:
            return payload;
        default:
            return state;
    }
}