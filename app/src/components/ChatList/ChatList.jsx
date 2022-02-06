import './ChatList.css'
import { useDispatch, useSelector } from 'react-redux';
import { addChat, initChatsTracking } from '../../store/chats/actions';
import { useEffect, useState } from 'react';
import { TextField } from "@mui/material";
import { ChatItem } from '../ChatItem/ChatItem';
import { Navigation } from '../Navigation/Navigation';
import { selectChat } from '../../store/chats/selectors';
import { profileInfo } from '../../store/profile/selectors';
import { initMessagesTracking } from '../../store/chatMsgs/actions';
import { initProfileTracking } from '../../store/profile/actions';

export const ChatList = () => {
    const chatList = useSelector(selectChat);
    const profile = useSelector(profileInfo);
    const dispatch = useDispatch();
    const [value, setValue] = useState("");

    useEffect(() => {
        dispatch(initChatsTracking(profile.userID));
        // eslint-disable-next-line
        dispatch(initMessagesTracking(profile.userID));
        // eslint-disable-next-line
        dispatch(initProfileTracking(profile.userID));
        // eslint-disable-next-line
    }, [])

    const handleChange = (name) => {
        setValue(name.target.value);
    };

    const handleAddChat = (form) => {
        form.preventDefault();
        const newID = `chat${Date.now()}`;
        dispatch(addChat(profile.userID, { name: value, id: newID }));
        setValue("");
    };

    return (
        <div className="chatList">
            <Navigation />
            <ul>
                {chatList.map((chat) =>
                    <li key={chat.id}>
                        <ChatItem chat={chat} />
                    </li>
                )}
            </ul>
            <form onSubmit={handleAddChat} className="messageForm">
                <TextField value={value} onChange={handleChange} />
                <button>Add chat</button>
            </form>
            <div className="addChat-container">
                <button className="msg-submit addChat-btn"></button>
            </div>
        </div>
    )
}