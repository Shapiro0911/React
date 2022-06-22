import { Link } from "react-router-dom";
import { signUp } from "../../services/firebase";
import { SignUpForm } from "../SignUpForm/SignUpForm"
import { useState } from "react";

export const SignUp = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSignUp = async (email, password) => {
        setLoading(true);
        try {
            const curUserID = await signUp(email, password);
            return curUserID;
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div className="sign-screen">
            <SignUpForm onSubmit={handleSignUp} error={error} loading={loading} />
            <div className="login-opt">
                <p className="login-text">
                    Already have an account?
                    <Link to='/' className="login-link">Log in</Link>
                </p>
            </div>
        </div>
    )
}

