import React, { useState } from 'react';
import { Button } from '@mui/material';
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
                <label htmlFor="signUp-usernanme" className="login-label">username</label>
                <input type="text" placeholder="Name" className="msg-input login-input" id="signUp-username" value={username} onChange={handleChangeName} autoFocus />
                <label htmlFor="login-email" className="login-label">Email</label>
                <input type="email" placeholder="example@gmail.com" className="msg-input login-input" id="login-email" value={email} onChange={handleChangeEmail} autoFocus />
                <label htmlFor="login-password" className="login-label">password</label>
                <input type="password" placeholder="Password" className="msg-input login-input" id="login-password" value={password} onChange={handleChangePassword} />
                <Button onClick={handleSubmit} variant="contained">Sign Up</Button>
            </form>
            {error && <h4>{error}</h4>}
        </>
    )
}