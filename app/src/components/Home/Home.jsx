import { useState } from "react";
import { Link } from "react-router-dom"
import { signIn } from "../../services/firebase";
import { SignForm } from "../SignForm/SignForm";

export const Home = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const handleSignIn = async (email, password) => {
        setLoading(true);
        try {
            await signIn(email, password);
        }
        catch (err) {
            setError(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h3>HOME</h3>
            <SignForm onSubmit={handleSignIn} error={error} loading={loading} />
            <Link to="/signup">Register</Link>
        </div>)

}