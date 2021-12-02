import { SET_CHATS, DELETE_CHAT } from './actions'

const initialChats = [];

export const chatsReducer = (state = initialChats, { type, payload }) => {
    switch (type) {
        case SET_CHATS:
            return payload;
        case DELETE_CHAT:
            return state.filter(({ id }) => id !== payload);
        default:
            return state;
    }
}

