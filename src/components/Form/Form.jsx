import { useState, useRef } from 'react';
import './Form.css'
import { useSelector } from 'react-redux';
import { profileInfo } from '../../store/profile/selectors'
import { Icon } from '@iconify/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperclip, faSmile } from '@fortawesome/free-solid-svg-icons'
import telegramPlane from '@iconify/icons-fa-brands/telegram-plane';

export const Form = ({ sendMessage }) => {
    const [value, setValue] = useState('');
    const profile = useSelector(profileInfo)
    const inputRef = useRef(null);

    const handleChange = (text) => {
        setValue(text.target.value);
    }

    const handleSubmit = (form) => {
        form.preventDefault();
        sendMessage({
            text: value,
            author: profile.username,
            id: `mes-${Date.now()}`,
        });
        setValue('');
        inputRef.current.focus();
    }

    return (
        <form className="msg-form">
            <div className="paperclip">
                <FontAwesomeIcon icon={faPaperclip} />
            </div>
            <input ref={inputRef} placeholder="Write a message..." className="msg-input" value={value} onChange={handleChange} autoFocus />
            <div className="paperclip">
                <FontAwesomeIcon icon={faSmile} />
            </div>
            <button onClick={handleSubmit} className="msg-submit">
                <Icon className="plane-icon" icon={telegramPlane} />
            </button>
        </form>
    )
}