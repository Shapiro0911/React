import { chatsRef } from "../../services/firebase";
import { getChatMsgsRefByID, getChatRefByID } from "../../services/firebase";
import { set, onValue } from "firebase/database";

export const DELETE_CHAT = 'CHATS::DELETE_CHAT';
export const SET_CHATS = 'CHATS::SET_CHATS';

export const deleteChat = (id) => ({
    type: DELETE_CHAT,
    payload: id
});

export const setChats = (chats) => ({
    type: SET_CHATS,
    payload: chats
});

export const addChat = (chat) => (dispatch) => {
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