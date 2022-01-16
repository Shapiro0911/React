import { useDispatch, useSelector } from 'react-redux';
import { profileInfo } from '../../store/profile/selectors';
import { logOut } from '../../services/firebase';
import { useState } from 'react';
import { signOut } from '../../store/profile/actions';

export const Profile = () => {
    const profile = useSelector(profileInfo);
    const [user, setUser] = useState("");
    const dispatch = useDispatch();

    const handleUsernameChange = (text) => {
        setUser(text.target.value);
    }

    const handleLogOut = async () => {
        try {
            await logOut();
            dispatch(signOut());
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <form>
            <span>{profile.userID}</span>
            <input type="text" value={user} onChange={handleUsernameChange} />
            <button onClick={handleLogOut}>Log Out</button>
        </form>
    )
}