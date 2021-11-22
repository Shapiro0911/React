import { SEND_MESSAGE, DELETE_MESSAGE } from './actions'
import { ADD_CHAT, DELETE_CHAT } from '../chats/actions'

const initialMessages = {};

export const chatReducer = (state = initialMessages, { payload, type }) => {
    switch (type) {
        case SEND_MESSAGE: {
            return {
                ...state,
                [payload.chatID]: [...state[payload.chatID], payload.newMessage],
            }
        }
        case DELETE_MESSAGE: {
            const messages = { ...state };
            messages[payload.chatID] = messages[payload.chatID].filter(({ id }) => id !== payload.messageID);
            return messages;
        }
        case ADD_CHAT: {
            return {
                ...state,
                [payload.id]: []
            }
        }
        case DELETE_CHAT: {
            const messages = { ...state };
            delete messages[payload.chatId];
            return messages;
        }
        default:
            return state;
    }
}