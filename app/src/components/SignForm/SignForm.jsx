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
                <label htmlFor="login-email" className="login-label">Email</label>
                <input type="email" placeholder="example@gmail.com" className="msg-input login-input" id="login-email" value={email} onChange={handleChangeEmail} autoFocus />
                <label htmlFor="login-password" className="login-label">password</label>
                <input type="password" placeholder="Password" className="msg-input login-input" id="login-password" value={password} onChange={handleChangePassword} />
                <Button onClick={handleSubmit} variant="contained">Login</Button>
            </form>
            {error && <h4>{error}</h4>}
        </>
    )
}