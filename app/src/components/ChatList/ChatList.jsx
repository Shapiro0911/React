import React, { useState } from 'react';
import './ChatList.css'
import { useSelector, useDispatch } from 'react-redux';
import { selectChat } from '../../store/chats/selector'
import { ChatItem } from '../ChatItem/ChatItem';
import { addChat } from '../../store/chats/actions';
import { TextField } from "@mui/material";

export const ChatList = () => {
    const chatList = useSelector(selectChat)
    const [value, setValue] = useState("");
    const dispatch = useDispatch();

    const handleChange = (name) => {
        setValue(name.target.value);
    };

    const handleSubmit = (form) => {
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
            <form onSubmit={handleSubmit}>
                <TextField value={value} onChange={handleChange} />
                <button>Add Chat</button>
            </form>
        </div>
    )
}