import React, { useState } from 'react';
import './ChatList.css'
import { ListItemButton, ListItemText } from '@mui/material';
import { NavLink } from 'react-router-dom';

export const ChatList = () => {
    const [ChatList] = useState([{ id: 1, name: 'test' }, { id: 2, name: 'test2' }]);

    return (
        <div className="chatList">
            {ChatList.map((list) =>
                <NavLink to={`/chats/${list.id}`} key={list.id}>
                    <ListItemButton>
                        <ListItemText primary={list.name} />
                    </ListItemButton>
                </NavLink>
            )}
        </div>
    )
}