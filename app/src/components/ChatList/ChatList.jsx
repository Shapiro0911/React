import './ChatList.css'
import { useDispatch, useSelector } from 'react-redux';
import { initChatsTracking } from '../../store/chats/actions';
import { useEffect, useState } from 'react';
import { ChatItem } from '../ChatItem/ChatItem';
import { Navigation } from '../Navigation/Navigation';
import { selectChat } from '../../store/chats/selectors';
import { profileInfo } from '../../store/profile/selectors';
import { initMessagesTracking } from '../../store/chatMsgs/actions';
import { initProfileTracking } from '../../store/profile/actions';
import { messagesForCurrentChat } from "../../store/chatMsgs/selectors";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import { ContactList } from '../ContactList/ContactList';

export const ChatList = () => {
    const chatList = useSelector(selectChat);
    const profile = useSelector(profileInfo);
    const messages = useSelector(messagesForCurrentChat);
    const dispatch = useDispatch();
    const [contactsVisible, setContactsVisibility] = useState(false);
    const [menuVisible, setMenuVisibility] = useState(false);

    useEffect(() => {
        dispatch(initChatsTracking(profile.userID));
        dispatch(initMessagesTracking(profile.userID));
        dispatch(initProfileTracking(profile.userID));
        // eslint-disable-next-line
    }, [])

    const handleClick = () => {
        menuVisible ? setMenuVisibility(false) : setMenuVisibility(true);
    }

    const showContacts = () => {
        setContactsVisibility(true);
    }

    return (
        !contactsVisible ? <div className="chatList">
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
            </ul>
            <div className="addChat-container">
                <button className="addChat-btn" onClick={handleClick}>
                    <FontAwesomeIcon className='pencil' icon={faPencilAlt} />
                </button>
                {menuVisible &&
                    <div className="nav-menu addChat-menu">
                        <ul>
                            <li>
                                <div onClick={showContacts}>New Message</div>
                            </li>
                        </ul>
                    </div>}
            </div>
        </div> : <ContactList setContactsVisibility={setContactsVisibility} />
    )
}