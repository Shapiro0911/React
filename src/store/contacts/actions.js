import { messagesRef, usersRef } from "../../services/firebase";
import { onValue } from "firebase/database";
import { compareArrays } from "../../utils/functions";

export const SET_CONTACTS = 'CONTACTS::SET_CONTACTS';

export const setContacts = (contacts) => ({
    type: SET_CONTACTS,
    payload: contacts
});

export const initContactsTracking = (userID) => (dispatch) => {
    onValue(usersRef, (snapshot) => {
        const contactList = [];
        snapshot.forEach((userSnap) => {
            if (userSnap.key !== userID) {
                const contactInfo = { id: userSnap.key, name: userSnap.val().name };
                contactList.push(contactInfo);
            }

            onValue(messagesRef, (msgsSnap) => {
                msgsSnap.forEach((chatMsgsSnap) => {
                    if (chatMsgsSnap.val().empty === false) {
                        const array = [userID, contactList[contactList.length - 1].id];
                        const arraySwap = [contactList[contactList.length - 1].id, userID];
                        if (compareArrays(chatMsgsSnap.val().contacts, array) || compareArrays(chatMsgsSnap.val().contacts, arraySwap)) {
                            contactList.pop()
                        }
                    }
                })
            })
        });
        dispatch(setContacts(contactList));
    });
}
