import { useState, useRef } from 'react';
import './Form.css'
import { useSelector } from 'react-redux';
import { profileID } from '../../store/profile/selectors'
import { Icon } from '@iconify/react';
import telegramPlane from '@iconify/icons-fa-brands/telegram-plane';

export const Form = ({ sendMessage }) => {
    const [value, setValue] = useState('');
    const curUser = useSelector(profileID)
    const inputRef = useRef(null);

    const handleChange = (text) => {
        setValue(text.target.value);
    }

    const handleSubmit = (form) => {
        form.preventDefault();
        sendMessage({
            text: value,
            author: curUser,
            id: `mes-${Date.now()}`,
        });
        setValue('');
        inputRef.current.focus();
    }

    return (
        <form className="msg-form">
            <input ref={inputRef} placeholder="Write a message..." className="msg-input" value={value} onChange={handleChange} autoFocus />
            <button onClick={handleSubmit} className="msg-submit">
                <Icon className="plane-icon" icon={telegramPlane} />
            </button>
        </form>
    )
}