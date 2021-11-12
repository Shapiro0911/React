import React, { useState } from 'react';
import { ListItemButton, ListItemText } from '@mui/material';

export const MessageList = () => {
    const [messageList, setList] = useState([{ id: 1, name: 'test' }]);



    return (
        <ListItemButton component="a" href="#simple-list">
            {messageList.map((list) => <ListItemText key={list.id} primary={list.name} />)}
        </ListItemButton>)
}