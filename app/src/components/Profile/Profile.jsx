import { useDispatch, useSelector } from 'react-redux';
import { profileName } from '../../store/profile/selectors';
import { logOut } from '../../services/firebase';
import { useState } from 'react';
import { signOut } from '../../store/profile/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';
import './Profile.css'

export const Profile = () => {
    const username = useSelector(profileName);
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
        <div className="chats">
            <div className="profile">
                <Link to='/chats'>
                    <FontAwesomeIcon className='return' icon={faArrowLeft} />
                </Link>
                <form className="profile-info">
                    <span>{username}</span>
                    <input type="text" value={user} onChange={handleUsernameChange} />
                    <button onClick={handleLogOut}>Log Out</button>
                </form>
            </div>
            <div className="profile-back"></div>
        </div>
    )
}