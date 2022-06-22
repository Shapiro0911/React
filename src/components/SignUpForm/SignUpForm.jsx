import React, { useState } from 'react';
import { Navigate } from "react-router";
import { useDispatch } from "react-redux";
import { signUpStore } from "../../store/profile/actions";

export const SignUpForm = ({ onSubmit, loading, error }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setName] = useState("")
    const [signed, setSign] = useState(false)
    const dispatch = useDispatch()

    const handleChangeName = (text) => {
        setName(text.target.value);
    }

    const handleChangeEmail = (text) => {
        setEmail(text.target.value);
    }

    const handleChangePassword = (text) => {
        setPassword(text.target.value);
    }

    const handleSubmit = async (form) => {
        form.preventDefault();
        const curUserID = await onSubmit(email, password);
        const userInfo = {
            username: username,
            userEmail: email
        }
        setEmail("");
        setPassword("");
        setName("");
        if (!error) {
            dispatch(signUpStore(curUserID, userInfo));
            setSign(true);
        }
    }

    if (signed) {
        return <Navigate replace to="/" />
    }

    return (
        <>
            <form className="signForm">
                <label htmlFor="signUp-usernanme" className="login-label">Name*</label>
                <input type="text" placeholder="Enter your name" className="msg-input login-input" id="signUp-username" value={username} onChange={handleChangeName} autoFocus />
                <label htmlFor="login-email" className="login-label">Email*</label>
                <input type="email" placeholder="Enter your email" className="msg-input login-input" id="login-email" value={email} onChange={handleChangeEmail} autoFocus />
                <label htmlFor="login-password" className="login-label">Password*</label>
                <input type="password" placeholder="Enter your password" className="msg-input login-input" id="login-password" value={password} onChange={handleChangePassword} />
                <p className="login-text">Must be at least 6 digits</p>
                <button onClick={handleSubmit} className="login-btn">Create account</button>
            </form>
            {error && <h4>{error}</h4>}
        </>
    )
}