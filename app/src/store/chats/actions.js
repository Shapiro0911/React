import { getChatMsgsRefByID, getChatRefByID, usersRef, messagesRef } from "../../services/firebase";
import { set, onValue, remove } from "firebase/database";

export const SET_CHATS = 'CHATS::SET_CHATS';

export const setChats = (chats) => ({
    type: SET_CHATS,
    payload: chats
});

export const addChat = (chatNames, contacts, newID) => () => {
    const chatMsgs = { empty: true, contacts: contacts };
    onValue(messagesRef, (snapshot) => {
        snapshot.forEach((chatMsgsSnap) => {
            onValue(usersRef, (snapshot) => {
                snapshot.forEach((userSnap) => {
                    contacts.forEach((contact) => {
                        if (userSnap.key === contact) {
                            if (chatMsgsSnap.val().contacts.length === contacts.length && chatMsgsSnap.val().contacts.every((v, i) => v === contacts[i])) {
                                remove(getChatRefByID(contact, chatMsgsSnap.key));
                                remove(getChatMsgsRefByID(chatMsgsSnap.key));
                                return;
                            }
                        };
                    })
                })
            }, {
                onlyOnce: true
            })
        })
        contacts.forEach((contact, i) => {
            const chat = { name: chatNames[i], id: newID };
            set(getChatRefByID(contact, newID), chat);
        })
        set(getChatMsgsRefByID(newID), chatMsgs);
    }, {
        onlyOnce: true
    })
}

export const initChatsTracking = (userID) => (dispatch) => {
    onValue(usersRef, (snapshot) => {
        const chats = [];
        snapshot.forEach((userSnap) => {
            if (userSnap.key === userID) {
                chats.push(...Object.values(userSnap.val().chats || {}))
            }
        });
        dispatch(setChats(chats));
    })
}

export const deleteChat = (chatID) => () => {
    onValue(messagesRef, (snapshot) => {
        snapshot.forEach((chatMsgsSnap) => {
            if (chatID === chatMsgsSnap.key) {
                chatMsgsSnap.val().contacts.forEach((contact) => {
                    remove(getChatRefByID(contact, chatID));
                })
            }
        })
    }, {
        onlyOnce: true
    })
    remove(getChatMsgsRefByID(chatID));
}