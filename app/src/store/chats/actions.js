import { chatsRef } from "../../services/firebase";
import { getChatMsgsRefByID, getChatRefByID } from "../../services/firebase";
import { set, onValue, remove } from "firebase/database";

export const SET_CHATS = 'CHATS::SET_CHATS';

export const setChats = (chats) => ({
    type: SET_CHATS,
    payload: chats
});

export const addChat = (chat) => () => {
    set(getChatRefByID(chat.id), chat)
    set(getChatMsgsRefByID(chat.id), { empty: true })
}

export const initChatsTracking = () => (dispatch) => {
    onValue(chatsRef, (snapshot) => {
        const chats = [];
        snapshot.forEach((chatSnap) => {
            chats.push(chatSnap.val())
        });
        dispatch(setChats(chats));
    })
}

export const deleteChat = (chatID) => () => {
    remove(getChatRefByID(chatID));
    remove(getChatMsgsRefByID(chatID));
}