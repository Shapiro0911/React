import { useState, useRef } from 'react';
import { Button } from '@mui/material';
import './Form.css'

export const Form = ({ sendMessage }) => {
    const [value, setValue] = useState('');
    const inputRef = useRef(null);

    const handleChange = (text) => {
        setValue(text.target.value);
    }

    const handleSubmit = (form) => {
        form.preventDefault();
        sendMessage({
            text: value,
            author: 'human',
            id: `mes-${Date.now()}`,
        });
        setValue('');
        inputRef.current.focus();
    }

    return (
        <form className="messageForm">
            <input ref={inputRef} placeholder="Write a message..." className="messageInput" value={value} onChange={handleChange} autoFocus />
            <Button onClick={handleSubmit} className="messageSubmit" variant="contained">Submit</Button>
        </form>
    )
}