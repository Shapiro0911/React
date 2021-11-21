export const SEND_MESSAGE = 'CHAT::SEND_MESSAGE';
export const DELETE_MESSAGE = 'CHAT::DELETE_MESSAGE';

export const sendMessage = (chatID, newMessage) => ({
    type: SEND_MESSAGE,
    payload: { chatID, newMessage }
});

export const deleteMessage = (chatID, messageID) => ({
    type: DELETE_MESSAGE,
    payload: { chatID, messageID }
});