import { Link } from "react-router-dom";
import { signUp } from "../../services/firebase";
import { SignForm } from "../SignForm/SignForm"
import { useState } from "react";

export const SignUp = () => {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const handleSignUp = async (email, password) => {
        setLoading(true);
        try {
            await signUp(email, password);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <>
            <SignForm onSubmit={handleSignUp} error={error} loading={loading} />
            <Link to='/'>Already have an account?</Link>
        </>
    )
}

