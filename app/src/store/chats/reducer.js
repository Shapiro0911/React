import { SET_CHATS } from './actions'

const initialChats = [];

export const chatsReducer = (state = initialChats, { type, payload }) => {
    switch (type) {
        case SET_CHATS:
            return payload;
        default:
            return state;
    }
}

