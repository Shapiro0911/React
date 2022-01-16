import { SEND_MESSAGE, DELETE_MESSAGE, SET_MESSAGES } from './actions'

const initialMessages = {};

export const chatMsgsReducer = (state = initialMessages, { payload, type }) => {
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
        case SET_MESSAGES: {
            return payload;
        }
        default:
            return state;
    }
}