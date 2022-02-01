import './ChatList.css'
import { useDispatch, useSelector } from 'react-redux';
import { addChat, initChatsTracking } from '../../store/chats/actions';
import { useEffect, useState } from 'react';
import { TextField } from "@mui/material";
import { ChatItem } from '../ChatItem/ChatItem';
import { Navigation } from '../Navigation/Navigation';
import { selectChat } from '../../store/chats/selectors';
import { profileID } from '../../store/profile/selectors';
import { initMessagesTracking } from '../../store/chatMsgs/actions';

export const ChatList = () => {
    const chatList = useSelector(selectChat);
    const profile = useSelector(profileID);
    const dispatch = useDispatch();
    const [value, setValue] = useState("");
    useEffect(() => {
        dispatch(initChatsTracking());
        // eslint-disable-next-line
        dispatch(initMessagesTracking());
        // eslint-disable-next-line
    }, [])

    const handleChange = (name) => {
        setValue(name.target.value);
    };

    const handleAddChat = (form) => {
        form.preventDefault();
        const newID = `chat${Date.now()}`;
        dispatch(addChat(profile, { name: value, id: newID }));
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
        </div>
    )
}