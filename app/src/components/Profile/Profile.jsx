import { useSelector, useDispatch } from 'react-redux';
import { toggleCheckbox } from '../../store/profile/actions';
import { profileCheckbox } from '../../store/profile/selectors';
import { logOut } from '../../services/firebase';
import { useState } from 'react';

export const Profile = () => {
    const profile = useSelector(profileCheckbox);
    const dispatch = useDispatch();
    const [user, setUser] = useState("");

    const handleChange = () => {
        dispatch(toggleCheckbox);
    }

    const handleUsernameChange = (text) => {
        setUser(text.target.value);
    }

    const handleLogOut = async () => {
        try {
            await logOut()
        }
        catch (err) {
            console.log(err);
        }
    }

    return (
        <form>
            <input type="checkbox" checked={profile.checkbox} onChange={handleChange} />
            <span>{profile.name}</span>
            <input type="text" value={user} onChange={handleUsernameChange} />
            <button onClick={handleLogOut}>Log Out</button>
        </form>
    )
}