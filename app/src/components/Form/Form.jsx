import React, { useState } from 'react';

export const Form = ({ sendMessage }) => {
    const [value, setValue] = useState('');

    const handleChange = (text) => {
        setValue(text.target.value);
    }

    const handleSubmit = (form) => {
        form.preventDefault();
        sendMessage(value);
        setValue('');
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={value} onChange={handleChange} />
            <input type="submit" />
        </form>
    )
}