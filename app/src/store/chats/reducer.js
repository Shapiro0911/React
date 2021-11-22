import { ADD_CHAT, DELETE_CHAT } from './actions'

const initialChats = [];

export const chatsReducer = (state = initialChats, action) => {
    switch (action.type) {
        case ADD_CHAT:
            return [...state, action.payload];
        case DELETE_CHAT:
            return state.filter(({ id }) => id !== action.payload);
        default:
            return state;
    }
}

