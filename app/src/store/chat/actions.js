export const SEND_MESSAGE = "MESSAGES::SEND_MESSAGE";

export const sendMessage = (chatID, newMessage) => ({
    type: SEND_MESSAGE,
    payload: { chatID, newMessage },
});
