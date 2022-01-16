import { usersRef } from "../../services/firebase";
import { getChatMsgsRefByID, getChatRefByID } from "../../services/firebase";
import { set, onValue, remove } from "firebase/database";

export const SET_CHATS = 'CHATS::SET_CHATS';

export const setChats = (chats) => ({
    type: SET_CHATS,
    payload: chats
});

export const addChat = (userID, chat) => () => {
    set(getChatRefByID(userID, chat.id), chat)
    set(getChatMsgsRefByID(chat.id), { empty: true })
}

export const initChatsTracking = () => (dispatch, getState) => {
    onValue(usersRef, (snapshot) => {
        const chats = [];
        snapshot.forEach((userSnap) => {
            if (userSnap.key === getState().profile.userID) {
                chats.push(...Object.values(userSnap.val().chats || {}))
            }
        });
        dispatch(setChats(chats));
    })
}

export const deleteChat = (chatID) => () => {
    remove(getChatRefByID(chatID));
    remove(getChatMsgsRefByID(chatID));
}