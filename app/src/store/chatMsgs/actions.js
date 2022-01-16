import { onValue } from "firebase/database";
import { messagesRef, usersRef } from "../../services/firebase";

export const SEND_MESSAGE = 'CHAT::SEND_MESSAGE';
export const DELETE_MESSAGE = 'CHAT::DELETE_MESSAGE';
export const SET_MESSAGES = 'CHAT::SET_MESSAGES'

export const sendMessage = (chatID, newMessage) => ({
    type: SEND_MESSAGE,
    payload: { chatID, newMessage }
});

export const deleteMessage = (chatID, messageID) => ({
    type: DELETE_MESSAGE,
    payload: { chatID, messageID }
});

export const setMessages = (messageList) => ({
    type: SET_MESSAGES,
    payload: messageList
})

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

export const initMessagesTracking = () => (dispatch, getState) => {
    onValue(messagesRef, (snapshot) => {
        const chatMessages = {};
        snapshot.forEach((chatMsgsSnap) => {
            onValue(usersRef, (snapshot) => {
                snapshot.forEach((userSnap) => {
                    if (userSnap.key === getState().profile.userID) {
                        const [...chats] = Object.values(userSnap.val().chats || {})
                        for (let i = 0; i < chats.length; i++) {
                            if (chatMsgsSnap.key === chats[i].id) {
                                chatMessages[chatMsgsSnap.key] = Object.values(
                                    chatMsgsSnap.val().chatMessageList || {}
                                );
                            }
                        }
                    }
                });
            })
        });
        dispatch(setMessages(chatMessages));
    });
}