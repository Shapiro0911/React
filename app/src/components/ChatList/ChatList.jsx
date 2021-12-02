import './ChatList.css'
import { useDispatch, useSelector } from 'react-redux';
import { addChat } from '../../store/chats/actions';
import { useState } from 'react';
import { TextField } from "@mui/material";
import { ChatItem } from '../ChatItem/ChatItem';
import { selectChat } from '../../store/chats/selectors';

export const ChatList = () => {
    const chatList = useSelector(selectChat);
    const dispatch = useDispatch();
    const [value, setValue] = useState("");

    const handleChange = (name) => {
        setValue(name.target.value);
    };

    const handleAddChat = (form) => {
        form.preventDefault();
        const newID = `chat${Date.now()}`;
        dispatch(addChat({ name: value, id: newID }));
        setValue("");
    };

    return (
        <div className="chatList">
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