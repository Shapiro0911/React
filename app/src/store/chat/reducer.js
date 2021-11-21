import { ADD_CHAT, DELETE_CHAT } from "../chats/actions";
import { SEND_MESSAGE } from "./actions";

const initialMessages = {};

export const chatReducer = (state = initialMessages, { payload, type }) => {
    switch (type) {
        case SEND_MESSAGE:
            return {
                ...state,
                [payload.chatID]: [...state[payload.chatID], payload.newMessage],
            };
        case ADD_CHAT:
            return {
                ...state,
                [payload.id]: [],
            };
        case DELETE_CHAT: {
            const messages = { ...state };
            delete messages[payload.chatID];
            return messages;
        }
        default:
            return state;
    }
};