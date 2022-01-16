import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom"
import { signIn } from "../../services/firebase";
import { signInStore } from "../../store/profile/actions";
import { SignForm } from "../SignForm/SignForm";

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