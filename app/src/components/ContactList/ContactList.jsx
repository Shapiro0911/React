import { ChatItem } from '../ChatItem/ChatItem';
import { ContactItem } from './ContactItem/ContactItem';
import { Navigation } from '../Navigation/Navigation';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { selectChat } from '../../store/chats/selectors';
import { addChat } from '../../store/chats/actions';
import { initContactsTracking } from '../../store/contacts/actions';
import { profileFriends, profileInfo } from '../../store/profile/selectors';
import { messagesForCurrentChat } from "../../store/chatMsgs/selectors"
import { getContacts } from '../../store/contacts/selector';
import { useNavigate } from "react-router-dom";

export const ContactList = () => {
    const chatList = useSelector(selectChat);
    const friends = useSelector(profileFriends);
    const profile = useSelector(profileInfo);
    const contacts = useSelector(getContacts);
    const messages = useSelector(messagesForCurrentChat);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [chatID, setChatID] = useState(null);

    useEffect(() => {
        dispatch(initContactsTracking(friends));
        // eslint-disable-next-line
    }, [])

    const handleAddChat = (contact) => {
        const newID = `chat${Date.now()}`;
        setChatID(newID);
        const chatNames = [contact.name, profile.username];
        const chatContacts = [profile.userID, contact.id];
        dispatch(addChat(chatNames, chatContacts, newID));
    }

    useEffect(() => {
        if (chatID) {
            navigate(`../${chatID}`);
        }
        // eslint-disable-next-line
    }, [chatList])

    return (
        <div className="chatList">
            <Navigation />
            <ul>
                {chatList.map((chat) => {
                    if (messages[chat.id]?.length > 0) {
                        return (
                            <li key={chat.id}>
                                <ChatItem chat={chat} />
                            </li>)
                    } else return null;
                })}
                {contacts?.map((contact) =>
                    <li key={contact.id} onClick={() => { handleAddChat(contact) }}>
                        <ContactItem contact={contact} />
                    </li>
                )}
            </ul>
        </div >
    )
}