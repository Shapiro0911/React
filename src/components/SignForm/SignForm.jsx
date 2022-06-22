import React, { useState } from 'react';
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
                <label htmlFor="login-email" className="login-label">Email*</label>
                <input type="email" placeholder="Enter your email" className="msg-input login-input" id="login-email" value={email} onChange={handleChangeEmail} autoFocus />
                <label htmlFor="login-password" className="login-label">Password*</label>
                <input type="password" placeholder="Enter your password" className="msg-input login-input" id="login-password" value={password} onChange={handleChangePassword} />
                <button onClick={handleSubmit} className="login-btn">Login</button>
            </form>
            {error && <h4>{error}</h4>}
        </>
    )
}