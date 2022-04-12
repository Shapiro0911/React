import { messagesRef, usersRef } from "../../services/firebase";
import { onValue } from "firebase/database";

export const SET_CONTACTS = 'CONTACTS::SET_CONTACTS';

export const setContacts = (contacts) => ({
    type: SET_CONTACTS,
    payload: contacts
});

export const initContactsTracking = (friends) => (dispatch) => {
    onValue(usersRef, (snapshot) => {
        const contactList = [];
        snapshot.forEach((userSnap) => {
            friends.forEach((friend) => {
                if (userSnap.key === friend) {
                    const contactInfo = { id: friend, name: userSnap.val().name };
                    contactList.push(contactInfo);
                }
            })
            for (let i = 0; i < contactList.length; i++) {
                onValue(messagesRef, (msgsSnap) => {
                    msgsSnap.forEach((chatMsgsSnap) => {
                        if (chatMsgsSnap.val().empty === false) {
                            for (let j = 0; j < chatMsgsSnap.val().contacts.length; j++) {
                                if (chatMsgsSnap.val().contacts[j] === contactList[i]?.id) {
                                    contactList.splice(i, 1);
                                }
                            }
                        }
                    })
                })
            }
        });
        dispatch(setContacts(contactList));
    });
}
