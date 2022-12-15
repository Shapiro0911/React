import { ChatItem } from '../ChatItem/ChatItem';
import { ContactItem } from './ContactItem/ContactItem';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react';
import { selectChat } from '../../store/chats/selectors';
import { addChat } from '../../store/chats/actions';
import { initContactsTracking } from '../../store/contacts/actions';
import { profileInfo } from '../../store/profile/selectors';
import { messagesForCurrentChat } from "../../store/chatMsgs/selectors"
import { getContacts } from '../../store/contacts/selector';
import { useNavigate } from "react-router-dom";
import { NavSearch } from '../Navigation/NavSearch/NavSearch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

export const ContactList = ({ setContactsVisibility }) => {
    const chatList = useSelector(selectChat);
    const profile = useSelector(profileInfo);
    const contacts = useSelector(getContacts);
    const messages = useSelector(messagesForCurrentChat);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [chatID, setChatID] = useState(null);

    useEffect(() => {
        dispatch(initContactsTracking(profile.userID));
        // eslint-disable-next-line
    }, [])

    const handleAddChat = (contact) => {
        const newID = `chat${Date.now()}`;
        setChatID(newID);
        const chatNames = [contact.name, profile.username];
        const chatContacts = [profile.userID, contact.id];
        dispatch(addChat(chatNames, chatContacts, newID));
    }

    const hideContacts = () => {
        setContactsVisibility(false);
    }

    useEffect(() => {
        if (chatID) {
            navigate(`../${chatID}`);
        }
        // eslint-disable-next-line
    }, [chatList])

    return (
        <div className="chatList">
            <div className="nav">
                <div className="nav-btn" onClick={hideContacts}>
                    <FontAwesomeIcon className='return' icon={faArrowLeft} />
                </div>
                <NavSearch />
            </div>
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