import { useState } from "react";
import { useDispatch } from "react-redux";
import { signIn } from "../../services/firebase";
import { signInStore } from "../../store/profile/actions";
import { SignForm } from "../SignForm/SignForm";
import { Link } from "react-router-dom"
import "./Home.css";

export const Home = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")
    const dispatch = useDispatch()

    const handleSignIn = async (email, password) => {
        setLoading(true);
        try {
            const curUserID = await signIn(email, password);
            dispatch(signInStore(curUserID));
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            //setLoading(false);
        }
    }

    return (
        <div className="sign-screen">
            <h1 className="title">Hey there</h1>
            <h4 className="welcome">Welcome to my Chat(Pet project)</h4>
            <SignForm onSubmit={handleSignIn} error={error} loading={loading} />
            <div className="login-opt">
                <p className="login-text">  First time here?
                    <Link className="login-link" to="/signup">Register</Link>
                </p>
            </div>
        </div>)

}