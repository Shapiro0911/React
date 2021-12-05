import React, { useState } from 'react';
import { Button } from '@mui/material';
import './SignForm.css'

export const SignForm = ({ onSubmit, loading, error }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleChangeEmail = (text) => {
        setEmail(text.target.value);
    }

    const handleChangePassword = (text) => {
        setPassword(text.target.value);
    }

    const handleSubmit = (form) => {
        form.preventDefault();
        onSubmit(email, password);
        setEmail("");
        setPassword("");
    }

    return (
        <>
            <form className="signForm">
                <input type="email" placeholder="example@gmail.com" className="messageInput" value={email} onChange={handleChangeEmail} autoFocus />
                <input type="password" placeholder="Password" className="messageInput" value={password} onChange={handleChangePassword} />
                <Button onClick={handleSubmit} className="messageSubmit" variant="contained">Submit</Button>
            </form>
            {error && <h4>{error}</h4>}
        </>
    )
}