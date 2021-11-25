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

let timeout;

export const sendMessageWithReply = (chatID, newMessage) => (dispatch) => {
    dispatch(sendMessage(chatID, newMessage));
    if (newMessage.author === "human") {
        if (timeout) {
            clearTimeout(timeout);
        }
        timeout = setTimeout(() => {
            const botMessage = { id: `mes-${Date.now()}`, text: "Hello", author: 'bot' };
            dispatch(sendMessage(chatID, botMessage));
        }, 1500)
    }
}